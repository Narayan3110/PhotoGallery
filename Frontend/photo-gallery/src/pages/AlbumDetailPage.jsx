import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import albumService from "../services/albumService";

const AlbumDetailPage = () => {
  const { albumId } = useParams(); // Get albumId from URL
  const navigate = useNavigate(); // Initialize navigate function
  const [albumDetails, setAlbumDetails] = useState({
    albumName: "",
    photoUrls: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchAlbumPhotos = async () => {
      try {
        const data = await albumService.getAlbumPhotos(albumId);
        setAlbumDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch album photos", error);
        setLoading(false);
      }
    };

    fetchAlbumPhotos();
  }, [albumId]);

  // Navigate to the gallery page when clicking the "Add Photos" button
  const handleAddPhotosClick = () => {
    console.log("albumId :" + albumId);
    navigate("/gallery", { state: { albumId } }); // Pass albumId to GalleryPage
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="text-2xl font-bold mb-4">{albumDetails.albumName}</h1>
      <p className="mb-6">
        Created At: {new Date(albumDetails.createdAt).toLocaleString()}
      </p>

      {/* Add Photos Button */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4"
        onClick={handleAddPhotosClick} // Navigate to gallery
      >
        Add Photos
      </button>

      {selectedPhoto && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-80 z-50">
          <img
            src={selectedPhoto}
            alt="Selected"
            className="max-w-full max-h-full object-contain"
            onClick={() => setSelectedPhoto(null)}
          />
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {albumDetails.photoUrls.length > 0 ? (
          albumDetails.photoUrls.map((url, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-gray-100"
              onClick={() => setSelectedPhoto(url)}
            >
              <img
                src={url}
                alt={`Photo ${index + 1}`}
                className="w-full h-auto cursor-pointer"
              />
            </div>
          ))
        ) : (
          <p>No photos found in this album.</p>
        )}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
