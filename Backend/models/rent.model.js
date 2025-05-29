import mongoose from "mongoose"

const rentSchema = new mongoose.Schema({
    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    equipmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Equipment'
    },
    quantity:{
        type:Number,
        required: true
    }
})

export const Rent = mongoose.model('Rent',rentSchema);