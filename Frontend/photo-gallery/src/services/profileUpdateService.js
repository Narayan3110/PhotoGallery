import axios from "axios";
import { updateUser } from "@/redux/authSlice"; // Import the new action

// Get the backend URL from environment variables
const BACKEND_URL =
  import.meta.env.VITE_BACK_END_URL || "http://localhost:9090/api/";

// Axios instance with base configuration
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get the JWT token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Update user profile with authentication
export const updateUserProfile = async (profileId, updatedUserData, dispatch) => {
  try {
    const token = getAuthToken();
    const response = await api.put(
      `userprofile/update/${profileId}`,
      null,
      {
        params: updatedUserData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Update Success:", response);

    if (updatedUserData.removeProfile) {
      updatedUserData.profileUrl = null;
    }

    // Dispatch updateUser to reflect changes in Redux & localStorage
    dispatch(updateUser(updatedUserData));

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
