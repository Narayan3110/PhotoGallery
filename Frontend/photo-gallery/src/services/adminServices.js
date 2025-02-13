// import axios from "axios";

// const API_URL = "http://localhost:9090/api/admin";

// export const fetchUsers = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/getusers`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
// };

// export const deleteUser = async (userId) => {
//   try {
//     await axios.delete(`${API_URL}/remove/${userId}`);
//     return true;
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     throw error;
//   }
// };

import axios from "axios";

const API_URL = "http://localhost:9090/api/admin";

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/getusers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch a single user by ID
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Update user role
export const updateUserRole = async (userId, roleName) => {
  try {
    const response = await axios.put(
      `${API_URL}/update-role?userId=${userId}&roleName=${roleName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

// Update user password
export const updateUserPassword = async (userId, password) => {
  try {
    const response = await axios.put(
      `${API_URL}/update-password?userId=${userId}&password=${password}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user password:", error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/remove/${userId}`);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Fetch all available roles
export const fetchRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

