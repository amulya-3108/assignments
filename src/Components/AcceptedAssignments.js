import React, { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../config";
import Loader from "./Loader";

function Acceptedassignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get(
          `${config.baseURL}showAssignmentsByAcc`,
          { headers: { Authorization: token } }
        );
        if (response.status === 200) {
          setAssignments(response.data.data);
        } else {
          console.error("Failed to fetch data:", response);
          setError("Failed to fetch assignments");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Failed to load assignments");
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the loading time as needed

    return () => clearTimeout(timer);
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
      <div className="container mx-auto mb-10">
        <h1 className="text-4xl font-semibold text-center mt-5 mb-10">
          Accepted Work
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-24">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
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
                  href={`${config.baseURL}uploads/${assignment.files}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  download>
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
  function formatDeadline(deadline) {
    if (!deadline) return "No deadline"; // Handle case where deadline is not provided or invalid

    const date = new Date(deadline);
    if (isNaN(date.getTime())) {
      return "Invalid deadline"; // Handle case where deadline is not a valid date
    }

    return date.toISOString().split("T")[0];
  }
}

export default Acceptedassignments;
