import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  type: { 
    type: String, 
    required: true, 
    enum: ['Tractor', 'Harvester', 'Plough', 'Seeder', 'Sprayer', 'Other'] 
  },
  serialNumber: { type: String, required: true, unique: true }, 
  description: { type: String },
  rentPerHour: { type: Number, required: true },
  quantity : {
    type:Number,
    default: 1,
    required: true
  },
  state: { type: String, default: "-"},
  district: { type: String, default: "-"},
  taluka: { type: String, default: "-" },

  currentAssignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },

  assignedRole: {
    type: String,
    enum: ['Admin', 'StateEmployee', 'DistrictEmployee', 'TalukaEmployee', 'Farmer'],
  },

  availabilityStatus: {
    type: String,
    enum: ['Available', 'Assigned', 'Rented', 'Under Maintenance'],
    default: 'Available',
  },

  image:{
    type : String,
    default: ""
  },

  createdAt: { type: Date, default: Date.now },
});

export const Equipment =  mongoose.model('Equipment', equipmentSchema);
