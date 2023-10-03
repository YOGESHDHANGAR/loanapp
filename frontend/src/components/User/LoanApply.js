import React, { useState } from "react";
import "./LoanApply.css";
import axios from "axios";
import { AuthToken } from "../../utils/AuthToken";
import { BASE_URL } from "../../utils/BaseUrl";

const LoanApply = () => {
  const [loanType, setLoanType] = useState("Personal");
  const [requiredLoanAmount, setRequiredLoanAmount] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);

  const RegisterLoanApi = async (inputData) => {
    try {
      const config = AuthToken();

      config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/loanroute/register`,
        inputData,
        config
      );

      alert("Applied for loan successfully");

      setRequiredLoanAmount(0);
      setLoanTerm(0);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("loanType", loanType);
    myForm.set("loanAmount", requiredLoanAmount);
    myForm.set("loanTerm", loanTerm);

    if (requiredLoanAmount <= 0 || loanTerm <= 0) {
      alert("Invalid loan term or amount");
      return;
    }

    RegisterLoanApi(myForm);
  };

  return (
    <div className="loanapply_main">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Select Type of Loan:
          <select
            className="input"
            name="loanType"
            onChange={(e) => setLoanType(e.target.value)}
          >
            <option value={"Peronal"}>Personal</option>
            <option value={"Business"}>Business</option>
            <option value={"Car"}>Car</option>
            <option value={"Home"}>Home</option>
          </select>
        </label>
        <label className="lable">
          Required Loan Amount:
          <input
            className="input"
            type="number"
            value={requiredLoanAmount}
            onChange={(e) => setRequiredLoanAmount(e.target.value)}
          />
        </label>
        <label className="lable">
          Loan Term:
          <input
            className="input"
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </label>
        <input className="submitButton" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LoanApply;
