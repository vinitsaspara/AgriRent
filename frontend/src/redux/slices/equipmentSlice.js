import { createSlice } from "@reduxjs/toolkit";

const equipmentSlice = createSlice({
    name: "equipment",
    initialState: {
        allEquipment: [],
        equipmentHistory: []
    },
    reducers: {
        setAllEquipment: (state, action) => {
            state.allEquipment = action.payload;
        },
        setEquipmentHistory: (state, action) => {
            state.equipmentHistory = action.payload;
        },
    }
})

export const { setAllEquipment, setEquipmentHistory } = equipmentSlice.actions;
export default equipmentSlice.reducer;