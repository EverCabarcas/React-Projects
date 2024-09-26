import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthenticated: false };

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
    },
    logout(state, action) {
      state.isAuthenticated = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;