import axios from "axios";

const API_BASE_URL = "http://localhost:9090/api/album";

const albumService = {
  getAllAlbums: async (profileId) => {
    try {
      console.log("Fetching albums for Profile ID:", profileId);
      const response = await axios.get(`${API_BASE_URL}/all/${profileId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching albums:", error);
      return [];
    }
  },

  renameAlbum: async (profileId, albumName, newName) => {
    console.log(profileId);
    console.log(albumName);
    console.log(newName);
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
    console.log(profileId);
    console.log(albumData);
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
};

export default albumService;
