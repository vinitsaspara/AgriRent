import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        assignmentIds: [],
    },
    reducers: {
        setAssignmentIds: (state, action) => {
            state.assignmentIds = action.payload;
        },
    }
});


export const { setAssignmentIds } = paymentSlice.actions;
export default paymentSlice.reducer;