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
import Addassignments from "./Components/AddAssignments";
import Viewassignments from "./Components/ViewAssignments";
import Feedback from "./Components/Feedback";

function App() {
  const [loading, setLoading] = useState(true);

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
      {/* <div className="App">
      <header className="App-header">
        <Header />
      </header>
    </div> */}
      <div className="flex flex-col min-h-screen">
        {/* <Header /> */}
        {/* <main className="flex-grow">
          <Content />
        </main> */}
        <Routes>
          <Route path="/" element={<Content />} />
          <Route
            path="/signin"
            element={
              <ProtectedRoute>
                <Signin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password"
            element={
              <ProtectedRoute>
                <Password />
              </ProtectedRoute>
            }
          />
          <Route
            path="/otp"
            element={
              <ProtectedRoute>
                <Otp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgotpassword"
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/addassignments" element={<Addassignments />} />
          <Route path="/viewassignments" element={<Viewassignments />} />
          <Route path="/feedback" element={<Feedback />} />
          {/* <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route path="/otp" element={<Otp />} /> */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
