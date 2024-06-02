import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

function Signin() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  async function signupData(e) {
    e.preventDefault();
    const newErrors = {};

    if (!firstname) newErrors.firstname = "First name is required";
    if (!lastname) newErrors.lastname = "Last name is required";
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
    if (!password) {
      newErrors.password = "Password is required";
    } 
    // else if (password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters long";
    // }

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    try {
      const response = await axios.post(
        `${config.baseURL}signup`,
        { firstname: firstname, lastname: lastname, email: email, contact: contact, password: password,role:"student",industry:"-", userstatus:1,file:"../images/logo.png"}
      );
      if (response.status === 200) {
        console.log("success");
        localStorage.setItem("email", email);
        localStorage.setItem("contact", contact);
        localStorage.setItem("authToken", response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Invalid email or contact number");
      } else {
        console.error("Error message:", error.message);
        console.log("An unexpected error occurred. Please try again later.");
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
              <img src="../images/icons8-google.svg" />
              <span className="ml-2">Continue with Google</span>
            </Link>
            <Link
              className="flex bg-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600"
              type="button">
              <img src="../images/icons8-apple.svg" className="mr-2" />
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
              {/* <label className="block text-gray-700 text-lg font-bold mb-2">
                First Name
              </label> */}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstname"
                type="text"
                value={firstname}
                placeholder="First Name"
                onChange={(e) => setFirstname(e.target.value)}
              />
              {error.firstname && <span className="text-red-500 text-sm">{error.firstname}</span>}
            </div>
            <div className="mb-4">
              {/* <label className="block text-gray-700 text-lg font-bold mb-2">
                Last Name
              </label> */}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastname"
                type="text"
                value={lastname}
                placeholder="Last Name"
                onChange={(e) => setLastname(e.target.value)}
              />
              {error.lastname && <span className="text-red-500 text-sm">{error.lastname}</span>}
            </div>
            <div className="mb-4">
              {/* <label className="block text-gray-700 text-lg font-bold mb-2">
                Email
              </label> */}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {error.email && <span className="text-red-500 text-sm">{error.email}</span>}
            </div>
            <div className="mb-4">
              {/* <label className="block text-gray-700 text-lg font-bold mb-2">
                Phone Number
              </label> */}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="number"
                type="text"
                value={contact}
                placeholder="Contact Number"
                onChange={(e) => setContact(e.target.value)}
              />
              {error.contact && <span className="text-red-500 text-sm">{error.contact}</span>}
            </div>
            <div className="mb-4">
              {/* <label className="block text-gray-700 text-lg font-bold mb-2">
                Password
              </label> */}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password && <span className="text-red-500 text-sm">{error.password}</span>}
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
    </div>
  );
}

export default Signin;
