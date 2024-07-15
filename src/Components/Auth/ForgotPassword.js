import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../../config";

function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  async function forgotData(e) {
    console.log(email);
    e.preventDefault();

    setError("");
    try {
      const response = await axios.post(
        `${config.baseURL}forgotPassword`,
        { email: email}
      );
      if (response.status === 200) {
        localStorage.setItem("email", email);
        toast.success("Password sent in Email");
        setTimeout(() => {
            navigate("/login");
          }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or phone number");
      } else {
        console.error("Error message:", error.message);
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  }
  return (
    <div className="container mx-auto w-full md:w-1/3 justify-around items-center mt-20 mb-20 rounded-2xl md:border">
      <h1 className="text-4xl font-semibold my-5 text-center">Forgot Password</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-auto justify-around items-center">
          <form className="px-16 pt-4 pb-1 mb-4" onSubmit={forgotData}>
            <div className="mb-4">
              {/* <label className="block text-gray-700 text-lg font-bold mb-2">
                Email or Phone Number
              </label> */}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                type="text"
                placeholder="Email or Phone Number"
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <span className="text-red-500 text-sm mt-2">{error}</span>}
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
      <ToastContainer />
    </div>
  );
}

export default Forgot;
