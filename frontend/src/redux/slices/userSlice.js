import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false, // <-- required for loading flag
  user: null,
  allUsers: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {   // <-- renamed here
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    }
  },
});

export const { setUser, setLoading, logout, setAllUsers } = userSlice.actions;

export default userSlice.reducer;
