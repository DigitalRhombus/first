// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserDetailSlice"; // Import the user slice

const store = configureStore({
  reducer: {
    userDetail: userReducer, // Add the user slice reducer
  },
});

export default store;
