import axios from "axios";

const API_URL =
  import.meta.env.VITE_BACK_END_URL || "http://localhost:9090/api/";

// Function to get token from localStorage (or sessionStorage)
const getAuthToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// Axios instance with Authorization header
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get(`admin/getusers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch a single user by ID
export const fetchUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`admin/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Update user role
export const updateUserRole = async (userId, roleName) => {
  try {
    const response = await axiosInstance.put(
      `admin//update-role?userId=${userId}&roleName=${roleName}`
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
    const response = await axiosInstance.put(
      `admin/update-password?userId=${userId}&password=${password}`
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
    await axiosInstance.delete(`admin/remove/${userId}`);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Fetch all available roles
export const fetchRoles = async () => {
  try {
    const response = await axiosInstance.get(`admin/roles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};
