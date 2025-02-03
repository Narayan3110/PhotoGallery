import React, { useEffect, useState } from "react";
import albumService from "../services/albumService";

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [renameModal, setRenameModal] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [createAlbumModal, setCreateAlbumModal] = useState(false); // State for add album modal
  const [albumName, setAlbumName] = useState(""); // State for new album name

  // Get profileId from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const profileId = user?.userProfile?.profileId;

  useEffect(() => {
    if (profileId) fetchAlbums();
  }, [profileId]);

  const fetchAlbums = async () => {
    try {
      const data = await albumService.getAllAlbums(profileId);
      setAlbums(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch albums", error);
      setAlbums([]);
    }
  };

  // Handle right-click to show context menu
  const handleRightClick = (event, album) => {
    event.preventDefault();
    setSelectedAlbum(album);
    setContextMenu({
      x: event.pageX,
      y: event.pageY,
    });
  };

  // Rename Album
  const handleRenameAlbum = async () => {
    if (!newAlbumName.trim()) return;
    try {
      await albumService.renameAlbum(profileId, selectedAlbum.albumName, newAlbumName);
      setRenameModal(false);
      setContextMenu(null);
      fetchAlbums(); // Refresh album list
    } catch (error) {
      console.error("Failed to rename album:", error);
    }
  };

  // Delete Album
  const handleDeleteAlbum = async () => {
    if (!selectedAlbum) return;
    try {
      await albumService.deleteAlbum(profileId, selectedAlbum.albumName);
      setContextMenu(null);
      fetchAlbums(); // Refresh album list
    } catch (error) {
      console.error("Failed to delete album:", error);
    }
  };

  // Create Album
  const handleCreateAlbum = async () => {
    if (!albumName.trim()) return;
    try {
      await albumService.addAlbum(profileId, { albumName }); // Make the POST request to create the album
      setCreateAlbumModal(false);
      setAlbumName(""); // Clear the input after creation
      fetchAlbums(); // Refresh album list
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  return (
    <div className="min-h-screen w-full p-6">
      {/* Title and Create Album Button */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">My Albums</h1>
        <button
          onClick={() => setCreateAlbumModal(true)}
          className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-400"
        >
          + Create Album
        </button>
      </div>

      {/* Display Albums */}
      <div className="grid grid-cols-4 gap-4">
        {albums.length > 0 ? (
          albums.map((album) => (
            <div
              key={album.id}
              className="p-4 border rounded-lg bg-gray-100 cursor-pointer"
              onContextMenu={(e) => handleRightClick(e, album)}
            >
              📁 <span>{album.albumName}</span>
            </div>
          ))
        ) : (
          <p>No albums found</p>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="absolute bg-white border shadow-md rounded-md p-2"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            onClick={() => setRenameModal(true)}
          >
            Rename
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-red-200"
            onClick={handleDeleteAlbum}
          >
            Delete
          </button>
        </div>
      )}

      {/* Rename Modal */}
      {renameModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Rename Album</h2>
            <input
              type="text"
              className="border p-2 w-full"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              placeholder="Enter new album name"
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleRenameAlbum}
              >
                Save
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setRenameModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Album Modal */}
      {createAlbumModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Create New Album</h2>
            <input
              type="text"
              className="border p-2 w-full"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              placeholder="Enter album name"
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleCreateAlbum}
              >
                Create
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setCreateAlbumModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
