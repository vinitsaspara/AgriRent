import express from "express"
import { deleteMember, getAllUsers, login, logout, signUp, updateMember, updateProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").get(authMiddleware,logout);
router.route("/get-all-user").get(authMiddleware,getAllUsers);
router.route("/update-member/:id").put(authMiddleware,updateMember);
router.route("/delete-member/:id").delete(authMiddleware, deleteMember);
router.route("/update-user-profile").put(authMiddleware,singleUpload,updateProfile);

export default router;