import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./Auth";
import Loader from "./Components/Loader";

function ProtectedRoute({ children, requiredRole }) {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      const role = getUserRole();
      setUserRole(role);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <div><Loader/></div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to={`/${userRole === "student" ? "home" : "solverhome"}`} />;
  }

  return children;
}

export default ProtectedRoute;
