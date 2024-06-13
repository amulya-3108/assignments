import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./Components/Loader";
import Header from "./Components/Header";
import Content from "./Components/Content";
import Signin from "./Components/Signin";
import Login from "./Components/Login";
import Password from "./Components/Password";
import ForgotPassword from "./Components/ForgotPassword";
import ChangePassword from "./Components/ChangePassword";
import Otp from "./Components/Otp";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Components/Home";
import Thankyou from "./Components/Thankyou";
import Solverhome from "./Components/SolverHome";
import Addassignments from "./Components/AddAssignments";
import Viewassignments from "./Components/ViewAssignments";
import Feedback from "./Components/Feedback";
import Showwork from "./Components/ShowWork";
import Acceptedassignments from "./Components/AcceptedAssignments";
import Aboutus from "./Components/AboutUs";
import Contactus from "./Components/ContactUs";
import Privacypolicy from "./Components/PrivacyPolicy";

function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the loading time as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* {isLoggedIn ? ( */}
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/solverhome" element={<Solverhome />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/addassignments" element={<Addassignments />} />
              <Route path="/viewassignments" element={<Viewassignments />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/showwork" element={<Showwork />} />
              <Route path="/acceptedassignments" element={<Acceptedassignments />} />
            </>
          {/* ) : ( */}
            <>
              <Route path="/verification" element={<Thankyou />} />
              <Route path="/" element={<ProtectedRoute><Content /></ProtectedRoute>} />
              <Route path="/signin" element={<ProtectedRoute><Signin /></ProtectedRoute>} />
              <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
              <Route path="/password" element={<ProtectedRoute><Password /></ProtectedRoute>} />
              <Route path="/otp" element={<ProtectedRoute><Otp /></ProtectedRoute>} />
              <Route path="/forgotpassword" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
            </>
          {/* )} */}
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/contactus" element={<Contactus />} />
              <Route path="/privacypolicy" element={<Privacypolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
