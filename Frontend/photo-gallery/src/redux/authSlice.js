import { createSlice } from "@reduxjs/toolkit";

// Load token from localStorage (if any)
const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialState = {
  token: tokenFromStorage || null,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;

      // Save token and user info in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      console.log(action.payload);
    },
    logout(state) {
      state.token = null;
      state.user = null;

      // Remove token and user info from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
