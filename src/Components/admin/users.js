import React, { useEffect, useState } from "react";
import "../../index.css";
import SideBar from "../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../../config";
import Loader from "../Loader";

function Users() {
    const [users, SetUsers] = useState([]);
    const [error, setError] = useState(null);   
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null); // State to manage selected user
    const [isModalOpen, setIsModalOpen] = useState(false);  // State to manage modal visibility
    const [additionalData, setAdditionalData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${config.baseURL}users`);
                if (response.status === 200) {
                    let data = response.data.Data;
                    SetUsers(data);
                } else {
                    console.error("Failed to fetch data:", response);
                    setError("Failed to fetch users");
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    toast.error("Failed to load users");
                } else {
                    toast.error("Something went wrong, try again!");
                }
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);
    const fetchAdditionalData = async (userId) => {
        try {
            const response = await axios.get(`${config.baseURL}successRatio/${userId}`);
            if (response.status === 200) {
                setAdditionalData(response.data); // Store the additional data
            } else {
                console.error("Failed to fetch additional data:", response);
                toast.error("Failed to fetch additional data");
            }
        } catch (error) {
            console.error("Error fetching additional data:", error);
            toast.error("Something went wrong while fetching additional data");
        }
    };
    const handleUserClick = async(user) => {
        setSelectedUser(user);

        setIsModalOpen(true);
        await fetchAdditionalData(user._id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setAdditionalData(null); 
    };

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div className="flex h-screen">
            <div className="w-64">
                <SideBar />
            </div>
            <div className="flex-1 p-6">
                <h1 className="text-2xl font-semibold mb-4">User List</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-600">ID</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-600">Role</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-600">Status</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-600">Action</th>
                                <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-600">View Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">{index + 1}</td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">{user.firstname}</td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">{user.email}</td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">{user.role}</td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">{user.userstatus == 1 ? "Active" : "DeActive"}</td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">
                                        {user.userstatus == 1 ? (
                                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Deactivate</button>
                                        ) : (
                                            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Activate</button>
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleUserClick(user)} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && selectedUser && (
    <div id="popup-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8">
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
            <div className="flex flex-col items-center">  {/* Centering content */}
                {/* Avatar Image */}
                <h3 className="text-lg font-semibold mb-4 text-center">User Profile</h3>
                <img
                   src={`${config.baseURL}/uploads/${selectedUser.profilepic}`} // Replace with user's avatar URL if available
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full mb-4"
                />
                
                <div className="text-sm text-center">
                    <p><strong>Name:</strong> {selectedUser.firstname}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Role:</strong> {selectedUser.role}</p>
                    <p><strong>Date Of Join:</strong> {formatDeadline(selectedUser.dateofRegister)}</p>
                    
                    <p><strong>Status:</strong> {selectedUser.userstatus == 1 ? "Active" : "DeActive"}</p>
                    {/* Add more profile statistics here */}
                    {additionalData && (
                                    <div>
                                        {/* Render additional data here */}
                                        <p><strong>Success Ratio:</strong> {additionalData.Data}</p>
                                    </div>
                                )}
                </div>
            </div>
        </div>
    </div>
)}
        </div>
    );
    function formatDeadline(deadline) {
        const date = new Date(deadline);
        return date.toISOString().split("T")[0];
      }
}

export default Users;
