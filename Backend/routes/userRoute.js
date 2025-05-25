import express from "express"
import { getAllUsers, login, logout, signUp, updateProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").get(authMiddleware,logout);
router.route("/get-all-user").get(authMiddleware,getAllUsers);
router.route("/update-user-profile").put(authMiddleware,updateProfile);

export default router;