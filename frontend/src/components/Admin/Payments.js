import React, { useEffect, useState } from "react";
import "./Payments.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthToken } from "../../utils/AuthToken";
import { BASE_URL } from "../../utils/BaseUrl";

const Payments = () => {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const config = AuthToken();

    const paymentsApi = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/paymentroute/admin/payments`,
          config
        );
        setPaymentData(data.payments);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    paymentsApi();
  }, []);

  return (
    <div className="payments_main">
      <div className="header_row">
        <h2>Date</h2>
        <h2>Amount</h2>
      </div>
      {paymentData.map((payment, index) => (
        <div key={index} className="each_payment_link_div">
          <Link to={`/payment/${payment._id}`} className="each_payment_link">
            <h3>{payment.createdAt.split("T")[0]}</h3>
            <h3>{payment.paymentAmount}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Payments;
