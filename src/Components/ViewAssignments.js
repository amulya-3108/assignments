import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";
import ReactPaginate from "react-paginate";

function Viewassignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const assignmentsPerPage = 10;
  const token = localStorage.getItem("authToken");

  const fetchAssignments = useCallback(async (page) => {
    try {
      const response = await axios.get(
        `${config.baseURL}showstudAssignments?page=${page}&limit=${assignmentsPerPage}`,
        { headers: { Authorization: token } }
      );
      if (response.status === 200) {
        const { data, totalPages } = response.data;
        setAssignments(data);
        setTotalPages(totalPages);
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
  }, [assignmentsPerPage, token]);

  useEffect(() => {
    fetchAssignments(currentPage);
  }, [currentPage, fetchAssignments]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  const renderAssignments = () => {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    if (assignments.length === 0) {
      return <div>No assignments found.</div>;
    }

    return (
      <div className="mt-16 overflow-x-auto mx-20">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">Assignment Name</th>
              <th className="py-2 px-4 border border-gray-300">Deadline</th>
              <th className="py-2 px-4 border border-gray-300">Price</th>
              <th className="py-2 px-4 border border-gray-300">Rating</th>
              <th className="py-2 px-4 border border-gray-300">Feedback</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border border-gray-300">
                  {assignment.assignmentName}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {formatDeadline(assignment.deadlineDate)}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {assignment.price}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {assignment.performanceRating !== "-" ? assignment.performanceRating : "N/A"}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {assignment.FeedbackMessage !== "-" ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: assignment.FeedbackMessage,
                      }}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {assignment.uploadedFiles !== "-" && (
                    <>
                      <a
                        href={`${config.baseURL}uploads/${assignment.uploadedFiles}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mx-1"
                        download
                      >
                        Download
                      </a>
                      <Link
                        to={`/feedback?a=${assignment._id}`}
                        className={`bg-blue-600 text-white px-4 py-2 rounded mx-1 ${
                          assignment.FeedbackMessage !== "-" ? "cursor-not-allowed opacity-50" : "hover:bg-blue-700"
                        }`}
                        style={{ pointerEvents: assignment.FeedbackMessage !== "-" ? "none" : "auto" }}
                      >
                        Feedback
                      </Link>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    return date.toISOString().split("T")[0];
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto my-10 relative">
        <h1 className="text-4xl font-semibold text-center my-5">View Work</h1>
        {renderAssignments()}
        <div className="flex justify-center mt-10">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex list-none p-0"}
            subContainerClassName={"pages pagination"}
            activeClassName={"activepage"}
            pageClassName={"mx-1"}
            pageLinkClassName={
              "px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200"
            }
            previousClassName={"mx-1"}
            previousLinkClassName={
              "px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200"
            }
            nextClassName={"mx-1"}
            nextLinkClassName={
              "px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200"
            }
            breakLinkClassName={
              "px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-200"
            }
          />
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Viewassignments;
