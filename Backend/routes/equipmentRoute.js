import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js";
import { addEquipment, deleteEquipment, getAllEquipment, updateEquipment } from "../controllers/equipment.controller.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";


const router = express.Router();

router.route("/add-equipment").post(authMiddleware, adminMiddleware, addEquipment);
router.route("/update-equipment/:id").post(authMiddleware, adminMiddleware, updateEquipment);
router.route("/delete-equipment/:id").delete(authMiddleware, adminMiddleware, deleteEquipment);
router.route("/get-all-equipment").get(authMiddleware, getAllEquipment);

export default router;