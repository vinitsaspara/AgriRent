import mongoose from "mongoose";

const assignmentHistorySchema = new mongoose.Schema({
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },      
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },      
  assignedAt: {
    type: Date, 
    default: Date.now, 
    required: true
  },
  payment:{
    type:Boolean,
    default:false
  },
  returnedAt: {
    type: Date
  }, 
});

export const AssignmentHistory = mongoose.model('AssignmentHistory', assignmentHistorySchema);