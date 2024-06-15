import React, { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const acceptWork = async (e, assignmentId) => {
  e.preventDefault(); 

  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Authorization token is missing");
      return;
    }

    console.log("Token retrieved:", token);

    const response = await axios.put(
      `${config.baseURL}sendAssSolvereq/${assignmentId}`,
      {},
      { headers: { Authorization: token } }
    );

    if (response.status === 200) {
      toast.success("Assignments accepted successfully!");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error("Unauthorized. Please log in again.");
    } else {
      toast.error("Something went wrong, try again!");
    }
    console.log("Error:", error);
  }
};

function Showwork() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the loading time as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Authorization token is missing");
          setLoading(false);
          return;
        }

        console.log("Token retrieved:", token);

        const response = await axios.get(`${config.baseURL}showAssignments`, {
          headers: { Authorization: token },
        });

        if (response.status === 200) {
          const data = response.data.data;
          if (Array.isArray(data)) {
            setAssignments(data);
            // toast.success("Assignments loaded successfully!");
          } else {
            console.error("Unexpected response format:", data);
            setAssignments([]);
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Failed to load assignments. Unauthorized.");
        } else {
          toast.error("Something went wrong, try again!");
        }
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div><Loader /></div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto my-10">
        <h1 className="text-4xl font-semibold text-center my-5">View Work</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mx-20">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="bg-blue-100 p-6 rounded-lg shadow-lg h-auto w-full">
              <p className="text-xl font-semibold text-blue-800 p-2">
                Assignment Name: {assignment.assignmentName}
              </p>
              <p className="text-xl font-semibold text-blue-800 p-2">
                Deadline: {formatDeadline(assignment.deadlineDate)}
              </p>
              <p className="text-xl font-semibold text-blue-800 p-2">
                Price: {assignment.solverPrice}
              </p>
              <div className="flex justify-around items-center mt-5">
                <a
                  href="#"
                  onClick={(e) => acceptWork(e, assignment._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Accept
                </a>
                <Link
                  to=""
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Reject
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

function formatDeadline(deadline) {
  const date = new Date(deadline);
  return date.toISOString().split("T")[0];
}

export default Showwork;
