import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";
import Header from "../Header";
import Footer from "../Footer";
import ReactPaginate from "react-paginate";
import config from "../../config";

const stripePromise = loadStripe("pk_test_51OyfljGQ4hnFke5naCUJhUXTjEGCsmodhEk3qhAlJefkmKc5AoIw3bLBePR7K7rKHFdE32RwQpp5zyj5x7ZgIBEa00qzSZxqj2");

function Viewassignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [clientSecret, setClientSecret] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
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

  const handlePayment = async (assignmentId, price) => {
    try {
      const response = await axios.post(
        `${config.baseURL}create-intent`,
        { amount: price * 100 }, // Amount in cents
        { headers: { Authorization: token } }
      );

      setClientSecret(response.data.clientSecret);
      setSelectedAssignment(assignmentId);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    }
  };

  const handlePaymentSuccess = useCallback(async () => {
    if (!selectedAssignment || !clientSecret) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${config.baseURL}verify-intent`,
        { clientSecret, assignmentId: selectedAssignment },
        { headers: { Authorization: token } }
      );

      if (response.data.success) {
        toast.success("Payment succeeded and assignment status updated!");
        setClientSecret("");
        setSelectedAssignment(null);
        fetchAssignments(currentPage); // Refresh assignments
      } else {
        toast.error("Payment succeeded, but failed to update assignment status.");
      }
    } catch (error) {
      console.error("Error updating assignment status:", error);
      toast.error("Payment succeeded, but failed to update assignment status.");
    }
  }, [selectedAssignment, clientSecret, fetchAssignments, currentPage]);

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
              <th className="py-2 px-4 border border-gray-300">Start Date</th>
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
                  {formatDate(assignment.StartDate)}
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
                      {assignment.isPaid === "false" ? (
                        <>
                          {!clientSecret || selectedAssignment !== assignment._id ? (
                            <button
                              onClick={() => handlePayment(assignment._id, assignment.price)}
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mx-1"
                            >
                              Pay Now
                            </button>
                          ) : (
                            <Elements options={{ clientSecret }} stripe={stripePromise}>
                              <CheckoutForm
                                clientSecret={clientSecret}
                                assignmentId={assignment._id}
                                onPaymentSuccess={handlePaymentSuccess}
                              />
                            </Elements>
                          )}
                        </>
                      ) : (
                        <>
                          <a
                            href={`${config.baseURL}uploads/${assignment.uploadedFiles}`}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mx-1"
                          >
                            Download
                          </a>
                          <Link
                            to={`/feedback?a=${assignment._id}`}
                            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 mx-1"
                          >
                            Provide Feedback
                          </Link>
                        </>
                      )}
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
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

function CheckoutForm({ clientSecret, assignmentId, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentSuccess = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${config.baseURL}update-assignment-status`,
        { clientSecret, assignmentId },
        { headers: { Authorization: token } }
      );
      console.log("++++>",response.data);
      if (response.data.success) {
        setMessage("Payment succeeded and assignment status updated!");
        onPaymentSuccess();
      } else {
        setMessage("Payment succeeded, but failed to update assignment status.");
      }
    } catch (error) {
      console.error("Error updating assignment status:", error);
      setMessage("Payment succeeded, but failed to update assignment status.");
    }
  }, [assignmentId, clientSecret, onPaymentSuccess]);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }

    const retrievePaymentIntent = async () => {
      try {
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            await handlePaymentSuccess();
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      } catch (error) {
        console.error("Error retrieving payment intent:", error);
        setMessage("Error processing payment.");
      }
    };

    retrievePaymentIntent();
  }, [stripe, clientSecret, handlePaymentSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${config.baseURL}update-assignment-status/${assignmentId}`, // Update this to avoid redirection
      },
    });

    if (error) {
      setMessage(error.message);
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default Viewassignments;
