import React, { useEffect, useState, useRef } from "react";
import "../../index.css";
import Header from "../Header";
import Footer from "../Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../../config";
import Loader from "../Loader";
import ReactPaginate from "react-paginate";
import { FileUpload } from "primereact/fileupload";

function AcceptedAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadingAssignmentId, setUploadingAssignmentId] = useState("");
  const [fileToUpload, setFileToUpload] = useState(null);
  const fileUploadRef = useRef(null);

  const assignmentsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${config.baseURL}showAssignmentsByAcc`,
          { headers: { Authorization: token } }
        );
        if (response.status === 200) {
          let data = response.data.data;
          setAssignments(data);
          setFilteredAssignments(data);
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

  const toggleFileInput = (assignmentId) => {
    if (uploadingAssignmentId === assignmentId) {
      setUploadingAssignmentId("");
    } else {
      setUploadingAssignmentId(assignmentId);
    }
  };

  const handleFileSelect = (event) => {
    setFileToUpload(event.files[0]);
  };

  const handleFileUpload = async () => {
    if (!fileToUpload) return;

    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);

      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${config.baseURL}post/Solverassignments/${uploadingAssignmentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("File uploaded successfully!");
        setFileToUpload(null);
        if (fileUploadRef.current) {
          fileUploadRef.current.clear();
        }
        // Update assignments state without reloading the page
        const updatedAssignments = assignments.map(assignment => 
          assignment._id === uploadingAssignmentId ? { ...assignment, files: response.data.file } : assignment
        );
        setAssignments(updatedAssignments);
        setFilteredAssignments(updatedAssignments);
      } else {
        toast.error("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file. Please try again.");
    }
  };

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
        <h1 className="text-4xl font-semibold text-center my-5">
          Accepted Work
        </h1>
        <div className="absolute right-0 top-5 mt-5 mr-5">
          <input
            type="text"
            placeholder="Search by assignment name or price..."
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
              {currentAssignments.map((assignment) => (
                <tr key={assignment._id} className="text-center">
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
                    <a
                      href={`${config.baseURL}uploads/${assignment.files}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mx-1"
                      download>
                      Download
                    </a>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mx-1"
                      onClick={() => toggleFileInput(assignment._id)}>
                      Upload
                    </button>
                    {uploadingAssignmentId === assignment._id && (
                      <div className="card">
                        <FileUpload
                          name="file" // Ensure this matches the field name used in multer
                          ref={fileUploadRef}
                          multiple
                        
                          maxFileSize={250 * 1024 * 1024}
                          emptyTemplate={
                            <p className="m-3 text-gray-500 text-center py-4 border-dashed border-2 border-blue-500 rounded">
                              Drag and drop files to here to upload.
                            </p>
                          }
                          chooseOptions={{
                            label: "Choose",
                            icon: "pi pi-fw pi-plus",
                            className:
                              "p-button p-component m-3 w-20 h-8 bg-blue-600 rounded text-white hover:bg-blue-700",
                          }}
                          uploadOptions={{
                            label: "Upload",
                            icon: "pi pi-upload",
                            className:
                              "p-button p-component m-3 w-20 h-8 bg-green-600 rounded text-white hover:bg-green-700",
                          }}
                          cancelOptions={{
                            label: "Cancel",
                            icon: "pi pi-times",
                            className:
                              "p-button p-component m-3 w-20 h-8 bg-red-600 rounded text-white hover:bg-red-700",
                          }}
                          onSelect={handleFileSelect}
                        />
                        {error && (
                          <span className="text-red-500 text-sm mt-2">
                            {error.files}
                          </span>
                        )}
                        <button
                          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
                          onClick={handleFileUpload}>
                          Upload File
                        </button>
                      </div>
                    )}
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

export default AcceptedAssignments;
