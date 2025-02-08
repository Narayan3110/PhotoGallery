// import axios from "axios";

// const API_BASE_URL = "http://localhost:9090/api/photo";

// // Retrieve JWT token from localStorage
// const getAuthToken = () => localStorage.getItem("token");

// // Upload photo to the backend
// export const uploadPhoto = async (formData) => {
//   try {
//     const token = getAuthToken();
//     const response = await axios.post(
//       `${API_BASE_URL}/upload`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to upload photo:", error);
//     throw error;
//   }
// };

// // Fetch photos for a given profile ID
// export const fetchPhotos = async (profileId) => {
//   try {
//     const token = getAuthToken();
//     const response = await axios.get(`${API_BASE_URL}/${profileId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch photos:", error);
//     throw error;
//   }
// };

// // Delete photo by public ID
// export const deletePhoto = async (publicId) => {
//   try {
//     const token = getAuthToken();
//     const response = await axios.delete(`${API_BASE_URL}/delete`, {
//       params: { publicId },
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to delete photo:", error);
//     return false;
//   }
// };

import axios from "axios";

const API_BASE_URL = "http://localhost:9090/api/photo";

// Retrieve JWT token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Fetch and optionally sort photos for a given profile ID
export const fetchPhotos = async (profileId, order = "desc") => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/${profileId}`, {
      params: { order },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    throw error;
  }
};

// Upload photo to the backend
export const uploadPhoto = async (formData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to upload photo:", error);
    throw error;
  }
};

// Delete photo by public ID
export const deletePhoto = async (publicId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_BASE_URL}/delete`, {
      params: { publicId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete photo:", error);
    return false;
  }
};
