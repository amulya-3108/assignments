import React from "react";
import { Link } from "react-router-dom"

function Thankyou() {
  return (
    <div className="container mx-auto w-full md:w-2/5 justify-around items-center mt-20 mb-20 rounded-2xl md:border">
      <h1 className="text-3xl font-semibold m-5 text-center">Thank You for verifing your account you can login now!</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-auto justify-around items-center">
          <div className="flex items-center justify-center mb-4">
          <Link to="/login"
                className="bg-blue-600 flex text-white items-center justify-center w-1/2 m-5 font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600 mb-5 hover:bg-white hover:text-black hover:border-2 hover:border-blue-600"
                type="submit">
                Login
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thankyou;
