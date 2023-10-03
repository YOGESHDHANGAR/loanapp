const express = require("express");
const { authorizeRoles, isAuthenticatedUser } = require("../middlewares/auth");
const {
  registerLoan,
  getLoanDetails,
  getAllLoans,
  getSingleLoan,
  updateSingleLoan,
  deleteLoan,
  getAllLoansOfUser,
} = require("../controllers/loanControllers");

const router = express.Router();

router.route("/register").post(isAuthenticatedUser, registerLoan);

router.route("/getallloansofuser").get(isAuthenticatedUser, getAllLoansOfUser);

router.route("/getloandetails").get(isAuthenticatedUser, getLoanDetails);

router
  .route("/admin/loans")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllLoans);

router
  .route("/admin/loan/:id")
  .get(isAuthenticatedUser, getSingleLoan)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateSingleLoan)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteLoan);

module.exports = router;
