const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  deleteUser,
} = require("../controllers/userControllers");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(isAuthenticatedUser, logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, getSingleUser)
  .delete(deleteUser);

module.exports = router;
