import React, { useEffect, useState } from "react";
import "./LoanDetails.css";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthToken } from "../../utils/AuthToken";
import { BASE_URL } from "../../utils/BaseUrl";
import { calculateEMIDatesWithExtraPayments } from "../../utils/LoanCalculation";

function getStatusColor(loanStatus) {
  switch (loanStatus) {
    case "Approved":
      return "green";
    case "Rejected":
      return "red";
    case "Pending":
      return "orange";
    default:
      return "black"; // Default color if status is not recognized
  }
}

const LoanDetail = () => {
  const location = useLocation();
  const [loanDetailsData, setLoanDetailsData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const config = AuthToken();

    const LoansDetailsApi = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/loanroute/admin/loan/${id}`,
          config
        );
        setLoanDetailsData(data.loan);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    LoansDetailsApi();
  }, []);

  return (
    <div className="loandetails_main">
      <div className="loandetails_div">
        <p>
          <b>Loan Type:</b> {loanDetailsData.loanType}
        </p>
        <p>
          <b>Loan Amount:</b> {loanDetailsData.loanAmount}
        </p>
        <p>
          <b>Loan Emi:</b>
          {loanDetailsData &&
            loanDetailsData.loanEmi &&
            loanDetailsData.loanEmi.toFixed(2)}
        </p>
        <p>
          <b>Loan Interest:</b> {loanDetailsData.loanInterest}
        </p>
        <p>
          <b>Loan Start Date:</b>{" "}
          {loanDetailsData &&
            loanDetailsData.loanStartDate &&
            loanDetailsData.loanStartDate.split("T")[0]}
        </p>
        <p>
          <b>Loan Status:</b>{" "}
          <span style={{ color: getStatusColor(loanDetailsData.loanStatus) }}>
            {loanDetailsData.loanStatus}
          </span>
        </p>

        <p>
          <b>Loan Repaid:</b>{" "}
          {loanDetailsData &&
            loanDetailsData.loanRepaid &&
            loanDetailsData.loanRepaid.toFixed(2)}
        </p>
        <p>
          <b>User:</b>
          <Link to={`/user/${loanDetailsData.user}`}>
            {loanDetailsData.user}
          </Link>
        </p>
        <p>
          <b>Loan Term:</b> {loanDetailsData.loanTerm}
        </p>
        <p>
          <b>Created At:</b> {loanDetailsData.createdAt}
        </p>
        <p>
          <b>Loan End Date:</b>
          {loanDetailsData &&
            loanDetailsData.loanEndDate &&
            loanDetailsData.loanEndDate.split("T")[0]}
        </p>
      </div>

      <div className="scheduled_payments">
        <div className="scheduled_payments_header">
          <h3>S No.</h3>
          <h3>Date</h3>
          <h3>Emi Scheduled</h3>
          <h3>Status</h3>
        </div>
        <div className="scheduled_payments_content">
          {loanDetailsData.loanStatus === "Approved" ? (
            calculateEMIDatesWithExtraPayments(
              loanDetailsData.loanAmount,
              loanDetailsData.loanTerm,
              loanDetailsData.loanStartDate,
              loanDetailsData.loanRepaid,
              loanDetailsData.loanStatus === "Paid" ? true : false
            ).emiDetails.map((elem, index) => (
              <div key={index} className="emi_details">
                <p>{index + 1}</p>
                <p>{elem.date}</p>
                <p>{elem && elem.amount && elem.amount.toFixed(2)}</p>
                <p
                  style={{
                    color: elem.status === "Pending" ? "orange" : "green",
                  }}
                >
                  {elem.status}
                </p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanDetail;
