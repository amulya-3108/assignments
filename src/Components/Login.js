import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../config"; 
import Loader from "./Loader";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const phone = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function loginData(e) {
    e.preventDefault();

    setError("");
    
    try {
      const response = await axios.post(
        `${config.baseURL}email/login`,
        { email: email, phone: phone }
      );
      if (response.status === 200) {
        localStorage.setItem("email", email);
        navigate("/password");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or phone number");
      } else {
        console.error("Error message:", error.message);
        toast.error("Something went wrong try again!");
      }
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <div><Loader/></div>;
  }
  return (
    <div className="container mx-auto w-full md:w-1/3 justify-around items-center mt-20 mb-20 rounded-2xl md:border">
      <h1 className="text-4xl font-semibold my-5 text-center">Log In</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-auto justify-around items-center">
          <form className="px-16 pt-4 pb-1 mb-4" onSubmit={loginData}>
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
          <div className="flex items-center justify-between mb-4">
            <div className="border-t border-black flex-grow h-0.5 mr-3 ml-20 mt-2"></div>
            <span className="text-black text-xl">or</span>
            <div className="border-t border-black flex-grow h-0.5 ml-3 mr-20 mt-2"></div>
          </div>
          <div className="flex flex-col items-center justify-between px-16 pt-4 pb-2 mb-5">
            <Link
              className="flex bg-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600 mb-5"
              type="button">
              <img src="../images/icons8-google.svg" alt="Google"/>
              <span className="ml-2">Continue with Google</span>
            </Link>
            <Link
              className="flex bg-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600"
              type="button">
              <img src="../images/icons8-apple.svg" alt="Apple" className="mr-2" />
              <span className="ml-1">Continue with Apple</span>
            </Link>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="border-t border-black flex-grow h-0.5 mr-3 ml-20 mt-2"></div>
            <Link to="/signin" className="text-blue-900 text-xl font-semibold">
            Don't have an account? Sign Up
            </Link>
            <div className="border-t border-black flex-grow h-0.5 ml-3 mr-20 mt-2"></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
