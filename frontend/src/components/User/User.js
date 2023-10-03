import React, { useEffect, useState } from "react";
import "./User.css";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthToken } from "../../utils/AuthToken";
import { BASE_URL } from "../../utils/BaseUrl";

const User = () => {
  const location = useLocation();
  const [userDetailsData, setUserDetailsData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const config = AuthToken();

    const usersDetailsApi = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/me`, config);
        setUserDetailsData(data.user);
      } catch (error) {
        alert(error.response.data);
      }
    };
    usersDetailsApi();
  }, []);

  return (
    <div className="userdetails_main">
      <p>
        <b>Name:</b> {userDetailsData.name}
      </p>
      <p>
        <b>Email:</b> {userDetailsData.email}
      </p>
      <p>
        <b>Created At :</b> {userDetailsData.createdAt}
      </p>
    </div>
  );
};

export default User;
