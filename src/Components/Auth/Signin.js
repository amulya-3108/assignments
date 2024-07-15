import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { RadioButton } from "primereact/radiobutton";
import { FileUpload } from "primereact/fileupload";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [ExistRefferal, setExistRefferal] = useState("");
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [files, setFiles] = useState(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState({});

  const handleFileSelect = (event) => {
    setFiles(event.files[0]);
  };

  async function signupData(e) {
    e.preventDefault();
    const newErrors = {};
    if (!firstname) {
      newErrors.firstname = "First name is required";
    } 
    else if (!/^[a-zA-Z]+$/.test(firstname.trim())) {
      newErrors.firstname = "First Name should only contain alphabets";
    }
    if (!lastname) {
      newErrors.lastname = "Last name is required";
    } 
    else if (!/^[a-zA-Z]+$/.test(lastname.trim())) {
      newErrors.lastname = "Last Name should only contain alphabets";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } 
    if (!contact) {
      newErrors.contact = "Contact number is required";
    } 
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("industry", industry);
    formData.append("userstatus", 1);
    formData.append("file", files);
    formData.append("referral", ExistRefferal);

    try {
      const response = await axios.post(`${config.baseURL}signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
        setPassword("");
        setExistRefferal("");
        setIndustry("");
        setFiles(null);
        if (fileInputRef.current) {
          fileInputRef.current.clear();
        }
        toast.success("Registered successfully");
        setTimeout(() => {
          navigate("/login");
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
    <div className="container mx-auto w-full md:w-1/3 justify-around items-center mt-20 mb-20 rounded-2xl md:border">
      <h1 className="text-4xl font-semibold my-5 text-center">Sign Up</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-auto justify-around items-center">
          <div className="flex flex-col items-center justify-between px-16 pt-4 pb-2 mb-4">
            <Link
              className="flex bg-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600 mb-5"
              type="button">
              <img src="../images/icons8-google.svg" alt="google"/>
              <span className="ml-2">Continue with Google</span>
            </Link>
            <Link
              className="flex bg-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600"
              type="button">
              <img src="../images/icons8-apple.svg" alt="apple" className="mr-2" />
              <span className="ml-1">Continue with Apple</span>
            </Link>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="border-t border-black flex-grow h-0.5 mr-3 ml-20 mt-2"></div>
            <span className="text-black text-xl">or</span>
            <div className="border-t border-black flex-grow h-0.5 ml-3 mr-20 mt-2"></div>
          </div>
          <form className="px-16 pt-4 pb-1 mb-3" onSubmit={signupData}>
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
                <span className="text-red-500 text-sm">{error.firstname}</span>
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
                Role
              </label>
              <div className="card flex justify-content-center">
                <div className="flex flex-wrap gap-3">
                  <div className="flex align-items-center">
                    <RadioButton
                      inputId="student"
                      name="role"
                      value="student"
                      onChange={(e) => setRole(e.value)}
                      checked={role === "student"}
                    />
                    <label htmlFor="student" className="ml-2">
                      Student
                    </label>
                  </div>
                  <div className="flex align-items-center">
                    <RadioButton
                      inputId="solver"
                      name="role"
                      value="solver"
                      onChange={(e) => setRole(e.value)}
                      checked={role === "solver"}
                    />
                    <label htmlFor="solver" className="ml-2">
                      Solver
                    </label>
                  </div>
                </div>
              </div>
              {error.role && (
                <span className="text-red-500 text-sm">{error.role}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Select an Industry
              </label>
              <div className="card flex justify-content-center">
                <select
                  id="exampleSelect"
                  className="mt-1 block w-full py-2 px-3 border-2 border-blue-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={industry}
                  name="industry"
                  onChange={(e) => setIndustry(e.target.value)}>
                  <option>Select an industry</option>
                  <option>Mobile solution</option>
                  <option>Web Development</option>
                  <option>Social Media Marketing</option>
                  <option>Health Care</option>
                </select>
              </div>
              {error.industry && (
                <span className="text-red-500 text-sm mt-2">
                  {error.industry}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Profile Picture
              </label>
              <div className="card">
              <FileUpload
  name="file" // Change this to match the multer setup
  ref={fileInputRef}
  multiple={false}
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
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password && (
                <span className="text-red-500 text-sm">{error.password}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Referral Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ExistRefferal"
                type="text"
                value={ExistRefferal}
                placeholder="Refferal"
                onChange={(e) => setExistRefferal(e.target.value)}
              />
              {error.ExistRefferal && (
                <span className="text-red-500 text-sm">{error.ExistRefferal}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-600 flex text-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600 mb-5 hover:bg-white hover:text-black hover:border-2 hover:border-blue-600"
                type="submit">
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mb-4">
            <Link to="/login" className="text-blue-900 text-sm font-semibold">
              Already have an account? Log In
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Signin;
