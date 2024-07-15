import React, { useEffect, useState } from "react";
import "../../index.css";
import Header from "../Header";
import Footer from "../Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faStar,
  faDollar,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader";

function Solverhome() {
  const [assignments, setAssignments] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        const responseTotal = await axios.get(
          `${config.baseURL}showAssignments`,
          { headers: { Authorization: token } }
        );
        if (responseTotal.status === 200) {
          const dataTotal = responseTotal.data.data;
          if (Array.isArray(dataTotal)) {
            setAssignments(dataTotal);
          } else {
            console.error(
              "Unexpected response format for total assignments:",
              dataTotal
            );
            setAssignments([]);
          }
        }

        const responseUpcoming = await axios.get(
          `${config.baseURL}doneAssignment`,
          { headers: { Authorization: token } }
        );
        if (responseUpcoming.status === 200) {
          const dataUpcoming = responseUpcoming.data.data;
          if (Array.isArray(dataUpcoming)) {
            const filteredUpcoming = dataUpcoming
              .filter((assignment) => {
                const deadlineDate = new Date(assignment.deadlineDate);
                return deadlineDate >= new Date();
              })
            setUpcomingAssignments(filteredUpcoming);
          } else {
            console.error(
              "Unexpected response format for upcoming assignments:",
              dataUpcoming
            );
            setUpcomingAssignments([]);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const totalAssignmentsCount = assignments.length;
  const totalRating =
    assignments.reduce((sum, assignment) => sum + (assignment.rating || 0), 0) /
    totalAssignmentsCount;

  return (
    <div>
      <Header />
      <div className="container mx-auto my-10">
        <div className="flex justify-around mb-10 mx-10">
          <div className="p-6 text-center relative w-52 h-56">
            <div className="absolute inset-0 border-4 border-t-blue-500 border-l-blue-500 rounded-full animate-spin"></div>
            <div className="relative z-10 mt-5">
              <div className="text-5xl text-black">
                <FontAwesomeIcon icon={faListCheck} />
              </div>
              <div className="text-3xl font-bold mt-2">
                {totalAssignmentsCount}
              </div>
              <div className="text-lg font-semibold">
                <a href="/viewassignments">Total Work</a>
              </div>
            </div>
          </div>
          <div className="p-6 text-center relative w-52">
            <div className="absolute inset-0 border-4 border-t-green-500 border-l-green-500 rounded-full animate-spin"></div>
            <div className="relative z-10 mt-5">
              <div className="text-5xl text-black">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="text-3xl font-bold mt-2">
                {totalRating.toFixed(1)}
              </div>
              <div className="text-lg font-semibold">Rating</div>
            </div>
          </div>
          <div className="p-6 text-center relative w-52">
            <div className="absolute inset-0 border-4 border-t-yellow-500 border-l-yellow-500 rounded-full animate-spin"></div>
            <div className="relative z-10 mt-5">
              <div className="text-5xl text-black">
                <FontAwesomeIcon icon={faDollar} />
              </div>
              <div className="text-3xl font-bold mt-2">
                {totalRating.toFixed(1)}
              </div>
              <div className="text-lg font-semibold">Earning</div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-semibold text-center mt-24 mb-10">
          Upcoming Work
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-24">
          {upcomingAssignments.map((assignment) => (
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

export default Solverhome;
