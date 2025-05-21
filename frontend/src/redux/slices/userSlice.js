import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false, // <-- required for loading flag
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
  },
});

export const { setUser, logout, setLoading } = userSlice.actions;

export default userSlice.reducer;
