import React, { useEffect, useState, useRef } from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../config";
import Loader from "./Loader";
import { FileUpload } from "primereact/fileupload";

function Acceptedassignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadVisible, setUploadVisible] = useState({});
  const fileInputRefs = useRef([]);

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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleFileSelect = (e, assignmentId) => {
    console.log(`Selected files for assignment ${assignmentId}:`, e.files);
  };

  const toggleUploadVisibility = (assignmentId) => {
    setUploadVisible((prev) => ({
      ...prev,
      [assignmentId]: !prev[assignmentId],
    }));
  };

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
          {assignments.map((assignment, index) => (
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
                <button
                  onClick={() => toggleUploadVisibility(assignment._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Upload
                </button>
              </div>
              {uploadVisible[assignment._id] && (
                <div className="mt-4">
                  <label className="block text-gray-700 text-lg font-bold mb-2">
                    Upload Document
                  </label>
                  <div className="card">
                    <FileUpload
                      name="files"
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      multiple
                      accept="image/*"
                      maxFileSize={1000000}
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
                      onSelect={(e) => handleFileSelect(e, assignment._id)}
                    />
                    {error && error.files && (
                      <span className="text-red-500 text-sm mt-2">
                        {error.files}
                      </span>
                    )}
                  </div>
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
    if (!deadline) return "No deadline";
    const date = new Date(deadline);
    if (isNaN(date.getTime())) {
      return "Invalid deadline";
    }

    return date.toISOString().split("T")[0];
  }
}

export default Acceptedassignments;
