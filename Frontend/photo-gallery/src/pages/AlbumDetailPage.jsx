import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import albumService from "../services/albumService";

const AlbumDetailPage = () => {
  const { albumId } = useParams(); // Get albumId from URL
  const [albumDetails, setAlbumDetails] = useState({ albumName: "", photoUrls: [] });
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // For large view of selected photo

  useEffect(() => {
    const fetchAlbumPhotos = async () => {
      try {
        const data = await albumService.getAlbumPhotos(albumId); // Fetch photos for the album
        setAlbumDetails(data); // Set the album details (including photo URLs)
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch album photos", error);
        setLoading(false);
      }
    };

    fetchAlbumPhotos();
  }, [albumId]);

  const handlePhotoClick = (photoUrl) => {
    setSelectedPhoto(photoUrl); // Set the clicked photo as the selected one for larger view
  };

  const handleRightClick = (e, photoId) => {
    e.preventDefault(); // Prevent the default right-click menu
    const albumName = albumDetails.albumName;
    const profileId = 1; // Assuming the profileId is known, adjust accordingly

    albumService
      .removeFromAlbum(albumName, profileId, photoId)
      .then((response) => {
        console.log("Photo removed successfully:", response);
        // Optionally, remove the photo from the UI after successful removal
        setAlbumDetails((prevDetails) => ({
          ...prevDetails,
          photoUrls: prevDetails.photoUrls.filter((url) => url !== photoId), // Filter out the removed photo
        }));
      })
      .catch((error) => {
        console.error("Error removing photo:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full p-6">
      <h1 className="text-2xl font-bold mb-4">{albumDetails.albumName}</h1>
      <p className="mb-6">Created At: {new Date(albumDetails.createdAt).toLocaleString()}</p>

      {selectedPhoto && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-80 z-50">
          <img
            src={selectedPhoto}
            alt="Selected"
            className="max-w-full max-h-full object-contain"
            onClick={() => setSelectedPhoto(null)} // Close the large view when clicked
          />
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {albumDetails.photoUrls && albumDetails.photoUrls.length > 0 ? (
          albumDetails.photoUrls.map((url, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-gray-100"
              onClick={() => handlePhotoClick(url)} // Open photo in large view on click
              onContextMenu={(e) => handleRightClick(e, index)} // Call removeFromAlbum on right-click
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
