import React, { useRef, useState } from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";

function Addassignments() {
  return(
    <div>
        <Header/>
        <form className="px-16 pt-4 pb-1 mb-4">
            <div className="mb-4">
              {/* <label className="block text-gray-700 text-lg font-bold mb-2">
                Email or Phone Number
              </label> */}
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 h-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                // value={email}
                type="text"
                placeholder="Email or Phone Number"
                // onChange={(e) => setEmail(e.target.value)}
              />
              {/* {error && <span className="text-red-500 text-sm mt-2">{error}</span>} */}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-600 flex text-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600 mb-5 hover:bg-white hover:text-black hover:border-2 hover:border-blue-600"
                type="submit">
                Continue
              </button>
            </div>
          </form>
        <Footer/>
    </div>
  )
}

export default Addassignments;
