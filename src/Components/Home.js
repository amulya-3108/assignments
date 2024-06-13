import React, { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faDollar } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${config.baseURL}showstudAssignments`,
          { headers: { Authorization: token } }
        );
        if (response.status === 200) {
          const data = response.data.data; // Extract the array from the data property
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const totalAssignments = assignments.length;
  const totalCost =
    assignments.reduce((sum, assignment) => sum + (assignment.rating || 0), 0) /
    totalAssignments;

  return (
    <div>
      <Header />
      <div className="container mx-auto my-10 mb-28">
        <div className="flex justify-around mb-10">
          <div className="p-6 text-center relative w-52 h-56">
            <div className="absolute inset-0 border-4 border-t-blue-500 border-l-blue-500 rounded-full animate-spin"></div>
            <div className="relative z-10 mt-5">
              <div className="text-5xl text-black">
                <FontAwesomeIcon icon={faListCheck} />
              </div>
              <div className="text-3xl font-bold mt-2">
                {totalAssignments}
              </div>
              <div className="text-lg font-semibold"><a href="/viewassignments">Total Work</a></div>
            </div>
          </div>
          <div className="p-6 text-center relative w-52">
            <div className="absolute inset-0 border-4 border-t-green-500 border-l-green-500 rounded-full animate-spin"></div>
            <div className="relative z-10 mt-5">
              <div className="text-5xl text-black">
                <FontAwesomeIcon icon={faDollar} />
              </div>
              <div className="text-3xl font-bold mt-2">
                {totalCost.toFixed(1)}
              </div>
              <div className="text-lg font-semibold">Total Cost</div>
            </div>
          </div>
          {/* Add more counters as needed */}
        </div>
        {/* <h1 className="text-4xl font-semibold text-center my-5">View Work</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-24">
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
                Price: {assignment.price}
              </p>
              {assignment.uploadedFiles !== "-" && (
                <div className="flex justify-around items-center mt-5">
                  <a
                    href={`${config.baseURL}uploads/${assignment.uploadedFiles}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    download>
                    Download
                  </a>
                  <Link
                    to="/feedback"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Feedback
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div> */}
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
  function formatDeadline(deadline) {
    const date = new Date(deadline);
    return date.toISOString().split("T")[0];
  }
}

export default Home;
