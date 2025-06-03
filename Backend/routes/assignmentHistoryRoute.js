import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import { allAssignedEquipment, createAssignment, getHistoryByEquipment, getHistoryByUser, markAsReturned } from "../controllers/assignmentHistory.controller.js";

const router = express.Router();

router.route("/create-assignment/:id").post(authMiddleware,createAssignment);
router.route("/mark-returned/:assignmentId").post(authMiddleware,markAsReturned);
router.route("/history-user/:userId").get(authMiddleware,getHistoryByUser);
router.route("/history-equipment/:equipmentId").get(authMiddleware,getHistoryByEquipment);
router.route("/all-assigned-equipment").get(authMiddleware,allAssignedEquipment);

export default router;