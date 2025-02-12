import axios from "axios";

// Get the backend URL from environment variables
const BACKEND_URL =
  import.meta.env.VITE_BACK_END_URL || "http://localhost:9090/api";
const API_BASE_URL = `${BACKEND_URL}/album`;

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const albumService = {
  getAllAlbums: async (profileId, order = "desc") => {
    try {
      console.log(
        "Fetching albums for Profile ID:",
        profileId,
        "with order:",
        order
      );
      const response = await api.get(`/all/${profileId}?order=${order}`); // Include sorting order
      localStorage.setItem("albums", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching albums:", error);
      return [];
    }
  },

  getAlbumPhotos: async (albumId) => {
    try {
      const response = await api.get(`/get/photos/${albumId}`); // Uses Axios instance
      return response.data; // Return the entire response data as is
    } catch (error) {
      console.error("Error fetching album photos:", error);
      throw error;
    }
  },

  renameAlbum: async (profileId, albumName, newName) => {
    try {
      await api.put(`/rename/${albumName}`, {
        profileId,
        albumName: newName,
      });
    } catch (error) {
      console.error("Error renaming album:", error);
      throw error;
    }
  },

  deleteAlbum: async (profileId, albumName) => {
    try {
      await api.delete(`/delete/${profileId}/${albumName}`);
    } catch (error) {
      console.error("Error deleting album:", error);
      throw error;
    }
  },

  addAlbum: async (profileId, albumData) => {
    try {
      const response = await api.post(`/add/${profileId}`, albumData);
      return response.data;
    } catch (error) {
      console.error("Error creating album:", error);
      throw error;
    }
  },

  removeFromAlbum: async (albumName, profileId, photoId) => {
    try {
      const response = await api.delete(`/remove-from-album`, {
        params: { albumName, profileId, photoId },
      });
      return response.data;
    } catch (error) {
      console.error("Error removing photo from album:", error);
      throw error;
    }
  },

  addPhotoToAlbum: async (albumId, publicId) => {
    try {
      console.log("Album Id :", albumId);
      console.log("Photo Id (publicId):", publicId);

      const response = await api.post(`/add-photo/${albumId}`, { publicId }); // Correctly formatted
      return response.data;
    } catch (error) {
      console.error("Error adding photo to album:", error);
      throw error;
    }
  },

  removePhotoFromAlbum: async (albumName, profileId, publicId) => {
    console.log(
      "albumName :",
      albumName,
      "profileId :",
      profileId,
      "publicId :",
      publicId
    );
    try {
      const response = await api.delete(`/remove-from-album`, {
        params: { albumName, profileId, publicId },
      });
      return response.data;
    } catch (error) {
      console.error("Error removing photo:", error);
      throw error;
    }
  },

  uploadPhotoToAlbum: async (profileId, file, albumName) => {
    const formData = new FormData();
    formData.append("profile_id", profileId);
    formData.append("photo", file);
    formData.append("album_name", albumName);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/photo/upload`, // Use dynamic backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is included
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading photo:", error);
      throw error;
    }
  },

  searchAlbum: async (profileId, albumName) => {
    try {
      const response = await api.get(`/search/${profileId}/${albumName}`);
      return response.data;
    } catch (error) {
      console.error("Error searching for album:", error);
      throw error;
    }
  },
};

export default albumService;
