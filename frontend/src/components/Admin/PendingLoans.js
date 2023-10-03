import React, { useEffect, useState } from "react";
import "./PendingLoans.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthToken } from "../../utils/AuthToken";
import { BASE_URL } from "../../utils/BaseUrl";

const PendingLoans = () => {
  const navigate = useNavigate();

  const [pendingLoanData, setPedingLoanData] = useState([]);

  const config = AuthToken();

  const UpdateLoanStatusApi = async (inputData, id) => {
    try {
      config.headers = {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      };

      const { data } = await axios.put(
        `${BASE_URL}/api/v1/loanroute/admin/loan/${id}`,
        inputData,
        config
      );
      alert("Status Changed Successfully");
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleApprovedLoan = (id, e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("loanStatus", "Approved");

    UpdateLoanStatusApi(myForm, id);
  };
  const handleRejectedLoan = (id, e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("loanStatus", "Rejected");

    UpdateLoanStatusApi(myForm, id);
  };

  useEffect(() => {
    const LoansApi = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:7532/api/v1/loanroute/admin/loans`,
          config
        );
        const { loans } = data;
        const pedingLoans = loans.filter(
          (loans) => loans.loanStatus === "Pending"
        );

        setPedingLoanData(pedingLoans);
        navigate("/pendingloans");
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    LoansApi();
  }, []);

  return (
    <div className="pendingloans_main">
      <div className="pendingloans_header_row">
        <h2>Loan Amount</h2>
        <h2>Accept/Reject</h2>
      </div>
      {pendingLoanData.length !== 0 ? (
        pendingLoanData.map((loan, index) => (
          <>
            <div key={index} className="pendingloans_each_loan_link_div">
              <div className="pendingloans_each_loan_link">
                <Link to={`/loan/${loan._id}`}>
                  <h3>{loan.loanAmount}</h3>
                </Link>
                <div>
                  <button
                    className="accept_button"
                    onClick={(e) => handleApprovedLoan(loan._id, e)}
                  >
                    Approve
                  </button>

                  <button
                    className="reject_button"
                    onClick={(e) => handleRejectedLoan(loan._id, e)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <h1 className="no_pending_loans">No Pending Loans</h1>
      )}
    </div>
  );
};

export default PendingLoans;
