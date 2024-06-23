// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "./App.css";
// import Loader from "./Components/Loader";
// import Header from "./Components/Header";
// import Content from "./Components/Content";
// import Signin from "./Components/Signin";
// import Login from "./Components/Login";
// import Password from "./Components/Password";
// import ForgotPassword from "./Components/ForgotPassword";
// import ChangePassword from "./Components/ChangePassword";
// import Otp from "./Components/Otp";
// import ProtectedRoute from "./ProtectedRoute";
// import PublicRoute from "./PublicRoute";
// import Home from "./Components/Home";
// import Thankyou from "./Components/Thankyou";
// import Solverhome from "./Components/SolverHome";
// import Addassignments from "./Components/AddAssignments";
// import Viewassignments from "./Components/ViewAssignments";
// import Feedback from "./Components/Feedback";
// import Showwork from "./Components/ShowWork";
// import Acceptedassignments from "./Components/AcceptedAssignments";
// import Aboutus from "./Components/AboutUs";
// import Contactus from "./Components/ContactUs";
// import Privacypolicy from "./Components/PrivacyPolicy";

// function App() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000); // Adjust the loading time as needed

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Routes>
//           <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
//           <Route path="/solverhome" element={<ProtectedRoute><Solverhome /></ProtectedRoute>} />
//           <Route path="/changepassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
//           <Route path="/addassignments" element={<ProtectedRoute><Addassignments /></ProtectedRoute>} />
//           <Route path="/viewassignments" element={<ProtectedRoute><Viewassignments /></ProtectedRoute>} />
//           <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
//           <Route path="/showwork" element={<ProtectedRoute><Showwork /></ProtectedRoute>} />
//           <Route path="/acceptedassignments" element={<ProtectedRoute><Acceptedassignments /></ProtectedRoute>} />
//           <Route path="/verification" element={<PublicRoute><Thankyou /></PublicRoute>} />
//           <Route path="/" element={<PublicRoute><Content /></PublicRoute>} />
//           <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
//           <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
//           <Route path="/password" element={<PublicRoute><Password /></PublicRoute>} />
//           <Route path="/otp" element={<PublicRoute><Otp /></PublicRoute>} />
//           <Route path="/forgotpassword" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
//           <Route path="/aboutus" element={<Aboutus />} />
//           <Route path="/contactus" element={<Contactus />} />
//           <Route path="/privacypolicy" element={<Privacypolicy />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Signin from "./Components/Signin";
import Login from "./Components/Login";
import Password from "./Components/Password";
import ForgotPassword from "./Components/ForgotPassword";
import ChangePassword from "./Components/ChangePassword";
import Otp from "./Components/Otp";
import Loader from "./Components/Loader";
import Home from "./Components/Home";
import Solverhome from "./Components/SolverHome";
import Addassignments from "./Components/AddAssignments";
import Viewassignments from "./Components/ViewAssignments";
import Feedback from "./Components/Feedback";
import Showwork from "./Components/ShowWork";
import Acceptedassignments from "./Components/AcceptedAssignments";
import Content from "./Components/Content";
import Thankyou from "./Components/Thankyou";
import Aboutus from "./Components/AboutUs";
import Contactus from "./Components/ContactUs";
import Privacypolicy from "./Components/PrivacyPolicy";
import Manageprofile from "./Components/ManageProfile";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/password" element={<PublicRoute><Password /></PublicRoute>} />
          <Route path="/forgotpassword" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          <Route path="/otp" element={<PublicRoute><Otp /></PublicRoute>} />
          <Route path="/verification" element={<PublicRoute><Thankyou /></PublicRoute>} />
          <Route path="/" element={<PublicRoute><Content /></PublicRoute>} />
          
          <Route path="/changePassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute requiredRole="student"><Home /></ProtectedRoute>} />
          <Route path="/solverhome" element={<ProtectedRoute requiredRole="solver"><Solverhome /></ProtectedRoute>} />
          <Route path="/addassignments" element={<ProtectedRoute requiredRole="student"><Addassignments /></ProtectedRoute>} />
          <Route path="/viewassignments" element={<ProtectedRoute requiredRole="student"><Viewassignments /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute requiredRole="student"><Feedback /></ProtectedRoute>} />
          <Route path="/showwork" element={<ProtectedRoute requiredRole="solver"><Showwork /></ProtectedRoute>} />
          <Route path="/acceptedassignments" element={<ProtectedRoute requiredRole="solver"><Acceptedassignments /></ProtectedRoute>} />
          <Route path="/manageprofile" element={<ProtectedRoute><Manageprofile /></ProtectedRoute>} />

          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/privacypolicy" element={<Privacypolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

