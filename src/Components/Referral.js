import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";
import ReactPaginate from "react-paginate";

function Referral() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const referralsPerPage = 10;
  const token = localStorage.getItem("authToken");

  const fetchReferrals = useCallback(async (page) => {
    try {
      const response = await axios.get(
        `${config.baseURL}RefferalHistory?page=${page}&limit=${referralsPerPage}`,
        { headers: { Authorization: token } }
      );
      if (response.status === 200) {
        const { referrals, totalPages } = response.data;
        setReferrals(referrals);
        setTotalPages(totalPages);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Failed to load referrals");
      } else {
        toast.error("Something went wrong, try again!");
      }
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [referralsPerPage, token]);

  useEffect(() => {
    fetchReferrals(currentPage);
  }, [currentPage, fetchReferrals]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  const renderReferrals = () => {
    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    if (referrals.length === 0) {
      return <div>No referral history found.</div>;
    }

    return (
      <div className="mt-16 overflow-x-auto mx-20">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">Referral Name</th>
              <th className="py-2 px-4 border border-gray-300">Accepted By</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border border-gray-300">
                  {referral.LoggedUser}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {referral.AcceptedHistory}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto my-10 relative">
        <h1 className="text-4xl font-semibold text-center my-5">Referral History</h1>
        {renderReferrals()}
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

export default Referral;
