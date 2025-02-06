import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import albumService from "../services/albumService";

const AlbumDetailPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [albumDetails, setAlbumDetails] = useState({
    albumName: "",
    createdAt: "",
    photos: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPublicId, setSelectedPublicId] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchAlbumPhotos = async () => {
      console.log("albumId :", albumId);
      try {
        const data = await albumService.getAlbumPhotos(albumId);
        console.log("Fetched album photos:", data); // Debugging log

        // Validate that data.photos is an array
        if (data && Array.isArray(data.photos)) {
          setAlbumDetails({
            albumName: data.albumName,
            createdAt: data.createdAt,
            photos: data.photos,
          });
        } else {
          console.error(
            "Invalid data format: photos is not an array or is missing."
          );
          console.log("Actual data received:", data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch album photos", error);
        setLoading(false);
      }
    };

    fetchAlbumPhotos();
  }, [albumId]);

  const handleAddPhotosClick = () => {
    console.log("albumId :", albumId);
    navigate("/gallery", { state: { albumId } });
  };

  const handlePhotoClick = (photoUrl, publicId) => {
    setSelectedPhoto(photoUrl);
    setSelectedPublicId(publicId);
  };

  const handleRemovePhoto = async () => {
    try {
      // Retrieve user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const profileId = storedUser?.userProfile?.profileId;

      if (!profileId) {
        console.error("Profile ID not found in local storage.");
        return;
      }

      await albumService.removePhotoFromAlbum(
        albumDetails.albumName,
        profileId,
        selectedPublicId
      );

      // Filter the photos from the album details by publicId
      setAlbumDetails((prevDetails) => ({
        ...prevDetails,
        photos: prevDetails.photos.filter(
          (photo) => photo.publicId !== selectedPublicId
        ),
      }));

      setSelectedPhoto(null);
      setSelectedPublicId(null);
    } catch (error) {
      console.error("Error removing photo:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    try {
      // Retrieve user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const profileId = storedUser?.userProfile?.profileId;

      if (!profileId || !file) {
        console.error("Profile ID or file is missing.");
        return;
      }

      const publicId = await albumService.uploadPhotoToAlbum(
        profileId,
        file,
        albumDetails.albumName
      );

      // Add the new photo to the album details
      setAlbumDetails((prevDetails) => ({
        ...prevDetails,
        photos: [
          ...prevDetails.photos,
          { photoUrl: URL.createObjectURL(file), publicId },
        ],
      }));

      setFile(null);
      console.log("Photo uploaded successfully:", publicId);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="text-2xl font-bold mb-4">{albumDetails.albumName}</h1>
      <p className="mb-6">
        Created At: {new Date(albumDetails.createdAt).toLocaleString()}
      </p>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4"
        onClick={handleAddPhotosClick}
      >
        Add Photos
      </button>

      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
        onClick={handleUploadPhoto}
      >
        Upload Photo
      </button>

      {selectedPhoto && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-80 z-50">
          <img
            src={selectedPhoto}
            alt="Selected"
            className="max-w-full max-h-full object-contain mb-4"
            onClick={() => setSelectedPhoto(null)}
          />
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={handleRemovePhoto}
          >
            Delete Photo
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {albumDetails.photos.length > 0 ? (
          albumDetails.photos.map((photo, index) => {
            const { photoUrl, publicId } = photo;

            return (
              <div
                key={index}
                className="p-4 border rounded-lg bg-gray-100"
                onClick={() => handlePhotoClick(photoUrl, publicId)}
              >
                <img
                  src={photoUrl}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-auto cursor-pointer"
                />
              </div>
            );
          })
        ) : (
          <p>No photos found in this album.</p>
        )}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
