import axios from "axios";

const API_URL = "http://localhost:9090/api/admin";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/getusers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/remove/${userId}`);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
