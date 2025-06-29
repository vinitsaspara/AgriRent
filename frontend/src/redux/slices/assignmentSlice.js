import { createSlice } from "@reduxjs/toolkit";

const assignmentSlice = createSlice({
    name: "assignment",
    initialState: {
        allAssignments: [],
    },
    reducers: {
        setAllAssignment: (state, action) => {
            state.allAssignments = action.payload;
        },
    }
});


export const { setAllAssignment } = assignmentSlice.actions;
export default assignmentSlice.reducer;