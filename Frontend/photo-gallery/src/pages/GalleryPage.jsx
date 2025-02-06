import React, { useState, useEffect } from "react";
import {
  uploadPhoto,
  fetchPhotos,
  deletePhoto,
} from "../services/photoService";
import albumService from "../services/albumService";
import { useNavigate } from "react-router-dom";
import GalleryNavbar from "../components/GalleryNavbar";

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [albums, setAlbums] = useState([]); // Store available albums
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [showAlbumDropdown, setShowAlbumDropdown] = useState(false); // Control visibility of the album dropdown
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserPhotos();
    fetchAlbums(); // Load albums when the page loads
  }, []);

  const fetchUserPhotos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const profileId = user?.userProfile?.profileId;

      if (!profileId) {
        setMessage("Profile ID not found.");
        return;
      }

      const photosData = await fetchPhotos(profileId);
      setPhotos(photosData === "No Photos To Display" ? [] : photosData);
    } catch (error) {
      setMessage("Error fetching photos.");
      console.error("Error fetching photos:", error);
    }
  };

  const fetchAlbums = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const profileId = user?.userProfile?.profileId;

      if (!profileId) {
        setMessage("Profile ID not found.");
        return;
      }

      const albumsData = await albumService.getAllAlbums(profileId);
      setAlbums(albumsData);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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

      setLoading(true);
      const formData = new FormData();
      formData.append("profile_id", profileId);
      formData.append("photo", file);

      const response = await uploadPhoto(formData);
      if (response) {
        setMessage("Photo uploaded successfully!");
        fetchUserPhotos();
      } else {
        setMessage("Failed to upload photo.");
      }
      setLoading(false);
    } catch (error) {
      setMessage("Error uploading photo.");
      console.error("Error uploading photo:", error);
      setLoading(false);
    }
  };

  const openModal = (photoUrl, publicId) => {
    setSelectedPhoto(photoUrl);
    setSelectedPhotoId(publicId);
    setShowAlbumDropdown(false); // Hide the dropdown when opening the photo modal
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setSelectedPhotoId(null);
    setShowAlbumDropdown(false); // Hide the dropdown when modal is closed
  };

  const handleDeletePhoto = async () => {
    console.log("Selecgted photo id :" + selectedPhotoId);
    try {
      const response = await deletePhoto(selectedPhotoId);
      if (response) {
        setMessage("Photo deleted successfully!");
        fetchUserPhotos();
        closeModal();
      } else {
        setMessage("Failed to delete photo.");
      }
    } catch (error) {
      setMessage("Error deleting photo.");
      console.error("Error deleting photo:", error);
    }
  };

  const handleUploadToAlbum = () => {
    setShowAlbumDropdown(true); // Show the album dropdown when clicked
  };

  const handleAddToAlbum = async () => {
    if (!selectedAlbumId || !selectedPhotoId) {
      setMessage("Please select an album.");
      return;
    }

    try {
      await albumService.addPhotoToAlbum(selectedAlbumId, selectedPhotoId);
      setMessage("Photo added to album successfully!");
      console.log("Selected" + selectedAlbumId);
      navigate(`/album/${selectedAlbumId}`); // Redirect to album details page
      setShowAlbumDropdown(false); // Hide the dropdown after adding
    } catch (error) {
      setMessage("Error adding photo to album.");
      console.error("Error adding photo to album:", error);
    }
  };

  return (
    <div className="flex">
      <GalleryNavbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 text-white p-6 ml-64 w-full">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Your Photo Gallery
        </h1>
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
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </div>
        {message && (
          <p className="mt-6 text-xl text-center text-yellow-200">{message}</p>
        )}
        <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.length === 0 ? (
            <p className="col-span-full text-center text-lg text-gray-200">
              No photos available.
            </p>
          ) : (
            photos.map((photo, index) => (
              <div
                key={photo.publicId}
                className="relative rounded-lg shadow-xl hover:scale-105 cursor-pointer"
                onClick={() => openModal(photo.photoUrl, photo.publicId)}
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
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative max-w-4xl max-h-[90vh] p-4 bg-white rounded-lg shadow-2xl text-black">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-black text-3xl p-2 rounded-full"
              >
                ×
              </button>
              <img
                src={selectedPhoto}
                alt="Selected Photo"
                className="w-full h-auto rounded-lg"
              />
              {showAlbumDropdown && (
                <div className="absolute top-4 left-4 bg-white text-black shadow-lg p-4 rounded-lg w-72">
                  <h3 className="text-lg font-semibold mb-4">Select Album</h3>
                  <select
                    value={selectedAlbumId}
                    onChange={(e) => setSelectedAlbumId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select an album</option>
                    {albums.map((album) => (
                      <option key={album.albumId} value={album.albumId}>
                        {album.albumName}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddToAlbum}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-4 w-full"
                  >
                    Add to Album
                  </button>
                </div>
              )}
              <div className="absolute bottom-4 right-4 flex gap-4">
                <button
                  onClick={handleUploadToAlbum}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Upload to Album
                </button>
                <button
                  onClick={handleDeletePhoto}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete Photo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
