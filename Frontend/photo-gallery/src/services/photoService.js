import axios from "axios";

// Upload photo to the backend
export const uploadPhoto = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:9090/api/photo/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure it's multipart/form-data
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
    const response = await axios.get(
      `http://localhost:9090/api/photo/${profileId}`
    );
    return response.data; // Return the list of photo URLs
  } catch (error) {
    console.error("Error fetching photos:", error);
    throw error; // Propagate the error
  }
};

//Delete Photo By Id and Url
export const deletePhoto = async (publicId) => {
  try {
    // console.log("Public ID:", publicId);

    const response = await axios.delete(
      `http://localhost:9090/api/photo/delete`,
      { params: { publicId } } // Send publicId as a query parameter
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting photo:", error);
    return false;
  }
};
