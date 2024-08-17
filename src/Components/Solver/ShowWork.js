import React, { useEffect, useState } from "react";
import "../../index.css";
import Header from "../Header";
import Footer from "../Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import ReactPaginate from "react-paginate";

const acceptWork = async (e, assignmentId) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      toast.error("Authorization token is missing");
      return;
    }

    const response = await axios.put(
      `${config.baseURL}sendAssSolvereq/${assignmentId}`,
      {},
      { headers: { Authorization: token } }
    );

    if (response.status === 200) {
      toast.success("Assignment accepted successfully!");
      window.location.reload();
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
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const assignmentsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          toast.error("Authorization token is missing");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${config.baseURL}showAssignments`, {
          headers: { Authorization: token },
        });

        if (response.status === 200) {
          const data = response.data.data;
          if (Array.isArray(data)) {
            setAssignments(data);
            setFilteredAssignments(data);
          } else {
            console.error("Unexpected response format:", data);
            setAssignments([]);
            setFilteredAssignments([]);
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

  useEffect(() => {
    const handleSearch = () => {
      const filtered = assignments.filter((assignment) => {
        const searchTerm = searchQuery.toLowerCase();
        const priceString =
          assignment.solverPrice !== undefined
            ? assignment.solverPrice.toString()
            : "";
        return (
          assignment.assignmentName.toLowerCase().includes(searchTerm) ||
          priceString.includes(searchTerm)
        );
      });
      setFilteredAssignments(filtered);
      setCurrentPage(0);
    };

    handleSearch();
  }, [searchQuery, assignments]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const indexOfLastAssignment = (currentPage + 1) * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = filteredAssignments.slice(
    indexOfFirstAssignment,
    indexOfLastAssignment
  );

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto my-10 relative">
        <h1 className="text-4xl font-semibold text-center my-5">View Work</h1>
        <div className="absolute right-0 top-5 mt-5 mr-5">
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-full w-full sm:w-96 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mt-16 overflow-x-auto mx-20">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-gray-300">
                  Assignment Name
                </th>
                <th className="py-2 px-4 border border-gray-300">Deadline</th>
                <th className="py-2 px-4 border border-gray-300">Price</th>
                <th className="py-2 px-4 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAssignments.map((assignment, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border border-gray-300">
                    {assignment.assignmentName}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {formatDeadline(assignment.deadlineDate)}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {assignment.solverPrice}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    <button
                      onClick={(e) => acceptWork(e, assignment._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Accept
                    </button>
                    <Link
                      to=""
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-2">
                      Reject
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-10">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(
              filteredAssignments.length / assignmentsPerPage
            )}
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

  function formatDeadline(deadline) {
    const date = new Date(deadline);
    return date.toISOString().split("T")[0];
  }
}

export default Showwork;
