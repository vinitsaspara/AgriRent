import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../config/getDataUri.js";
import { Equipment } from "../models/equipment.model.js";

export const signUp = async (req, res) => {
  try {
    const { userId, fullName, email, password, role, age, phoneNumber, address } = req.body;

    // console.log(userId, fullName, email, password, role, age, phoneNumber, address);


    if (!userId || !fullName || !email || !password || !age || !phoneNumber || !address) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false
      })
    }

    const existEmail = await User.findOne({ email });

    const existuserId = await User.findOne({ userId });

    if (existEmail || existuserId) {
      return res.status(400).json({
        message: "User alredy exist",
        success: false
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    if (req.user && req.user.role === "Admin") {
      role = req.body;
    }

    await User.create({
      userId,
      fullName,
      email,
      password: hashPassword,
      address,
      role,
      age,
      phoneNumber
    })

    return res.status(201).json({
      message: 'User registered successfully!',
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
}

export const login = async (req, res) => {
  try {

    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false
      })
    }

    const user = await User.findOne({ userId: { $regex: new RegExp(`^${userId}$`, "i") } });

    if (!user) {
      return res.status(400).json({
        message: "Invalid userId or Password.",
        success: false
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid userId or Password.",
        success: false
      })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    const userData = {
      _id: user.id,
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      role: user.role,
      phoneNumber: user.phoneNumber,
      age: user.age,
      address: user.address,
      profilePicture: user.profilePicture,
      equipmentHistory: user.equipmentHistory
    }

    return res.status(200).cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    }).json({
      message: `Welcome back ${userData.fullName}`,
      user: userData,
      success: true,
    })


  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
}

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", null, {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
    }).json({
      message: "Logout successfully",
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching users",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID missing",
      });
    }

    const { fullName, address, age, phoneNumber } = req.body;

    if (!fullName || !address || !age || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "fullName, address, age, and phoneNumber are required",
      });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Default: retain existing image
    let imageUri = user.profilePicture;

    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
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
    user.fullName = fullName;
    user.address = address;
    user.age = age;
    user.phoneNumber = phoneNumber;
    user.profilePicture = imageUri;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        userId: updatedUser.userId,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        phoneNumber: updatedUser.phoneNumber,
        age: updatedUser.age,
        address: updatedUser.address,
        profilePicture: updatedUser.profilePicture,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false
      })
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
        success: false
      });
    }

    // Update fields only if provided
    if (userId) user.userId = userId;
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
    }

    await user.save(); // Don't forget to save the changes

    return res.status(200).json({
      message: 'User updated successfully!',
      success: true
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params; // Equipment ID from URL

    const deleteEmployee = await User.findByIdAndDelete(id);

    if (!deleteEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee removed successfully",
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