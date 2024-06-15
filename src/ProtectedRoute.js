// import React from "react";
// import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "./Auth";

// function ProtectedRoute({ children }) {
//   if (!isAuthenticated()) {
//     return <Navigate to="/" />;
//   }

//   return children;
// }

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./Auth";

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

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate route based on user role
    return <Navigate to={`/${userRole === "student" ? "home" : "solverhome"}`} />;
  }

  return children;
}

export default ProtectedRoute;
