import express from "express";
import {
  deleteMyProfile,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  myProfile,
  resetPassword,
  updatePassword,
  updateProfile,
  userFollow,
  userLogin,
  userLogOut,
  userRegister,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogOut);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/forgot/password").post(forgotPassword);
router.route("/reset/password/:token").put(resetPassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/user/:id").post(isAuthenticated, userFollow);
router.route("/singleuser/:id").get(isAuthenticated, getSingleUser);
router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);

export default router;
