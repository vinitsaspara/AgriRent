import { AssignmentHistory } from "../models/assignment.model.js";
import { Equipment } from "../models/equipment.model.js";
import { User } from "../models/user.model.js";

// Assign equipment to user

export const createAssignment = async (req, res) => {
    try {
        // Get equipment id from req.params 
        const { id } = req.params;

        // Logged-in user who assigns the equipment
        const user = req.user;

        const { assignedTo, assignedBy } = req.body;



        // Validate required fields
        if (!assignedTo || !assignedBy) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }


        // Find assigned user by userId (case-insensitive)
        const assignedUser = await User.findOne({
            userId: { $regex: new RegExp(`^${assignedTo}$`, "i") },
        });

        if (!assignedUser) {
            return res.status(400).json({
                message: "Invalid assignedTo userId.",
                success: false,
            });
        }

        const existEquipment = await Equipment.findById(id);
        // console.log(existEquipment);


        if (!existEquipment) {
            return res.status(404).json({
                success: false,
                message: "Equipment not exist."
            })
        }

        if (user.role != "Farmer")
            existEquipment.status = "Assigned";
        else
            existEquipment.status = "Rented";

        // console.log("hello");
        await existEquipment.save();


        // Create new assignment record
        const newAssignment = await AssignmentHistory.create({
            equipment: id,
            assignedTo: assignedUser._id,
            assignedBy: user.id,
        });

        // Push assignment ID into Equipment's assignmentHistory
        await Equipment.findByIdAndUpdate(id, {
            $push: { assignmentHistory: newAssignment._id },
        });

        res.status(201).json({
            success: true,
            message: "Assignment recorded successfully",
            assignment: newAssignment,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create assignment", error });
    }
};

// Mark equipment as returned
export const markAsReturned = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        
        // console.log(req.body);
        const { assignedTo, assignedBy, equipmentId } = req.body;
        
        // console.log("Assignment ID:", assignmentId);
        // console.log("Equipment ID:", equipmentId);

        const assignedToUser = await User.find({ assignedTo });
        const assignedByUser = await User.find({ assignedBy });
        
        if (!assignedToUser || !assignedByUser) {
            return res.status(400).json({
                success: false,
                message: "user id can not find."
            })
        }

        const existEquipment = await Equipment.findById(equipmentId);

        if (!existEquipment) {
            return res.status(404).json({
                success: false,
                message: "Equipment not exist."
            })
        }

        existEquipment.status = "Available";

        await existEquipment.save();



        const updated = await AssignmentHistory.findByIdAndUpdate(
            { _id: assignmentId,equipment: equipmentId },
            { returnedAt: new Date() },
            { new: true }
        );


        if (!updated) {
            return res.status(404).json({ success: false, message: "Assignment not found" });
        }

        res.status(200).json({
            message: "Marked as returned",
            assignment: updated,
            success: true
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update return", error });
    }
};

// Get history for a specific user by userId (case-insensitive)
export const getHistoryByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by userId (case-insensitive)
        const user = await User.findOne({
            userId: { $regex: new RegExp(`^${userId}$`, "i") },
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const history = await AssignmentHistory.find({ assignedTo: user._id }).populate("equipment", "name category description rentPerHour status image").select("-__v -createdAt -updatedAt -assignedBy -assignedTo");



        res.status(200).json({ success: true, history });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching user history", error });
    }
};

// Get history for a specific equipment
export const getHistoryByEquipment = async (req, res) => {
    try {
        const { equipmentId } = req.params;

        const history = await AssignmentHistory.find({ equipment: equipmentId })
            .populate("assignedTo", "fullName role userId email address phoneNumber profilePicture")
            .populate("assignedBy", "fullName role userId email address phoneNumber profilePicture").select("-__v");

        res.status(200).json({ success: true, history });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching equipment history", error });
    }
};

export const allAssignedEquipment = async (req, res) => {
    try {
        const assignedEquipmentList = await AssignmentHistory.find();

        // console.log(assignedEquipmentList);


        return res.status(200).json({
            success: true,
            message: "All assigned equipment fetched successfully",
            assignedEquipmentList,
        });
    } catch (error) {
        console.error("Error fetching assigned equipment:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching assigned equipment",
            error: error.message,
        });
    }
}