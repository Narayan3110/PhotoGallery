import axios from "axios";

// Function to get the JWT token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token"); // Get token from localStorage (or sessionStorage)
};

// Upload photo to the backend
export const uploadPhoto = async (formData) => {
  try {
    const token = getAuthToken(); // Get JWT token

    const response = await axios.post(
      "http://localhost:9090/api/photo/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure it's multipart/form-data
          Authorization: `Bearer ${token}`, // Add JWT token to headers
        },
      }
    );
    return response.data; // Return the server's response (success message)
  } catch (error) {
    console.error("Error uploading photo:", error);
    throw error; // Propagate the error
  }
};

// Fetch photos for a given profileId
export const fetchPhotos = async (profileId) => {
  try {
    const token = getAuthToken(); // Get JWT token

    const response = await axios.get(
      `http://localhost:9090/api/photo/${profileId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add JWT token to headers
        },
      }
    );
    return response.data; // Return the list of photo URLs
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error; // Propagate the error
  }
};

// Delete Photo By Id and Url
export const deletePhoto = async (publicId) => {
  try {
    const token = getAuthToken(); // Get JWT token

    const response = await axios.delete(
      `http://localhost:9090/api/photo/delete`,
      {
        params: { publicId }, // Send publicId as a query parameter
        headers: {
          Authorization: `Bearer ${token}`, // Add JWT token to headers
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting photo:", error);
    return false;
  }
};
