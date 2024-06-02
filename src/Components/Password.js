import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config"; 

function Password() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);
  async function passwordData(e) {
    e.preventDefault();

    setError(""); // Clear any previous error messages
    try {
      const response = await axios.post(
        `${config.baseURL}password/login`,
        { email: email, password: password }
      );
      if (response.status === 200) {
        localStorage.setItem("password", password);
        navigate("/otp");
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
    <div className="container mx-auto w-full md:w-1/3 justify-around items-center mt-20 mb-4 rounded-2xl md:border">
      <h1 className="text-4xl font-semibold my-5 text-center">Password</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-auto justify-around items-center">
          <form className="px-16 pt-4 pb-1" onSubmit={passwordData}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-4">
                You're Signing in as <br />
                <span className="font-bold">{email}</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="flex justify-end mb-10">
            <Link
              to="/forgotpassword"
              className="text-blue-900 text-sm font-semibold mr-16">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;
