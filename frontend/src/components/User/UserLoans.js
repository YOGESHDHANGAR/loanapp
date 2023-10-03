import React, { useEffect, useState } from "react";
import "./UserLoans.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthToken } from "../../utils/AuthToken";
import { BASE_URL } from "../../utils/BaseUrl";

function getStatusColor(loanStatus) {
  console.log(loanStatus);
  switch (loanStatus) {
    case "Approved":
      return "green";
    case "Rejected":
      return "red";
    case "Pending":
      return "orange";
    default:
      return "black";
  }
}

const UserLoans = () => {
  const [allLoansOfUser, setAllLoansOfUser] = useState([]);

  useEffect(() => {
    const config = AuthToken();
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
    };

    const GetAllLoansOfUserApi = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/loanroute/getallloansofuser`,
          config
        );
        setAllLoansOfUser(data.allloansofuser);
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    GetAllLoansOfUserApi();
  }, []);

  return (
    <div className="user_loans_main">
      <div className="header_row">
        <h2>Date</h2>
        <h2>Amount</h2>
      </div>
      {allLoansOfUser.map((loan, index) => (
        <div key={index} className="each_loan_link_div">
          <Link
            to={`/loan/${loan._id}`}
            style={{ color: getStatusColor(loan.loanStatus) }}
            className="each_loan_link"
          >
            <h3>{loan.createdAt.split("T")[0]}</h3>
            <h3>{loan.loanAmount}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserLoans;
