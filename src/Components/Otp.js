import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OtpInput from "react-otp-input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../config";

function Otp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);
  async function otpData(e) {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${config.baseURL}otp/login`,
        { email, password, otp } 
      );
      if (response.status === 200) {
        const { token } = response.data;
        if (token) {
          localStorage.setItem("authToken", token);
          toast.success("Login Successful!");
        setTimeout(() => {
            navigate("/home");
          }, 3000);
        } else {
          toast.error("Something went wrong tray again");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid OTP");
      } else {
        console.error("Error message:", error.message);
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  }
  return (
    <div className="container mx-auto w-full md:w-1/3 flex flex-col items-center justify-center mt-20 mb-4 rounded-2xl md:border p-4">
      <h1 className="text-4xl font-semibold my-5 text-center">OTP</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-auto justify-around items-center">
          <form className="px-16 pt-4 pb-1" onSubmit={otpData}>
            <div className="mb-4">
              {/* <label className="block text-gray-700 text-sm font-bold mb-4">
                OTP
              </label> */}
              {/* <input
                className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="otp"
                type="text"
                value={otp}
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
              /> */}
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="mx-2 text-xl">-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="shadow appearance-none border rounded w-10 md:w-24 h-12 items-center justify-center text-gray-700 text-center leading-tight focus:outline-none focus:shadow-outline" style={{ width: '3rem' }}
                  />
                )}
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
          <div className="flex items-center justify-center mb-10">
            {/* <div className="border-t border-black flex-grow h-0.5 mr-3 ml-20 mt-2"></div> */}
            <Link onSubmit={otpData} className="text-blue-900 text-sm font-semibold">
              Still not received OTP? Resend it
            </Link>
            {/* <div className="border-t border-black flex-grow h-0.5 ml-3 mr-20 mt-2"></div> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Otp;
