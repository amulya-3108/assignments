import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./Auth";

function PublicRoute({ children }) {
  if (isAuthenticated()) {
    const userRole = getUserRole();
    if (userRole === "student") {
      return <Navigate to="/home" />;
    } else if (userRole === "solver") {
      return <Navigate to="/solverhome" />;
    }
  }

  return children;
}

export default PublicRoute;
