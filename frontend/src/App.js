import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/User/SignUp";
import SignIn from "./components/User/SignIn";
import Payments from "./components/Admin/Payments";
import Loans from "./components/Admin/Loans";
import Users from "./components/Admin/Users";
import LoanDetails from "./components/Admin/LoanDetails";
import UserDetails from "./components/Admin/UserDetails";
import PaymentDetails from "./components/Admin/PaymentDetails";
import LoanApply from "./components/User/LoanApply";
import DoPayment from "./components/User/DoPayment";
import UserLoans from "./components/User/UserLoans";
import PendingLoans from "./components/Admin/PendingLoans";
import AllPaymentsOfUser from "./components/User/AllPaymentsOfUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/payments" element={<Payments />} />
          <Route exact path="/payment/:id" element={<PaymentDetails />} />
          <Route exact path="/loans" element={<Loans />} />
          <Route exact path="/loan/:id" element={<LoanDetails />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/user/:id" element={<UserDetails />} />
          <Route exact path="/loanapply" element={<LoanApply />} />
          <Route exact path="/dopayment" element={<DoPayment />} />
          <Route exact path="/userloans" element={<UserLoans />} />
          <Route exact path="/pendingloans" element={<PendingLoans />} />
          <Route
            exact
            path="/allpaymentsofuser"
            element={<AllPaymentsOfUser />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
