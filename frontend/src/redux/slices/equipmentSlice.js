import { createSlice } from "@reduxjs/toolkit";

const equipmentSlice = createSlice({
    name: "equipment",
    initialState:{
        allEquipment : null,
        allAssignedEquipment : null
    },
    reducers:{
        setAllEquipment:(state,action)=>{
            state.allEquipment = action.payload;
        },
        setAllAssignedEquipment:(state,action) =>{
            state.allAssignedEquipment = action.payload;
        }
    }
})

export const {setAllEquipment,setAllAssignedEquipment} = equipmentSlice.actions;
export default equipmentSlice.reducer;