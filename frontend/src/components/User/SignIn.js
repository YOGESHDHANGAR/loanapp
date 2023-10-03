import React, { useState } from "react";
import "./SignIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BASE_URL } from "../../utils/BaseUrl";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignInApi = async (inputData) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/login`,
        inputData,
        config
      );

      Cookies.set("authToken", data.authToken);
      localStorage.setItem("userRole", data.user.role);

      alert("Login successful");

      setEmail("");
      setPassword("");
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    myForm.set("password", password);

    SignInApi(myForm);
  };

  return (
    <div className="loginsignin_main">
      <form className="form" onSubmit={handleSubmit}>
        <label className="lable">
          Email:
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="lable">
          Password:
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input className="submitButton" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignIn;
