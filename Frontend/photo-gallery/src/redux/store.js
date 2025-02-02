import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Auth reducer for managing authentication state
import photoReducer from "./photoSlice"; // Photo reducer for managing photos state

const store = configureStore({
  reducer: {
    auth: authReducer, // Auth state will be managed by authReducer
    photos: photoReducer, // Photo state will be managed by photoReducer
  },
});

export default store;
