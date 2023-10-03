import React, { useEffect, useState } from "react";
import "./AllPaymentsOfUser.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthToken } from "../../utils/AuthToken";
import { BASE_URL } from "../../utils/BaseUrl";

const AllPaymentsOfUser = () => {
  const [allPaymentsOfUser, setAllPaymentsOfUser] = useState([]);

  useEffect(() => {
    const config = AuthToken();

    const AllPaymentsOfUser = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/paymentroute/allpaymentsofuser`,
          config
        );
        setAllPaymentsOfUser(data.payments);
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    AllPaymentsOfUser();
  }, []);

  return (
    <div className="loans_main">
      <div className="header_row">
        <h2>Date</h2>
        <h2>Amount</h2>
      </div>
      {allPaymentsOfUser.map((payment, index) => (
        <div key={index} className="each_loan_link_div">
          <Link to={`/payment/${payment._id}`} className="each_loan_link">
            <h3>{payment.createdAt.split("T")[0]}</h3>
            <h3>{payment.paymentAmount}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllPaymentsOfUser;
