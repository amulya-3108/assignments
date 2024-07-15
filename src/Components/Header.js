import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import config from "../config";
import axios from "axios";
import Avatar from 'react-avatar';

function Header() {
  const [isActive, setActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAssignmentsDropdownOpen, setAssignmentsDropdownOpen] =
    useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [profilepic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const toggleNav = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get(`${config.baseURL}getUserInfo`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response.status === 200) {
           
            const { role,profilepic } = response.data.data;
            setRole(role);
            setProfilePic(profilepic);
            // console.log("Role set to:", role);
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching user details", error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-white sticky top-0 flex-wrap z-[20] mx-auto flex w-full items-center justify-between p-5">
      <Link to="/">
        <div className="logo w-16 h-16">
          <img src="../images/logo.png" alt="logo" />
        </div>
      </Link>
      <nav className="flex justify-center">
        {isLoggedIn ? (
          <div className="hidden w-full md:flex justify-between items-center">
            {role === "student" && (
              <>
                <div className="relative">
                  <Link to="/home" className="px-6 py-2 text-center font-bold">
                    Home
                  </Link>
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setAssignmentsDropdownOpen(true)}
                  onMouseLeave={() => setAssignmentsDropdownOpen(false)}>
                  <Link to="" className="px-6 py-2 text-center font-bold">
                    Assignments
                  </Link>
                  {isAssignmentsDropdownOpen && (
                    <div className="absolute bg-white border w-56 mt-2 py-2 rounded shadow-lg">
                      <Link
                        to="/addassignments"
                        className="block px-4 py-2 text-black hover:bg-gray-200">
                        Add Assignment
                      </Link>
                      <Link
                        to="/viewassignments"
                        className="block px-4 py-2 text-black hover:bg-gray-200">
                        View Assignment
                      </Link>
                    </div>
                  )}
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setProfileDropdownOpen(true)}
                  onMouseLeave={() => setProfileDropdownOpen(false)}>
                  <Link
                    to=""
                    className="px-6 py-2 text-center font-bold">
                    Profile
                  </Link>
                  {isProfileDropdownOpen && (
                    <div className="absolute bg-white border w-56 mt-2 py-2 rounded shadow-lg">
                      <Link
                        to="/changepassword"
                        className="block px-4 py-2 text-black hover:bg-gray-200">
                        Change Password
                      </Link>
                      <Link
                        to="/referal"
                        className="block px-4 py-2 text-black hover:bg-gray-200">
                        Referral
                      </Link>
                      <Link
                        to="/manageprofile"
                        className="block px-4 py-2 text-black hover:bg-gray-200">
                        Manage Profile
                      </Link>
                    </div>
                  )}
                </div>
                <div className="relative">
                {profilepic ? (
                    <Avatar size="40" round={true} src={`${config.baseURL}/uploads/${profilepic}`} />
                  ) : (
                    <Avatar size="40" round={true} />
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 text-center font-bold">
                    Logout
                  </button>
                </div>
              </>
            )}
            {role === "solver" && (
              <>
                <div className="relative">
                  <Link
                    to="/solverhome"
                    className="px-6 py-2 text-center font-bold">
                    Home
                  </Link>
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setAssignmentsDropdownOpen(true)}
                  onMouseLeave={() => setAssignmentsDropdownOpen(false)}>
                  <Link to="" className="px-6 py-2 text-center font-bold">
                    Assignments
                  </Link>
                  {isAssignmentsDropdownOpen && (
                    <div className="absolute bg-white border w-56 mt-2 py-2 rounded shadow-lg">
                      <Link
                        to="/acceptedassignments"
                        className="block px-4 py-2 text-black hover:bg-gray-200">
                        Accepted Assignment
                      </Link>
                      <Link
                        to="/showwork"
                        className="block px-4 py-2 text-black hover:bg-gray-200">
                        View Assignment
                      </Link>
                    </div>
                  )}
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setProfileDropdownOpen(true)}
                  onMouseLeave={() => setProfileDropdownOpen(false)}>
                  <Link
                    to=""
                    className="px-6 py-2 text-center font-bold">
                    Profile
                  </Link>
                  {isProfileDropdownOpen && (
                    <div className="absolute bg-white border w-56 mt-2 py-2 rounded shadow-lg">
                      <Link
                        to="/changepassword"
                        className="block px-4 py-2 text-black hover:bg-gray-200">
                        Change Password
                      </Link>
                      <Link
                        to="/manageprofile"
                        className="block px-4 py-2 text-black hover:bg-gray-200">
                        Manage Profile
                      </Link>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 text-center font-bold">
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
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
          <button onClick={toggleNav}>{isActive ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {isActive && (
        <div className="flex basis-full flex-col items-center">
          {isLoggedIn ? (
            <>
              {role === "student" && (
                <>
                  <Link to="/home" className="px-6 py-2 text-center font-bold">
                    Home
                  </Link>
                  <Link
                    to="/addassignments"
                    className="px-6 py-2 text-center font-bold">
                    Accepted Assignment
                  </Link>
                  <Link
                    to="/viewassignments"
                    className="px-6 py-2 text-center font-bold">
                    View Assignment
                  </Link>
                  <Link
                    to="/changepassword"
                    className="px-6 py-2 text-center font-bold">
                    Change Password
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 text-center font-bold">
                    Logout
                  </button>
                </>
              )}
              {role === "solver" && (
                <>
                  <Link
                    to="/solverhome"
                    className="px-6 py-2 text-center font-bold">
                    Home
                  </Link>
                  <Link
                    to="/acceptedassignments"
                    className="px-6 py-2 text-center font-bold">
                    Accepted Assignment
                  </Link>
                  <Link
                    to="/showwork"
                    className="px-6 py-2 text-center font-bold">
                    View Assignment
                  </Link>
                  <Link
                    to="/changepassword"
                    className="px-6 py-2 text-center font-bold">
                    Change Password
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 text-center font-bold">
                    Logout
                  </button>
                </>
              )}
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
