import React, { useEffect, useState } from "react";
import "./Users.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthToken } from "../../utils/AuthToken";
import { BASE_URL } from "../../utils/BaseUrl";

const Users = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const config = AuthToken();

    const usersApi = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/admin/users`,
          config
        );
        setUsersData(data.users);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    usersApi();
  }, []);

  return (
    <div className="users_main">
      <div className="header_row">
        <h2>Name</h2>
        <h2>Email</h2>
      </div>
      {usersData.map((user, index) => (
        <div key={index} className="each_user_link_div">
          <Link className="each_user_link" to={`/user/${user._id}`}>
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Users;
