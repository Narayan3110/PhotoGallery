import axios from "axios";

const API_BASE_URL = "http://localhost:9090/api/album";

const albumService = {
  getAllAlbums: async (profileId) => {
    try {
      console.log("Fetching albums for Profile ID:", profileId);
      const response = await axios.get(`${API_BASE_URL}/all/${profileId}`);
      localStorage.setItem("albums", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching albums:", error);
      return [];
    }
  },

  // getAlbumPhotos: async (albumId) => {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/get/${albumId}`);
  //     return response.data; // Return the album photos data
  //   } catch (error) {
  //     console.error("Error fetching album photos:", error);
  //     throw error;
  //   }
  // },
  getAlbumPhotos: async (albumId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/photos/${albumId}`);

      // Return both album details and photo URLs
      const albumData = {
        albumName: response.data.albumName,
        createdAt: response.data.createdAt,
        photoUrls: response.data.photoUrls, // Extract the photo URLs
      };

      return albumData; // Return the structured album data
    } catch (error) {
      console.error("Error fetching album photos:", error);
      throw error;
    }
  },

  renameAlbum: async (profileId, albumName, newName) => {
    try {
      await axios.put(`${API_BASE_URL}/rename/${albumName}`, {
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
      await axios.delete(`${API_BASE_URL}/delete/${profileId}/${albumName}`);
    } catch (error) {
      console.error("Error deleting album:", error);
      throw error;
    }
  },

  addAlbum: async (profileId, albumData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/add/${profileId}`,
        albumData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating album:", error);
      throw error;
    }
  },
  removeFromAlbum: async (albumName, profileId, photoId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/remove-from-album`, {
        params: { albumName, profileId, photoId },
      });
      return response.data; // Return the response message from the backend
    } catch (error) {
      console.error("Error removing photo from album:", error);
      throw error;
    }
  },
};

export default albumService;
