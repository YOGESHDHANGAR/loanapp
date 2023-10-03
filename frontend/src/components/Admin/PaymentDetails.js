import React, { useEffect, useState } from "react";
import "./PaymentDetails.css";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthToken } from "../../utils/AuthToken";
import { BASE_URL } from "../../utils/BaseUrl";

const PaymentDetail = () => {
  const location = useLocation();
  const [paymentDetailsData, setPaymentDetailsData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const config = AuthToken();

    const paymentsDetailsApi = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/paymentroute/admin/payment/${id}`,
          config
        );
        setPaymentDetailsData(data.payment);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    paymentsDetailsApi();
  }, []);

  return (
    <div className="paymentdetails_main">
      <p>
        <b>Payment Amount:</b> {paymentDetailsData.paymentAmount}
      </p>
      <p>
        <b>Loan:</b>
        <Link to={`/loan/${paymentDetailsData.loan}`}>
          {paymentDetailsData.loan}
        </Link>
      </p>
      <p>
        <b>User:</b>
        <Link to={`/user/${paymentDetailsData.user}`}>
          {paymentDetailsData.user}
        </Link>
      </p>
    </div>
  );
};

export default PaymentDetail;
