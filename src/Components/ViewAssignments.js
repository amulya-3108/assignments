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
import ReactPaginate from "react-paginate";

function Viewassignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Page index starts from 0
  const assignmentsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${config.baseURL}showstudAssignments`,
          { headers: { Authorization: token } }
        );
        if (response.status === 200) {
          const data = response.data.data;
          if (Array.isArray(data)) {
            setAssignments(data);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastAssignment = (currentPage + 1) * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = assignments.slice(indexOfFirstAssignment, indexOfLastAssignment);

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
          {currentAssignments.map((assignment, index) => (
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
              {assignment.performanceRating !== "-" && (
                <p className="text-xl font-semibold text-blue-800 p-2">
                  Rating: {assignment.performanceRating}
                </p>
              )}
              {assignment.FeedbackMessage !== "-" && (
                <p className="text-xl font-semibold text-blue-800 p-2">
                  <span className="inline-block mr-2">Feedback:</span>
                  <span className="inline-block" dangerouslySetInnerHTML={{ __html: assignment.FeedbackMessage }} />
                </p>
              )}
              {assignment.uploadedFiles !== "-" && (
                <div className="flex justify-around items-center mt-5">
                  <a
                    href={`${config.baseURL}uploads/${assignment.uploadedFiles}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    download>
                    Download
                  </a>
                  <Link
                    to={`/feedback?a=${assignment._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Feedback
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(assignments.length / assignmentsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex list-none p-0"}
            subContainerClassName={"pages pagination"}
            activeClassName={"activepage"}
            pageClassName={"mx-1"}
            pageLinkClassName={"px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200"}
            previousClassName={"mx-1"}
            previousLinkClassName={"px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200"}
            nextClassName={"mx-1"}
            nextLinkClassName={"px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200"}
            breakLinkClassName={"px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200"}
          />
        </div>
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

export default Viewassignments;
