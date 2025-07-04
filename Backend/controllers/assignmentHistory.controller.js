import mongoose from "mongoose";
import { AssignmentHistory } from "../models/assignment.model.js";
import { Equipment } from "../models/equipment.model.js";
import { User } from "../models/user.model.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET);
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

        // 1. Add equipment to assigned user's AssignedEquipment array
        await User.findByIdAndUpdate(assignedUser._id, {
            $addToSet: {
                AssignedEquipment: id
            }
        });

        // 2. Remove equipment from assigner's AssignedEquipment array (if it exists)
        await User.findByIdAndUpdate(user._id, {
            $pull: {
                AssignedEquipment: id
            }
        });

        const updatedUser = await User.findById(user._id).populate("AssignedEquipment");

        res.status(201).json({
            success: true,
            message: "Assignment recorded successfully",
            assignment: newAssignment,
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create assignment", error });
    }
};

// Mark equipment as returned
export const markAsReturned = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const user = req.user;

        const assignment = await AssignmentHistory.findById(assignmentId);

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: "Assignment not found.",
            });
        }

        // Destructure necessary fields from the assignment
        const { assignedTo, assignedBy, equipment } = assignment;

        // 1. Mark return in assignment history
        const updated = await AssignmentHistory.findOneAndUpdate(
            { _id: assignmentId },
            { returnedAt: new Date() },
            { new: true }
        );

        // 2. Remove equipment from assignedTo user's AssignedEquipment
        await User.findByIdAndUpdate(assignedTo, {
            $pull: {
                AssignedEquipment: equipment,
            },
        });

        // 3. Add equipment back to assignedBy user's AssignedEquipment
        await User.findByIdAndUpdate(assignedBy, {
            $addToSet: {
                AssignedEquipment: equipment,
            },
        });

        const updatedUser = await User.findById(user._id).populate("AssignedEquipment");

        res.status(200).json({
            success: true,
            message: "Marked as returned",
            assignment: updated,
            user: updatedUser,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update return",
            error,
        });
    }
};



// Get history for a specific user by userId (case-insensitive)
export const getAssignedEquipmentUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // console.log(userId);

        // Find the user by userId (case-insensitive)
        const user = await User.findOne({
            userId: { $regex: new RegExp(`^${userId}$`, "i") },
        }).populate("AssignedEquipment");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }


        res.status(200).json({ success: true, assignedEquipment: user.AssignedEquipment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching user history", error });
    }
};

// Get history for a specific equipment
export const getHistoryByEquipment = async (req, res) => {
    try {
        const { equipmentId } = req.params;

        const history = await AssignmentHistory.find({ equipment: equipmentId })
            .populate("equipment")
            .populate("assignedTo", "fullName role userId email address phoneNumber profilePicture")
            .populate("assignedBy", "fullName role userId email address phoneNumber profilePicture").select("-__v");

        res.status(200).json({ success: true, history });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching equipment history", error });
    }
};

export const allAssignedEquipment = async (req, res) => {
    try {
        const assignedEquipmentList = await AssignmentHistory.find()
            .populate("assignedBy", "fullName role userId") // _id is always included by default
            .populate("assignedTo", "fullName role userId") // optional if needed
            .populate("equipment", "name rentPerHour");          // only show equipment name


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



export const completePayment = async (req, res) => {
    try {
        const { assignmentIds } = req.body;

        const objectIds = assignmentIds.map(id => new mongoose.Types.ObjectId(id));

        const matchedAssignments = await AssignmentHistory.find({
            _id: { $in: objectIds },
        })
            .populate({
                path: "equipment",
                select: "name rentPerHour",
            })
            .select("-assignedTo -assignedBy");

        // Check for missing equipment data
        for (const item of matchedAssignments) {
            if (!item.equipment || typeof item.equipment.rentPerHour !== "number") {
                return res.status(400).json({
                    success: false,
                    message: `Missing rentPerHour for assignment ${item._id}`,
                });
            }
        }

        const lineItems = matchedAssignments.map((item) => {
            const start = new Date(item.assignedAt);
            const end = item.returnedAt ? new Date(item.returnedAt) : new Date();

            const hoursUsed = (end - start) / (1000 * 60 * 60); // float hours
            const totalAmountInPaise = Math.round(hoursUsed * item.equipment.rentPerHour * 100);

            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: `${item.equipment.name} (${hoursUsed.toFixed(2)} hrs)`,
                    },
                    unit_amount: totalAmountInPaise,
                },
                quantity: 1,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/payment/success",
            cancel_url: "http://localhost:5173/payment/cancel",
        });

        return res.status(200).json({
            message: "Payment session created",
            id: session.id,
            success: true,
        });
    } catch (error) {
        console.error("Stripe Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};



export const markCompletePayment = async (req, res) => {
    try {
        const { assignmentIds } = req.body;

        // ✅ Convert string IDs to ObjectIds
        const objectIds = assignmentIds.map((id) => new mongoose.Types.ObjectId(id));

        // ✅ Mark payment as true
        await AssignmentHistory.updateMany(
            { _id: { $in: objectIds } },
            { $set: { payment: true } }
        );

        return res.status(200).json({
            message: "Payment marked as complete",
            success: true,
        });

    } catch (error) {
        console.error("markCompletePayment error:", error);
        return res.status(500).json({
            message: "Something went wrong while updating payment status",
            success: false,
        });
    }
};


