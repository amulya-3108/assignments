import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import config from "../config";
import { FileUpload } from "primereact/fileupload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Manageprofile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [refferal, setRefferal] = useState("");
  const [files, setFiles] = useState(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState({});
  const token = localStorage.getItem("authToken");
 
  const handleFileSelect = (event) => {
    setFiles(event.files[0]);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${config.baseURL}getUserInfo`, {
        headers: { Authorization: token }
      });
      if (response.status === 200) {
        const { firstname, lastname, email, contact,referral } = response.data.data;
        setProfile(response.data);
        setFirstname(firstname);
        setLastname(lastname);
        setEmail(email);
        setContact(contact);
        setRefferal(referral)

      }
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      toast.error("Failed to fetch profile. Please try again.");
    }
  };

  const manageProfile = async (e) => {
    e.preventDefault();
    const newErrors = {};

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("file", files);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("contact", contact);

    try {
      const response = await axios.post(`${config.baseURL}manageProfile`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        const { firstname, lastname, email, contact,referral, profilePic } = response.data;
        localStorage.setItem("email", email);
        localStorage.setItem("contact", contact);
        setFirstname(firstname);
        setLastname(lastname);
        setEmail(email);
        setContact(contact);
        setRefferal(referral)
        setFiles(null);
        if (fileInputRef.current) {
          fileInputRef.current.clear();
        }
        toast.success("Profile updated");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Try again");
      } else {
        console.error("Error message:", error.message);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto w-full md:w-3/6 justify-around items-center mt-8 mb-20 rounded-2xl md:border-2">
        <h1 className="text-4xl font-semibold my-5 text-center">Profile</h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full mx-auto justify-around items-center">
            <form className="px-16 pt-4 pb-1 mb-3" onSubmit={manageProfile}>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">First Name</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstname"
                  type="text"
                  value={firstname}
                  placeholder="First Name"
                  onChange={(e) => setFirstname(e.target.value)}
                  disabled
                />
                {error.firstname && <span className="text-red-500 text-sm">{error.firstname}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">Last Name</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastname"
                  type="text"
                  value={lastname}
                  placeholder="Last Name"
                  onChange={(e) => setLastname(e.target.value)}
                  disabled
                />
                {error.lastname && <span className="text-red-500 text-sm">{error.lastname}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">Email</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
                {error.email && <span className="text-red-500 text-sm">{error.email}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">Phone Number</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="number"
                  type="text"
                  value={contact}
                  placeholder="Contact Number"
                  onChange={(e) => setContact(e.target.value)}
                  disabled
                />
                {error.contact && <span className="text-red-500 text-sm">{error.contact}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">Referral Code</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="refferal"
                  type="text"
                  value={refferal}
                  placeholder="refferal"
                  onChange={(e) => setRefferal(e.target.value)}
                  disabled
                />
                {error.contact && <span className="text-red-500 text-sm">{error.contact}</span>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">Profile Picture</label>
                <div className="card">
                  <FileUpload
                    name="file"
                    ref={fileInputRef}
                    multiple={false}
                    accept="image/*"
                    maxFileSize={1000000}
                    emptyTemplate={<p className="m-3 text-gray-500 text-center py-4 border-dashed border-2 border-blue-500 rounded">Drag and drop files to here to upload.</p>}
                    chooseOptions={{ label: "Choose", icon: "pi pi-fw pi-plus", className: "p-button p-component m-3 w-20 h-8 bg-blue-600 rounded text-white hover:bg-blue-700" }}
                    uploadOptions={{ label: "Upload", icon: "pi pi-upload", className: "p-button p-component m-3 w-20 h-8 bg-green-600 rounded text-white hover:bg-green-700" }}
                    cancelOptions={{ label: "Cancel", icon: "pi pi-times", className: "p-button p-component m-3 w-20 h-8 bg-red-600 rounded text-white hover:bg-red-700" }}
                    onSelect={handleFileSelect}
                  />
                  {error.files && <span className="text-red-500 text-sm mt-2">{error.files}</span>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue-600 flex text-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600 mb-5 mt-4 hover:bg-white hover:text-black hover:border-2 hover:border-blue-600" type="submit">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Manageprofile;
