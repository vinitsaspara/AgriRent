import cloudinary from '../config/cloudinary.js';
import getDataUri from '../config/getDataUri.js';
import { Equipment } from '../models/equipment.model.js'; // ensure correct import
import { User } from '../models/user.model.js';

export const addEquipment = async (req, res) => {
  try {
    const {
      name,
      serialNumber,
      descriptionEnglish,
      descriptionGujarati,
      rentPerHour,
      status,
      category,
    } = req.body;

    const file = req.file;
    const user = req.user; // Get the logged-in user


    // Check all required fields
    if (
      !name ||
      !category ||
      !serialNumber ||
      !descriptionGujarati ||
      !descriptionEnglish ||
      !rentPerHour ||
      !status
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    let cloudResponse;
    // If a file is provided, upload it to Cloudinary
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    }
    const imageUri = cloudResponse?.secure_url || ""; // Use the secure URL from Cloudinary response

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
      serialNumber,
      descriptionEnglish,
      descriptionGujarati,
      rentPerHour,
      category,
      image: imageUri,
      status
    });

    await newEquipment.save();

    await User.findByIdAndUpdate(
      user._id, // Use the logged-in user's ID
      {
        $push: { AssignedEquipment: newEquipment._id },
      },
      { new: true }
    );

    const updatedUser = await User.findById(user._id).populate("AssignedEquipment");

    return res.status(201).json({
      success: true,
      message: "Equipment added successfully",
      data: newEquipment,
      user: updatedUser,
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
    const { id } = req.params;
    const {
      descriptionGujarati,
      descriptionEnglish,
      rentPerHour,
      status,
    } = req.body;

    const file = req.file;

    if (
      !descriptionGujarati ||
      !descriptionEnglish ||
      !rentPerHour ||
      !status
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const equipment = await Equipment.findById(id); // ✅ FIXED: use await
    if (!equipment) {
      return res.status(404).json({
        message: "Equipment does not exist.",
        success: false,
      });
    }

    let imageUri = equipment.image;

    if (file) {
      try {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        imageUri = cloudResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }
    }

    // Update fields
    equipment.descriptionEnglish = descriptionEnglish;
    equipment.descriptionGujarati = descriptionGujarati;
    equipment.rentPerHour = rentPerHour;
    equipment.status = status;
    equipment.image = imageUri;

    const updatedEquipment = await equipment.save(); // ✅ FIXED: save the document instance

    return res.status(200).json({
      success: true,
      message: "Equipment updated successfully",
      equipment: {
        _id: updatedEquipment._id,
        name: updatedEquipment.name,
        category: updatedEquipment.category,
        serialNumber: updatedEquipment.serialNumber,
        descriptionEnglish: updatedEquipment.descriptionEnglish,
        descriptionGujarati: updatedEquipment.descriptionGujarati,
        rentPerHour: updatedEquipment.rentPerHour,
        status: updatedEquipment.status,
        image: updatedEquipment.image,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params; // Equipment ID from URL
    const user = req.user; // Get the logged-in user

    const deletedEquipment = await Equipment.findByIdAndDelete(id);

    if (!deletedEquipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found",
      });
    }

    // 1. Remove equipment from Admin AssignedEquipment
    await User.findByIdAndUpdate(user._id, {
      $pull: {
        AssignedEquipment: id
      }
    });

    const updatedUser = await User.findById(user._id).populate("AssignedEquipment");

    return res.status(200).json({
      success: true,
      message: "Equipment deleted successfully",
      data: deletedEquipment,
      user: updatedUser,
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
    const equipmentList = await Equipment.find();

    return res.status(200).json({
      success: true,
      message: "All equipment fetched successfully",
      equipmentList,
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
