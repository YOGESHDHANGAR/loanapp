const express = require("express");

const { authorizeRoles, isAuthenticatedUser } = require("../middlewares/auth");
const {
  createPayment,
  getAllPaymentsOfLoan,
  getSinglePayment,
  getAllPayments,
  getAllPaymentsOfUser,
} = require("../controllers/paymentControllers");

const router = express.Router();

router.route("/create/:id").post(isAuthenticatedUser, createPayment); //here id is of loan

router
  .route("/allpaymentsofloan/:id")
  .get(isAuthenticatedUser, getAllPaymentsOfLoan); //here id is of loan

router
  .route("/allpaymentsofuser")
  .get(isAuthenticatedUser, getAllPaymentsOfUser); //here id is of user

router.route("/singlepayment/:id").get(isAuthenticatedUser, getSinglePayment); //here id is of payment

router
  .route("/admin/payments")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllPayments);

router.route("/admin/payment/:id").get(isAuthenticatedUser, getSinglePayment); //here id is of payment

module.exports = router;
