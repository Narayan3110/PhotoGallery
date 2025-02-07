import axios from "axios";
import { updateUser } from "@/redux/authSlice"; // Import the new action

export const updateUserProfile = async (profileId, updatedUserData, dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:9090/api/userprofile/update/${profileId}`,
      null,
      { params: updatedUserData }
    );

    console.log("Update Success:", response);
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
