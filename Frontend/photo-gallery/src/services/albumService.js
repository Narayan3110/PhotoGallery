import axios from "axios";

const API_BASE_URL = "http://localhost:9090/api/album";

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
  getAllAlbums: async (profileId) => {
    try {
      console.log("Fetching albums for Profile ID:", profileId);
      const response = await api.get(`/all/${profileId}`); // Uses Axios instance with JWT
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
      const albumData = {
        albumName: response.data.albumName,
        createdAt: response.data.createdAt,
        photoUrls: response.data.photoUrls,
      };
      return albumData;
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
      console.log("Album Id :" + albumId);
      console.log("Photo Id (publicId):" + publicId);

      const response = await api.post(`/add-photo/${albumId}`, { publicId });
      return response.data;
    } catch (error) {
      console.error("Error adding photo to album:", error);
      throw error;
    }
  },
};

export default albumService;
