import React, { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import config from "../config";

function Viewassignments() {
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
            toast.success("Assignments loaded successfully!");
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

  return (
    <div>
      <Header />
      <div className="container mx-auto my-10">
        <h1 className="text-4xl font-semibold text-center my-5">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mx-20">
          {assignments.map((assignment, index) => (
            <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-lg h-auto w-full">
              <p className="text-xl font-semibold text-blue-800 p-2">
                Assignment Name: {assignment.assignmentName}
              </p>
              <p className="text-xl font-semibold text-blue-800 p-2">
                Deadline: {formatDeadline(assignment.deadlineDate)}
              </p>
              <p className="text-xl font-semibold text-blue-800 p-2">
               Price: {assignment.price}
              </p>
              <p className="text-xl font-semibold text-blue-800 p-2">
               
              </p>
              <p className="text-xl font-semibold text-blue-800 p-2">
              
              </p>
              {assignment.uploadedFiles !== '-' && (
                <div className="flex justify-around items-center mt-5">
                  <a
                    href={`http://192.168.0.27:3000/uploads/${assignment.uploadedFiles}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    download
                  >
                    Download
                  </a>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Feedback
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
  function formatDeadline(deadline) {
    const date = new Date(deadline);
    return date.toISOString().split('T')[0];
  }
  
}

export default Viewassignments;
