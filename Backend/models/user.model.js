import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "State Employee", "District Employee", "Taluka Employee", "Farmer"],
        default: "Farmer"
    },
    age: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwcRgFA-KFW6u0wScyvZEBWMLME5WkdeCUg&s"
    },
    AssignedEquipment: [
        {

            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment"
        }
    ],
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
    },
    taluka: {
        type: String,
    },
    village: {
        type: String,
    }
    
}, { timestamps: true })

export const User = mongoose.model("User", userSchema);