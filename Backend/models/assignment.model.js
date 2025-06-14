import mongoose from "mongoose";

const assignmentHistorySchema = new mongoose.Schema({
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },      // who received the equipment
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },      // who assigned the equipment
  assignedAt: { type: Date, default: Date.now, required: true },
  returnedAt: { type: Date }, // null if not returned yet
});

export const AssignmentHistory = mongoose.model('AssignmentHistory', assignmentHistorySchema);