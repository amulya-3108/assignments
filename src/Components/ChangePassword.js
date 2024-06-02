    import React, { useEffect, useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import Header from "./Header";
    import Footer from "./Footer";
    import axios from "axios";
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import config from "../config"; 

    function Changepassword() {
    const [email, setEmail] = useState("");
    const [currentPassword, setPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setcPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    async function changepasswordData(e) {
        e.preventDefault();

        setError(""); // Clear any previous error messages
        try {
            const token = localStorage.getItem("authToken");
                
        const response = await axios.post(
            `${config.baseURL}changePassword`,
            { currentPassword: currentPassword, confirmPassword: confirmPassword, newPassword: newPassword},{
                headers: { 'Authorization': token}
            }
        );
        if (response.status === 200) {
            toast.success("Password Changed!");
            setTimeout(() => {
                navigate("/");
            }, 5000);
        }
        } catch (error) {
        if (error.response && error.response.status === 401) {
            setError("Invalid password");
        } else {
            console.error("Error message:", error.message);
            setError("An unexpected error occurred. Please try again later.");
        }
        }
    }
    return (
        <div>
            <Header/>
        <div className="container mx-auto w-full md:w-1/3 justify-around items-center mt-10 mb-20 rounded-2xl md:border">
        <h1 className="text-4xl font-semibold my-5 text-center">Change Password</h1>
        <div className="flex flex-col md:flex-row">
            <div className="w-full mx-auto justify-around items-center">
            <form className="px-16 pt-4 pb-1" onSubmit={changepasswordData}>
                <div className="mb-4">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={currentPassword}
                    placeholder="Current Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <span className="text-red-500 text-sm mt-2">{error}</span>
                )}
                </div>
                <div className="mb-4">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={(e) => setnewPassword(e.target.value)}
                />
                {error && (
                    <span className="text-red-500 text-sm mt-2">{error}</span>
                )}
                </div>
                <div className="mb-4">
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setcPassword(e.target.value)}
                />
                {error && (
                    <span className="text-red-500 text-sm mt-2">{error}</span>
                )}
                </div>
                <div className="flex items-center justify-between">
                <button
                    className="bg-blue-600 flex text-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600 mb-5 hover:bg-white hover:text-black hover:border-2 hover:border-blue-600"
                    type="submit">
                    Continue
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
        <ToastContainer/>
        <Footer/>
        </div>
    );
    }

    export default Changepassword;
