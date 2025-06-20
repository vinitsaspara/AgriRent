import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import { allAssignedEquipment, createAssignment, getHistoryByEquipment, getAssignedEquipmentUser, markAsReturned } from "../controllers/assignmentHistory.controller.js";

const router = express.Router();

router.route("/create-assignment/:id").post(authMiddleware, createAssignment);
router.route("/mark-returned/:assignmentId").get(authMiddleware, markAsReturned);
router.route("/assigned-equipment/:userId").get(authMiddleware, getAssignedEquipmentUser);
router.route("/history-equipment/:equipmentId").get(authMiddleware, getHistoryByEquipment);
router.route("/all-assigned-equipment").get(authMiddleware, allAssignedEquipment);

export default router;