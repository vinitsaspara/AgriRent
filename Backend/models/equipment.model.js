import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: String
  },
  status: {
    type: String,
    enum: ['Available', 'Assigned', 'Rented', 'Maintenance'],
    default: 'available'
  },
  descriptionEnglish: {
    type: String,
    required: true
  },
  descriptionGujarati: {
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
  assignmentHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ]
});

export const Equipment = mongoose.model('Equipment', equipmentSchema);

