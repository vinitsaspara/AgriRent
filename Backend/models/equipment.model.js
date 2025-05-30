import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: { type: String, unique: true, required: true },
  category: { type: String },
  status: { type: String, enum: ['Available', 'Assigned', 'Rented', 'Maintenance'], default: 'available' },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ""
  },
  rentPerHour: {
    type: Number,
    default: 100
  },
  assignmentHistory: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  }]
});

export const Equipment = mongoose.model('Equipment', equipmentSchema);

