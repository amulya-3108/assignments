import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
function Header() {
  const [isActive, setActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAssignmentsDropdownOpen, setAssignmentsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toogleNav = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-white sticky top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between p-8">
      {/* <h1>Header</h1> */}
      <Link to="/">
        <div className="logo w-16 h-16">
          <img src="../images/logo.png" alt="logo" />
        </div>
      </Link>
      <nav className="flex justify-center">
      {isLoggedIn ? (
          <div className="hidden w-full md:flex justify-between items-center">
            <div className="relative">
              <Link to="/home" className="px-6 py-2 text-center font-bold">Home</Link>
            </div>
            <div
              className="relative"
              onMouseEnter={() => setAssignmentsDropdownOpen(true)}
              onMouseLeave={() => setAssignmentsDropdownOpen(false)}
            >
              <Link to="" className="px-6 py-2 text-center font-bold">Assignments</Link>
              {isAssignmentsDropdownOpen && (
                <div className="absolute bg-white border w-56 mt-2 py-2 rounded shadow-lg">
                  <Link to="/addassignments" className="block px-4 py-2 text-black hover:bg-gray-200">Add Assignment</Link>
                  <Link to="/viewassignments" className="block px-4 py-2 text-black hover:bg-gray-200">View Assignment</Link>
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setProfileDropdownOpen(true)}
              onMouseLeave={() => setProfileDropdownOpen(false)}
            >
              <Link to="/profile" className="px-6 py-2 text-center font-bold">Profile</Link>
              {isProfileDropdownOpen && (
                <div className="absolute bg-white border w-56 mt-2 py-2 rounded shadow-lg">
                  <Link to="/changepassword" className="block px-4 py-2 text-black hover:bg-gray-200">Change Password</Link>
                  <Link to="/assignment2" className="block px-4 py-2 text-black hover:bg-gray-200">Settings</Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={handleLogout} className="px-6 py-2 text-center font-bold">Logout</button>
            </div>
          </div>
        )  : (
          <div className="hidden w-full md:flex justify-between">
            <Link to="/" className="px-6 py-2 text-center font-bold">
              Home
            </Link>
            <Link to="/login" className="px-6 py-2 text-center font-bold">
              Login
            </Link>
            <Link
              to="/signin"
              className="inline-block px-6 py-2 text-white bg-blue-600 rounded-md text-center font-bold hover:bg-white hover:text-black hover:border-2 hover:border-blue-600">
              Get Started
            </Link>
          </div>
        )}
        <div className="md:hidden">
          <button onClick={toogleNav}>{isActive ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {isActive && (
        <div className="flex basis-full flex-col items-center">
          {isLoggedIn ? (
            <>
              <Link
                to="/assignments"
                className="px-6 py-2 text-center font-bold">
                Assignments
              </Link>
              <Link to="/profile" className="px-6 py-2 text-center font-bold">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-center font-bold">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="px-6 py-2 text-center font-bold">
                Home
              </Link>
              <Link to="/login" className="px-6 py-2 text-center font-bold">
                Login
              </Link>
              <Link
                to="/signin"
                className="inline-block px-6 py-2 text-white bg-blue-600 rounded-md text-center font-bold">
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
export default Header;
