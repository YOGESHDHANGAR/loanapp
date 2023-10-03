import React, { useEffect, useState } from "react";
import "./DoPayment.css";
import axios from "axios";
import { AuthToken } from "../../utils/AuthToken";
import { BASE_URL } from "../../utils/BaseUrl";

const DoPayment = () => {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [loanIdSelectedForPayment, setLoanIdSelectedForPayment] = useState("");
  const [allLoansOfUser, setAllLoansOfUser] = useState([]);

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

      setAllLoansOfUser(
        data.allloansofuser.filter((loans) => loans.loanStatus === "Approved")
      );
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const CreatePaymentLoanApi = async (inputData) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/paymentroute/create/${loanIdSelectedForPayment}`,
        inputData,
        config
      );

      alert("Payment successfull");

      setPaymentAmount(0);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("paymentAmount", paymentAmount);

    if (paymentAmount <= 0) {
      alert("Invalid payment amount");
      return;
    }

    if (loanIdSelectedForPayment === "") {
      alert("Select loan for payment");
      return;
    }

    CreatePaymentLoanApi(myForm);
  };

  useEffect(() => {
    GetAllLoansOfUserApi();
  }, []);

  return (
    <div className="dopayment_main">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Select for loan:
          <select
            className="input"
            name="selectedloanforpayment"
            onChange={(e) => setLoanIdSelectedForPayment(e.target.value)}
          >
            <option>Select</option>
            {allLoansOfUser.map((elem, index) => (
              <option className="option" key={index} value={elem._id}>
                <p>Loan: {elem.loanAmount}</p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p>
                  Emi:
                  {elem && elem.loanEmi && elem.loanEmi.toFixed(2)}
                </p>
              </option>
            ))}
          </select>
        </label>
        <label className="lable">
          Enter Payment Amount:
          <input
            className="input"
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
        </label>
        <input className="submitButton" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default DoPayment;
