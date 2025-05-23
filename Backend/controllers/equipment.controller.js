import { Equipment } from '../models/equipment.model.js'; // ensure correct import

export const addEquipment = async (req, res) => {
    try {
        const {
            name,
            type,
            serialNumber,
            description,
            rentPerHour,
            state,
            district,
            taluka,
            currentAssignedTo,
            assignedRole,
            availabilityStatus,
            quantity,
            image
        } = req.body;

        // Check all required fields
        if (
            !name ||
            !quantity ||
            !type ||
            !serialNumber ||
            !description ||
            !rentPerHour ||
            !state ||
            !district ||
            !taluka ||
            !currentAssignedTo ||
            !assignedRole ||
            !availabilityStatus
        ) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        // ✅ FIX: Await the database call
        const existEquipment = await Equipment.findOne({ serialNumber });

        if (existEquipment) {
            return res.status(400).json({
                message: "Equipment already exists.",
                success: false,
            });
        }

        const newEquipment = new Equipment({
            name,
            type,
            serialNumber,
            description,
            rentPerHour,
            state,
            district,
            taluka,
            currentAssignedTo,
            assignedRole,
            availabilityStatus,
            image,
            quantity,
        });

        await newEquipment.save();

        return res.status(201).json({
            success: true,
            message: "Equipment added successfully",
            data: newEquipment,
        });
    } catch (error) {
        console.error("Error adding equipment:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while adding equipment",
            error: error.message,
        });
    }
};


export const updateEquipment = async (req, res) => {
    try {
        const { id } = req.params; // Equipment ID from route
        const updates = req.body;

        // Define allowed fields to update
        const allowedFields = [
            "description",
            "rentPerHour",
            "availabilityStatus",
            "state",
            "district",
            "taluka",
            "currentAssignedTo",
            "assignedRole",
            "image"
        ];

        // Filter updates to allow only permitted fields
        const filteredUpdates = {};
        for (let key of allowedFields) {
            if (updates[key] !== undefined) {
                filteredUpdates[key] = updates[key];
            }
        }

        const updatedEquipment = await Equipment.findByIdAndUpdate(
            id,
            { $set: filteredUpdates },
            { new: true, runValidators: true }
        );

        if (!updatedEquipment) {
            return res.status(404).json({
                success: false,
                message: "Equipment not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Equipment updated successfully",
            data: updatedEquipment,
        });

    } catch (error) {
        console.error("Error updating equipment:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while updating equipment",
            error: error.message,
        });
    }
};



export const deleteEquipment = async (req, res) => {
    try {
        const { id } = req.params; // Equipment ID from URL

        const deletedEquipment = await Equipment.findByIdAndDelete(id);

        if (!deletedEquipment) {
            return res.status(404).json({
                success: false,
                message: "Equipment not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Equipment deleted successfully",
            data: deletedEquipment,
        });

    } catch (error) {
        console.error("Error deleting equipment:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while deleting equipment",
            error: error.message,
        });
    }
};

export const getAllEquipment = async (req, res) => {
    try {
        const equipmentList = await Equipment.find().populate('currentAssignedTo', 'name role');

        return res.status(200).json({
            success: true,
            message: "All equipment fetched successfully",
            data: equipmentList,
        });

    } catch (error) {
        console.error("Error fetching equipment:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching equipment",
            error: error.message,
        });
    }
};