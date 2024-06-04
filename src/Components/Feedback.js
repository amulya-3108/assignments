import React, { useRef, useState } from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import { RadioButton } from "primereact/radiobutton";
import { Editor } from "primereact/editor";
import config from "../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //   const token = localStorage.getItem("authToken");
      //   const response = await axios.post(`${config.baseURL}feedback/aid`, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //       'Authorization': token
      //     },
      //   });
      toast.success("Feedback submitted");
    } catch (error) {
      toast.error("Error while submitting feedback. Try again!");
    }
  };
  return (
    <div>
      <Header />
      <div className="container mx-auto w-full md:w-1/2 justify-around items-center mt-5 mb-20">
        <h1 className="text-4xl font-semibold text-center my-5">Feedback</h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full mx-auto justify-around items-center">
            <form
              className="px-16 pt-4 pb-1 mb-4 justify-center items-center"
              onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Select Your Response
                </label>
                <div className="card flex justify-content-center">
                  <div className="flex flex-wrap gap-3">
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="excellent"
                        name="excellent"
                        value="Excellent"
                        onChange={(e) => setFeedback(e.value)}
                        checked={feedback === "Excellent"}
                      />
                      <label htmlFor="excellent" className="ml-2">
                        Excellent
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="good"
                        name="good"
                        value="Good"
                        onChange={(e) => setFeedback(e.value)}
                        checked={feedback === "Good"}
                      />
                      <label htmlFor="good" className="ml-2">
                        Good
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="average"
                        name="pizza"
                        value="Average"
                        onChange={(e) => setFeedback(e.value)}
                        checked={feedback === "Average"}
                      />
                      <label htmlFor="average" className="ml-2">
                        Average
                      </label>
                    </div>
                    <div className="flex align-items-center">
                      <RadioButton
                        inputId="bad"
                        name="pizza"
                        value="Bad"
                        onChange={(e) => setFeedback(e.value)}
                        checked={feedback === "Bad"}
                      />
                      <label htmlFor="bad" className="ml-2">
                        Bad
                      </label>
                    </div>
                  </div>
                </div>
                {error.feedback && (
                  <span className="text-red-500 text-sm mt-2">
                    {error.feedback}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Give your feedback
                </label>
                <div className="card flex justify-content-center">
                  <Editor
                    value={message}
                    onTextChange={(e) => setMessage(e.htmlValue)}
                    style={{ height: "220px" }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-600 flex text-white items-center justify-center w-full font-bold py-2 px-4 text-lg rounded-lg focus:outline-none focus:shadow-outline border-2 border-blue-600 mb-5 hover:bg-white hover:text-black hover:border-2 hover:border-blue-600"
                  type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Feedback;
