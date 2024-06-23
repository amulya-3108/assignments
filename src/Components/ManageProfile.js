import React, { useState, useRef } from "react";
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
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [files, setFiles] = useState("");
  const fileInputRef = useRef(null);
  const [error, setError] = useState({});
  const handleFileSelect = (event) => {
    setFiles(event.files[0]);
  };
  async function manageProfile(e) {
    e.preventDefault();
    const newErrors = {};
    if (!firstname) {
      newErrors.firstname = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(firstname.trim())) {
      newErrors.firstname = "First Name should only contain alphabets";
    }
    if (!lastname) {
      newErrors.lastname = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(lastname.trim())) {
      newErrors.lastname = "Last Name should only contain alphabets";
    }
    if (!email) {
      newErrors.email = "Email is required";
    }
    // else if (!/\S+@\S+\.\S+/.test(email)) {
    //   newErrors.email = "Email address is invalid";
    // }
    if (!contact) {
      newErrors.contact = "Contact number is required";
    }
    // else if (!/^\d{10}$/.test(contact)) {
    //   newErrors.contact = "Contact number is invalid";
    // }
    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    try {
      const response = await axios.post(`${config.baseURL}signup`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        contact: contact,
        file: files,
      });
      if (response.status === 200) {
        console.log("success");
        localStorage.setItem("email", email);
        localStorage.setItem("contact", contact);
        localStorage.setItem("authToken", response.data.token);
        setFirstname("");
        setLastname("");
        setContact("");
        setEmail("");
        setFiles(null);
        if (fileInputRef.current) {
          fileInputRef.current.clear();
        }
        toast.success("Registered successfully");
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Invalid email or contact number");
        toast.error("Try again");
      } else {
        console.error("Error message:", error.message);
        console.log("An unexpected error occurred. Please try again later.");
        toast.error("Something went wrong");
      }
    }
  }
  return (
    <div>
      <Header />
      <div className="container mx-auto w-full md:w-3/6 justify-around items-center mt-8 mb-20 rounded-2xl md:border-2">
        <h1 className="text-4xl font-semibold my-5 text-center">Profile</h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full mx-auto justify-around items-center">
            <form className="px-16 pt-4 pb-1 mb-3" onSubmit={manageProfile}>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="firstname"
                  type="text"
                  value={firstname}
                  placeholder="First Name"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                {error.firstname && (
                  <span className="text-red-500 text-sm">
                    {error.firstname}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lastname"
                  type="text"
                  value={lastname}
                  placeholder="Last Name"
                  onChange={(e) => setLastname(e.target.value)}
                />
                {error.lastname && (
                  <span className="text-red-500 text-sm">{error.lastname}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error.email && (
                  <span className="text-red-500 text-sm">{error.email}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Phone Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="number"
                  type="text"
                  value={contact}
                  placeholder="Contact Number"
                  onChange={(e) => setContact(e.target.value)}
                />
                {error.contact && (
                  <span className="text-red-500 text-sm">{error.contact}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Profile Picture
                </label>
                <div className="card">
                  <FileUpload
                    name="files"
                    ref={fileInputRef}
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
                    emptyTemplate={
                      <p className="m-3 text-gray-500 text-center py-4 border-dashed border-2 border-blue-500 rounded">
                        Drag and drop files to here to upload.
                      </p>
                    }
                    chooseOptions={{
                      label: "Choose",
                      icon: "pi pi-fw pi-plus",
                      className:
                        "p-button p-component m-3 w-20 h-8 bg-blue-600 rounded text-white hover:bg-blue-700",
                    }}
                    uploadOptions={{
                      label: "Upload",
                      icon: "pi pi-upload",
                      className:
                        "p-button p-component m-3 w-20 h-8 bg-green-600 rounded text-white hover:bg-green-700",
                    }}
                    cancelOptions={{
                      label: "Cancel",
                      icon: "pi pi-times",
                      className:
                        "p-button p-component m-3 w-20 h-8 bg-red-600 rounded text-white hover:bg-red-700",
                    }}
                    onSelect={handleFileSelect}
                  />
                  {error.files && (
                    <span className="text-red-500 text-sm mt-2">
                      {error.files}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-600 flex text-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600 mb-5 mt-4 hover:bg-white hover:text-black hover:border-2 hover:border-blue-600"
                  type="submit">
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
