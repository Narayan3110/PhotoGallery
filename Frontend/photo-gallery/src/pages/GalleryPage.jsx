import React, { useState, useEffect } from "react";
import {
  uploadPhoto,
  fetchPhotos,
  deletePhoto,
// <<<<<<< narayan
} from '../services/photoService';
import { updateUserProfile } from '@/services/profileUpdateService';
import albumService from '../services/albumService';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUpload } from 'react-icons/fa6';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FaSort } from 'react-icons/fa';
import { RiCloseCircleLine } from "react-icons/ri";
// =======
// } from "../services/photoService";
// import { updateUserProfile } from "@/services/profileUpdateService";
// import albumService from "../services/albumService";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { FaUpload } from "react-icons/fa6";
// import { AiOutlineCloudUpload } from "react-icons/ai";
// import { FaSort } from "react-icons/fa";
// >>>>>>> master

const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState("");
  const [hoverText, setHoverText] = useState("");
  const [order, setOrder] = useState("desc");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [albums, setAlbums] = useState([]); // Store available albums
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [showAlbumDropdown, setShowAlbumDropdown] = useState(false); // Control visibility of the album dropdown
  const navigate = useNavigate();
  const location = useLocation();
  const isProfileEditing = location.state || false;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserPhotos();
    fetchAlbums(); // Load albums when the page loads
  }, []);

  //
  useEffect(() => {
    fetchUserPhotos();
  }, [order]); // Fetch photos whenever order changes

  const fetchUserPhotos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const profileId = user?.userProfile?.profileId;

      if (!profileId) {
        setMessage("Profile ID not found.");
        return;
      }

      const photosData = await fetchPhotos(profileId, order);
      setPhotos(photosData === "No Photos To Display" ? [] : photosData);
    } catch (error) {
      setMessage("Error fetching photos.");
      console.error("Error fetching photos:", error);
    }
  };

  const toggleSortOrder = () => {
    setOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
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
    console.log("Selected photo id :" + selectedPhotoId);
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

  // updated Profile Picture
  const handleAddtoProfilePicture = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const profileId = user?.userProfile?.profileId;
    // updated Data to send
    const updatedUserData = {
      profileUrl: selectedPhoto,
    };
    setMessage("");
    setLoading(true);
    try {
      const response = await updateUserProfile(
        profileId,
        updatedUserData,
        dispatch
      );
      alert(response);
      navigate(`/profile`);
    } catch (error) {
      setMessage("Error during updating Profile Picture. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
// <<<<<<< narayan
    <div className='flex '>
      <div className='min-h-screen flex flex-col items-center justify-center text-white p-6 w-full '>
        <div className='w-full  bg-white  rounded-lg text-gray-800 mb-0'>
          {Boolean(isProfileEditing) ? (
            <h2 className='flex flex-row items-center justify-center text-xl font-semibold text-center mb-4 gap-4 '>
              Upload New Photo <FaUpload className='size-6 text-blue-600  ' />
            </h2>
          ) : (
            <h2 className='flex flex-row items-center justify-center text-xl font-semibold text-center mb-4 gap-4  text-center  pt-10'>
             
            </h2>
          )}
          <div className='flex justify-center items-center gap-4 p-2 '>
// =======
//     <div className="flex ">
//       <div className="  min-h-screen flex flex-col items-center justify-center text-white p-6 w-full ">
//         <div className="    w-full max-w-6xl bg-white p-6 rounded-lg text-gray-800 mb-0">
//           {Boolean(isProfileEditing) ? (
//             <h2 className="flex flex-row items-center justify-center text-xl font-semibold text-center mb-4 gap-4 ">
//               Upload New Photo <FaUpload className="size-6 text-blue-600 " />
//             </h2>
//           ) : (
//             <h2 className="text-xl font-semibold text-center mb-4 pt-5">
//               Upload New Photo
//             </h2>
//           )}
//           <div className="flex justify-center items-center gap-4">
// >>>>>>> master
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 "
            />
            <button
              onClick={handleFileUpload}
// <<<<<<< narayan
              className='rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-500'
            >
              <AiOutlineCloudUpload className=' size-6' />
            </button>
          </div>
          <div className='flex align-right'>
            <button className='bg-white hover:bg-gray-100  '>
              <FaSort className='text-blue-600 size-10' />
            </button>
          </div>
          <div className='mt-8 text-xl text-center text-red-600'>{message}</div>
        </div>
        {/* {Photo Section} */}
        <div className='  w-full  columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'>
// =======
//               className="bg-white text-white p-2 rounded-lg  bg-white"
//               disabled={loading}
//             >
//               <AiOutlineCloudUpload className="text-violet-600 size-10" />
//             </button>
//           </div>
//           <div className="relative flex items-center">
//             <button
//               onClick={toggleSortOrder}
//               onMouseEnter={() =>
//                 setHoverText(
//                   order === "desc" ? "Sort by Antique" : "Sort by Latest"
//                 )
//               }
//               onMouseLeave={() => setHoverText("")}
//               className="bg-white hover:bg-gray-100 p-2 rounded-lg shadow"
//             >
//               <FaSort className="text-blue-600 size-10" />
//             </button>
//             {hoverText && (
//               <span className="absolute left-12 ml-2 bg-gray-800 text-white text-sm px-2 py-1 rounded">
//                 {hoverText}
//               </span>
//             )}
//           </div>
//         </div>

//         {message && (
//           <p className="mt-6 text-xl text-center text-yellow-200">{message}</p>
//         )}

//         <div className=" w-full max-w-6xl columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
// >>>>>>> master
          {photos.length === 0 ? (
            <p className="col-span-full text-center text-lg text-gray-200">
              No photos available.
            </p>
          ) : (
            photos.map((photo, index) => (
              <div
                key={photo.publicId}
                className="relative mb-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden group"
                onClick={() => openModal(photo.photoUrl, photo.publicId)}
              >
                <img
                  src={photo.photoUrl}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-auto rounded-lg transition-opacity duration-300 group-hover:opacity-90"
                />
              </div>
            ))
          )}
        </div>
        {selectedPhoto && (
//<<<<<<< narayan
          <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 '>
            <div className='relative max-w-4xl max-h-[90vh] p-4 rounded-lg text-black '>
              <button
                onClick={closeModal}
                className='absolute top-4 right-4 text-black text-3xl p-2 transition duration-150 ease-in-out  '
//  =======
//           <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
//             <div className="relative max-w-4xl max-h-[90vh] p-4 rounded-lg shadow-2xl text-black">
//               <button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 text-black text-3xl p-2 rounded-full"
// >>>>>>> master
              >
                <RiCloseCircleLine className='text-white opacity-70 '/>
              </button>
              <img
                src={selectedPhoto}
// <<<<<<< narayan
                alt='Selected Photo'
                className='w-full h-auto rounded-lg object-contain'
              />
              {showAlbumDropdown && (
                <div className='absolute top-4 left-4 bg-white text-black shadow-lg p-4 rounded-lg w-72 object-contain'>
                  <h3 className='text-lg font-semibold mb-4'>Select Album</h3>


//                 alt="Selected Photo"
//                 className="w-full h-auto rounded-lg"
//               />
//               {showAlbumDropdown && (
//                 <div className="absolute top-4 left-4 bg-white text-black shadow-lg p-4 rounded-lg w-72">
//                   <h3 className="text-lg font-semibold mb-4">Select Album</h3>
// >>>>>>> master
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
                {isProfileEditing && (
                  <button
                    onClick={handleAddtoProfilePicture}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Add to Profile Photo
                  </button>
                )}
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
