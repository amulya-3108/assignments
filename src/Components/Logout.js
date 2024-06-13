import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/login");
  }, []); // Empty dependency array ensures that this effect runs only once

  // Render null or a message if needed
  return null;
}

export default Logout;
