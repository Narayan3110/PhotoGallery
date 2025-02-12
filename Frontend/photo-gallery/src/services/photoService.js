import axios from "axios";

// Get the backend URL from environment variables
const BACKEND_URL =
  import.meta.env.VITE_BACK_END_URL || "http://localhost:9090/api/photo";

// Function to get the JWT token from localStorage/sessionStorage
const getAuthToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

// Axios instance with base configuration
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to automatically attach the token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Upload photo to the backend
export const uploadPhoto = async (formData) => {
  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error;
  }
};

// Fetch photos by profile ID with optional order
export const fetchPhotos = async (profileId, order = "desc") => {
  try {
    const response = await api.get(`/${profileId}`, { params: { order } });
    return response.data;
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error;
  }
};

// Delete photo by public ID
export const deletePhoto = async (publicId) => {
  try {
    const response = await api.delete("/delete", { params: { publicId } });
    return response.data;
  } catch (error) {
    console.error("Error deleting photo:", error);
    return false;
  }
};

export default api;
