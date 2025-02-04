import React, { useState, useEffect } from "react";
import {
  uploadPhoto,
  fetchPhotos,
  deletePhoto,
} from "../services/photoService"; // Import deletePhoto function
import GalleryNavbar from "../components/GalleryNavbar"; // Import GalleryNavbar

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]); // To hold the fetched photos
  const [message, setMessage] = useState(""); // To show success/error messages
  const [file, setFile] = useState(null); // To hold the selected file
  const [loading, setLoading] = useState(false); // To track upload status
  const [selectedPhoto, setSelectedPhoto] = useState(null); // To store the clicked photo
  const [selectedPhotoId, setSelectedPhotoId] = useState(null); // To store the publicId of the clicked photo

  // Fetch photos for the logged-in user's profile
  const fetchUserPhotos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const profileId = user?.userProfile?.profileId; // Get profileId from localStorage

      if (!profileId) {
        setMessage("Profile ID not found.");
        return;
      }

      const photosData = await fetchPhotos(profileId); // Fetch photos using profileId

      if (photosData === "No Photos To Display") {
        setMessage("No photos available.");
      } else {
        setPhotos(photosData); // Store the fetched photos in the state
      }
    } catch (error) {
      setMessage("Error fetching photos.");
      console.error("Error fetching photos:", error);
    }
  };

  // Use useEffect to fetch photos when the component is mounted
  useEffect(() => {
    fetchUserPhotos();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle photo upload
  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const profileId = user?.userProfile?.profileId;

      if (!profileId) {
        setMessage("Profile ID not found.");
        return;
      }

      setLoading(true); // Set loading state to true

      const formData = new FormData();
      formData.append("profile_id", profileId);
      formData.append("photo", file);

      // Call the uploadPhoto function (you need to implement this in photoService.js)
      const response = await uploadPhoto(formData);

      if (response) {
        setMessage("Photo uploaded successfully!");
        fetchUserPhotos(); // Reload photos after successful upload
      } else {
        setMessage("Failed to upload photo.");
      }

      setLoading(false); // Reset loading state after upload
    } catch (error) {
      setMessage("Error uploading photo.");
      console.error("Error uploading photo:", error);
      setLoading(false);
    }
  };

  // Open the modal to view the selected photo
  const openModal = (photoUrl, publicId) => {
    setSelectedPhoto(photoUrl); // Store the photo URL
    setSelectedPhotoId(publicId); // Store the publicId for deletion
  };

  // Close the modal
  const closeModal = () => {
    setSelectedPhoto(null);
    setSelectedPhotoId(null);
  };

  // Handle photo deletion
  const handleDeletePhoto = async () => {
    try {
      const response = await deletePhoto(selectedPhotoId); // Use selected publicId for deletion

      if (response) {
        setMessage("Photo deleted successfully!");
        fetchUserPhotos(); // Reload photos after successful deletion
        closeModal(); // Close the modal
      } else {
        setMessage("Failed to delete photo.");
      }
    } catch (error) {
      setMessage("Error deleting photo.");
      console.error("Error deleting photo:", error);
    }
  };

  return (
    <div className="flex">
      {/* Gallery Navbar on the left */}
      <GalleryNavbar />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 text-white p-6 ml-64 w-full">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Your Photo Gallery
        </h1>

        {/* Upload photo button and file input */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-gray-800">
          <h2 className="text-xl font-semibold text-center mb-4">
            Upload New Photo
          </h2>
          <div className="flex justify-center items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleFileUpload}
              className="bg-blue-600 text-white p-2 rounded-lg transition-all duration-300 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </div>

        {/* Display success/error message */}
        {message && (
          <p className="mt-6 text-xl text-center text-yellow-200">{message}</p>
        )}

        {/* Display photos */}
        <div className="mt-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.length === 0 ? (
              <p className="col-span-full text-center text-lg text-gray-200">
                No photos available.
              </p>
            ) : (
              photos.map((photo, index) => (
                <div
                  key={photo.publicId} // Use publicId for key
                  className="relative overflow-hidden rounded-lg shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
                  onClick={() => openModal(photo.photoUrl, photo.publicId)} // Pass photoUrl and publicId
                >
                  <img
                    src={photo.photoUrl}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modal for viewing the clicked photo */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative max-w-4xl max-h-[90vh]">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-3xl bg-black p-2 rounded-full"
              >
                ×
              </button>
              <img
                src={selectedPhoto}
                alt="Selected Photo"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <button
                onClick={handleDeletePhoto}
                className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
