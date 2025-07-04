import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import { allAssignedEquipment, createAssignment, getHistoryByEquipment, getAssignedEquipmentUser, markAsReturned, completePayment, markCompletePayment } from "../controllers/assignmentHistory.controller.js";

const router = express.Router();

router.route("/create-assignment/:id").post(authMiddleware, createAssignment);
router.route("/mark-returned/:assignmentId").get(authMiddleware, markAsReturned);
router.route("/assigned-equipment/:userId").get(authMiddleware, getAssignedEquipmentUser);
router.route("/history-equipment/:equipmentId").get(authMiddleware, getHistoryByEquipment);
router.route("/all-assigned-equipment").get(authMiddleware, allAssignedEquipment);
router.route("/complete-payment").post(completePayment);
router.route("/mark-payment-completed").patch(markCompletePayment);

export default router;