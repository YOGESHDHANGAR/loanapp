import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BASE_URL } from "../../utils/BaseUrl";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const SignUpApi = async (inputData) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/register`,
        inputData,
        config
      );

      Cookies.set("authToken", data.authToken);
      localStorage.setItem("userRole", data.user.role);

      alert("User created sucessfully");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);

    if (password !== confirmPassword) {
      window.alert("Password and Confirm Password does not match");
      return;
    }

    SignUpApi(myForm);
  };

  return (
    <div className="loginsignup_main">
      <form className="form" onSubmit={handleSubmit}>
        <label className="lable">
          Name:
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
        <label className="lable">
          Confirm Password:
          <input
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <input className="submitButton" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SignUp;
