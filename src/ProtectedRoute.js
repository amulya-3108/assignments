import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./Auth";

function ProtectedRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;