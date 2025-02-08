import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import albumService from "../services/albumService";
import { MdSearch } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [renameModal, setRenameModal] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [createAlbumModal, setCreateAlbumModal] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [searchResults, setSearchResults] = useState(null); // State for search results

  const navigate = useNavigate();

  // Get profileId from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const profileId = user?.userProfile?.profileId;

  useEffect(() => {
    if (profileId) fetchAlbums();
  }, [profileId]);

  // ✅ Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the menu is open and the clicked element is outside the menu
      if (contextMenu && !event.target.closest(".context-menu")) {
        setContextMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu]); // Runs only when contextMenu state changes

  const fetchAlbums = async () => {
    try {
      const data = await albumService.getAllAlbums(profileId);
      setAlbums(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch albums", error);
      setAlbums([]);
    }
  };

  const handleRightClick = (event, album) => {
    event.preventDefault();
    setSelectedAlbum(album);
    setContextMenu({
      x: event.pageX,
      y: event.pageY,
    });
  };

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  const handleRenameAlbum = async () => {
    if (!newAlbumName.trim()) return;
    try {
      await albumService.renameAlbum(
        profileId,
        selectedAlbum.albumName,
        newAlbumName
      );
      setRenameModal(false);
      setContextMenu(null);
      fetchAlbums(); // Refresh album list
    } catch (error) {
      console.error("Failed to rename album:", error);
    }
  };

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

  const handleCreateAlbum = async () => {
    if (!albumName.trim()) return;
    try {
      await albumService.addAlbum(profileId, { albumName });
      setCreateAlbumModal(false);
      setAlbumName(""); // Clear the input after creation
      fetchAlbums(); // Refresh album list
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  const handleSearchAlbum = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    try {
      const result = await albumService.searchAlbum(profileId, searchTerm);
      setSearchResults(result); 
      console.log("searching result :", result, " serch result variable",searchResults);
    } catch (error) {
      console.error("Error searching for album:", error);
      setSearchResults(null);
    }
  };

  return (
        
    <div className="relative mt-12 min-h-screen bg-gray-300 w-full p-6">
      {/* Title*/}
        <div className='flex flex-col p-10 pt-0 gap-5 w-full max-w-7xl mx-auto'>
          <h1 className='text-[32px] md:text-[80px] font-bold text-center text-neutral-900 leading-[1.38] md:leading-[88px]'>
          <span>My </span><span className='text-blue-600'>Albums</span>
          </h1>
          <div className='relative w-full max-w-7xl h-[7px] bg-gray-400'>
        </div>

        {/* Buttons For Creating and Searching Albums */}
        <div className="w-full px-4">
          <div className="relative flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
            {/* Create Album Button */}
            <button
              onClick={() => setCreateAlbumModal(true)}
              className="bg-gray-100 w-36 h-10 text-black p-2 rounded-xl shadow-md hover:bg-gray-300"
            >
              Create Album
            </button>

            {/* Search Bar */}
            <form onSubmit={handleSearchAlbum}> 
              <div className="relative flex items-center w-full max-w-[390px]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by album name"
                  className="border p-2 w-full sm:w-72 md:w-96 lg:w-[390px] rounded-xl shadow-xl"
                />
                <button
                  type="submit" // Fix: Ensure button submits the form
                  className="absolute right-1 top-5 h-9 bg-transparent transform -translate-y-1/2 flex items-center justify-center text-black hover:text-gray-500"
                >
                  <MdSearch />
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gray-200 rounded-xl">
          {/* Display Search Results */}
          {searchResults ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
                  {/* Back Arrow Button */}
                  <button
                    onClick={() => setSearchResults(null)} // Reset search results on click
                    className="absolute ml-5 mt-2 p-2 bg-transparent rounded-xl transition"
                  >
                    <FaArrowLeftLong className="text-xl text-black hover:text-gray-500" />
                  </button>
                  <div
                    key={searchResults.albumId}
                    className="relative mt-14 flex flex-col items-center justify-center p-6 bg-transparent rounded-xl cursor-pointer group transition-transform duration-500 hover:scale-110"
                    onContextMenu={(e) => handleRightClick(e, album)}
                    onClick={() => handleAlbumClick(searchResults.albumId)}
                    >
                      {/* Glass Effect on Hover */}
                      <div
                        className="relative w-[280px] h-[360px] flex justify-center items-center rounded-xl bg-transparent group-hover:bg-white group-hover:bg-opacity-10 group-hover:backdrop-blur-lg group-hover:shadow-lg transition-all duration-500"
                        style={{
                          perspective: "1000px", // Ensure 3D perspective for better hover effects
                        }}
                      >
                        {/* First image (front) */}
                        {searchResults.photos?.[0] && (
                          <img
                            src={searchResults.photos[0].photoUrl}
                            alt="Front Photo"
                            className="absolute w-4/5 h-4/5 object-cover rounded-lg z-20 transition-transform duration-300 group-hover:scale-110"
                            style={{
                              boxShadow: "0 15px 25px rgba(0, 0, 0, 0.3)",
                            }}
                          />
                        )}

                        {/* Second image (left) */}
                        {searchResults.photos?.[1] && (
                          <img
                            src={searchResults.photos[1].photoUrl}
                            alt="Left Photo"
                            className="absolute w-3/5 h-4/5 object-cover rounded-lg z-10 transition-transform duration-500 transform -translate-x-12 opacity-0 group-hover:opacity-100 group-hover:-translate-x-20"
                            style={{
                              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        )}

                        {/* Third image (right) */}
                        {searchResults.photos?.[2] && (
                          <img
                            src={searchResults.photos[2].photoUrl}
                            alt="Right Photo"
                            className="absolute w-3/5 h-4/5 object-cover rounded-lg z-10 transition-transform duration-500 transform translate-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-20"
                            style={{
                              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        )}
                      </div>

                      {/* Album Name with Hover Effect */}
                      <h3 className="absolute bg-white bg-opacity-20 backdrop-blur-md px-5 py-2 rounded-lg text-center text-black font-semibold shadow-md bottom-[-25px] w-[240px] group-hover:shadow-xl">
                        {searchResults.albumName}
                      </h3>
                    </div>
                  </div>  
          ) : (
            <>
              {/* Display Albums */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {albums.length > 0 ? (
                  albums.map((album) => (
                    <div
                    key={album.albumId}
                    className="relative flex flex-col items-center justify-center p-6 bg-transparent rounded-xl cursor-pointer group transition-transform duration-500 hover:scale-110"
                    onContextMenu={(e) => handleRightClick(e, album)}
                    onClick={() => handleAlbumClick(album.albumId)}
                    >
                      {/* Glass Effect on Hover */}
                      <div
                        className="relative w-[280px] h-[360px] flex justify-center items-center rounded-xl bg-transparent group-hover:bg-white group-hover:bg-opacity-10 group-hover:backdrop-blur-lg group-hover:shadow-lg transition-all duration-500"
                        style={{
                          perspective: "1000px", // Ensure 3D perspective for better hover effects
                        }}
                      >
                        {/* First image (front) */}
                        {album.photos?.[0] && (
                          <img
                            src={album.photos[0].photoUrl}
                            alt="Front Photo"
                            className="absolute w-4/5 h-4/5 object-cover rounded-lg z-20 transition-transform duration-300 group-hover:scale-110"
                            style={{
                              boxShadow: "0 15px 25px rgba(0, 0, 0, 0.3)",
                            }}
                          />
                        )}

                        {/* Second image (left) */}
                        {album.photos?.[1] && (
                          <img
                            src={album.photos[1].photoUrl}
                            alt="Left Photo"
                            className="absolute w-3/5 h-4/5 object-cover rounded-lg z-10 transition-transform duration-500 transform -translate-x-12 opacity-0 group-hover:opacity-100 group-hover:-translate-x-20"
                            style={{
                              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        )}

                        {/* Third image (right) */}
                        {album.photos?.[2] && (
                          <img
                            src={album.photos[2].photoUrl}
                            alt="Right Photo"
                            className="absolute w-3/5 h-4/5 object-cover rounded-lg z-10 transition-transform duration-500 transform translate-x-12 opacity-0 group-hover:opacity-100 group-hover:translate-x-20"
                            style={{
                              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        )}
                      </div>

                      {/* Album Name with Hover Effect */}
                      <h3 className="absolute bg-white bg-opacity-20 backdrop-blur-md px-5 py-2 rounded-lg text-center text-black font-semibold shadow-md bottom-[-25px] w-[240px] group-hover:shadow-xl">
                        {album.albumName}
                      </h3>
                    </div>  
                  ))
                ) : (
                  <p>No albums found</p>
                )}
              </div>
            </>
          )}
          </div>
        </div>
      </div>
      {/* Context Menu */}
      {contextMenu && (
        <div
          className="absolute border shadow-lg rounded-lg p-2 context-menu 
               transition-all duration-200 transform scale-95 opacity-100 "
          style={{ top: contextMenu.y, left: contextMenu.x , minWidth: "150px"  }}
        >
          <button
            className="block w-full mb-1 shadow-lg bg-gray-300 rounded-md font-bold text-left px-4 py-2 text-black font-medium 
                 hover:bg-gray-100 rounded-md transition-all duration-200"
            onClick={() => setRenameModal(true)}
          >
            ✏️ Rename
          </button>
          <button
            className="block w-full text-left bg-gray-300 rounded-md font-bold  shadow-lg px-4 py-2 text-red-600 font-medium 
                 hover:bg-red-100 rounded-md transition-all duration-200"
            onClick={handleDeleteAlbum}
          >
            🗑 Delete
          </button>
        </div>
      )}

      {/* Rename Modal */}
      {renameModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 pt-0 rounded-lg text-center ">
            <h2 className="text-lg shadow-xl font-semibold mb-8 ">Rename Album</h2>
            <input
              type="text"
              className="border p-2 w-full shadow-xl rounded-xl"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              placeholder="Enter new album name"
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-xl shadow-md mr-2 hover:bg-teal-600"
                onClick={handleRenameAlbum}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-black px-4 py-2 rounded-xl shadow-md hover:bg-red-600"
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
          <div className="bg-white shadow-xl  p-6 pt-0 rounded-lg text-center">
            <h2 className="text-lg shadow-xl font-semibold mb-8">Create New Album</h2>
            <input
              type="text"
              className="border p-2 w-full rounded-xl shadow-xl"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              placeholder="Enter album name"
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-xl shadow-md mr-2 hover:bg-teal-600"
                onClick={handleCreateAlbum}
              >
                Create
              </button>
              <button
                className="bg-red-500 text-black px-4 py-2 rounded-xl shadow-md hover:bg-red-600"
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
