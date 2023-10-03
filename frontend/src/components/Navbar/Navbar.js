import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");

  const LogoutUser = async () => {
    try {
      Cookies.remove("authToken");
      localStorage.setItem("userRole", "user");
      alert("Logged Out Successfully");
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");

    if (isConfirmed) {
      LogoutUser();
    }
  };

  useEffect(() => {
    const authToken = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("authToken="))
      ?.split("=")[1];

    if (authToken) {
      setIsLoggedIn(true);
    }
    setUserRole(localStorage.getItem("userRole"));
  }, []);

  return (
    <div className="navbar_main">
      <NavLink className="navlink company_and_role" to="/">
        <h1>Techdome</h1>
        <h3>{userRole}</h3>
      </NavLink>
      <div className="navline_otherthan_company">
        {isLoggedIn && (
          <>
            {userRole === "user" && (
              <>
                <NavLink className="navlink" to="/loanapply">
                  Loan Apply
                </NavLink>
                <NavLink className="navlink" to="/dopayment">
                  Do Payment
                </NavLink>
                <NavLink className="navlink" to="/userloans">
                  User Loans
                </NavLink>
                <NavLink className="navlink" to="/allpaymentsofuser">
                  All Payments Of User
                </NavLink>
              </>
            )}

            {userRole === "admin" && (
              <>
                <NavLink className="navlink" to="/pendingloans">
                  Pending Loans*
                </NavLink>
                <NavLink className="navlink" to="/payments">
                  Payments*
                </NavLink>
                <NavLink className="navlink" to="/loans">
                  Loans*
                </NavLink>
                <NavLink className="navlink" to="/users">
                  Users*
                </NavLink>
              </>
            )}
          </>
        )}

        <NavLink className="navlink" to="/signup">
          Singup
        </NavLink>
        <NavLink className="navlink" to="/signin">
          Login
        </NavLink>
        {isLoggedIn && (
          <Link className="navlink" to="/logout" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
