import React, { useState, useEffect } from 'react';
import {
  uploadPhoto,
  fetchPhotos,
  deletePhoto,
} from '../services/photoService';
import { updateUserProfile } from '@/services/profileUpdateService';
import albumService from '../services/albumService';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaUpload } from 'react-icons/fa6';
// import { AiOutlineCloudUpload } from 'react-icons/ai';
import { GoSortAsc } from 'react-icons/go';
import { GoSortDesc } from 'react-icons/go';
import { RiCloseCircleLine } from 'react-icons/ri';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MdFileDownload } from 'react-icons/md';
const GalleryPage = () => {
  const [photos, setPhotos] = useState([]);
  // const [message, setMessage] = useState('');
  const [hoverText, setHoverText] = useState('');
  const [order, setOrder] = useState('desc');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const [albums, setAlbums] = useState([]); // Store available albums
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [showAlbumDropdown, setShowAlbumDropdown] = useState(false); // Control visibility of the album dropdown
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // Track the current photo index
  const navigate = useNavigate();
  const location = useLocation();
  const isProfileEditing = location.state || false;
  const dispatch = useDispatch();
  const { toast } = useToast();

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
      const user = JSON.parse(localStorage.getItem('user'));
      const profileId = user?.userProfile?.profileId;

      if (!profileId) {
        // setMessage('Profile ID not found.');
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Profile ID not found',
        });
        return;
      }

      const photosData = await fetchPhotos(profileId, order);
      setPhotos(photosData === 'No Photos To Display' ? [] : photosData);
      setCurrentPhotoIndex(0);
    } catch (error) {
      // setMessage('Error fetching photos.');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Profile ID not found',
      });
      console.error('Error fetching photos:', error);
    }
  };

  const toggleSortOrder = () => {
    setOrder((prevOrder) => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  const fetchAlbums = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const profileId = user?.userProfile?.profileId;

      if (!profileId) {
        // setMessage('Profile ID not found.');
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Profile ID not found',
        });
        return;
      }

      const albumsData = await albumService.getAllAlbums(profileId);
      setAlbums(albumsData);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      // setMessage('Please select a file to upload.');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select a file to upload',
      });

      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const profileId = user?.userProfile?.profileId;
      if (!profileId) {
        // setMessage('Profile ID not found.');
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Profile ID not found',
        });

        return;
      }

      setLoading(true);
      const formData = new FormData();
      formData.append('profile_id', profileId);
      formData.append('photo', file);

      const response = await uploadPhoto(formData);
      if (response) {
        // setMessage('Photo uploaded successfully!');
        toast({
          title: 'Success',
          description: 'Photo uploaded successfully',
        });

        fetchUserPhotos();
      } else {
        // setMessage('Failed to upload photo.');
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to upload photo',
        });
      }
      setLoading(false);
    } catch (error) {
      // setMessage('Error uploading photo.');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error uploading photo ',
      });
      console.error('Error uploading photo:', error);
      // setLoading(false);
    } finally {
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

  const downloadImage = async () => {
    if (!selectedPhoto) return;

    try {
      const response = await fetch(selectedPhoto);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = selectedPhotoId || 'downloaded_image'; // Default name if publicId is not provided
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleDeletePhoto = async () => {
    // console.log('Selected photo id :' + selectedPhotoId);
    try {
      const response = await deletePhoto(selectedPhotoId);
      if (response) {
        // setMessage('Photo deleted successfully!');
        toast({
          title: 'Success',
          description: 'Photo deleted successfully 🗑️',
        });

        fetchUserPhotos();
        closeModal();
      } else {
        // setMessage('Failed to delete photo.');
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete photo ',
        });
      }
    } catch (error) {
      // setMessage('Error deleting photo.');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error deleting photo',
      });

      console.error('Error deleting photo:', error);
    }
  };

  const handleUploadToAlbum = () => {
    setShowAlbumDropdown(true); // Show the album dropdown when clicked
  };

  const handleAddToAlbum = async () => {
    if (!selectedAlbumId || !selectedPhotoId) {
      // setMessage('Please select an album.');
      toast({
        title: 'Error',
        description: 'Please select an album',
        variant: 'destructive',
      });
      return;
    }

    try {
      await albumService.addPhotoToAlbum(selectedAlbumId, selectedPhotoId);
      // setMessage('Photo added to album successfully!');
      toast({
        title: 'Success',
        description: 'Photo added to album successfully 📸',
        variant: 'success',
      });
      // console.log('Selected' + selectedAlbumId);
      navigate(`/album/${selectedAlbumId}`); // Redirect to album details page
      setShowAlbumDropdown(false); // Hide the dropdown after adding
    } catch (error) {
      // setMessage('Error adding photo to album.');
      toast({
        title: 'Error',
        description: 'Error adding photo to album ! Try Again ',
        variant: 'destructive',
      });

      console.error('Error adding photo to album:', error);
    }
  };

  // updated Profile Picture
  const handleAddtoProfilePicture = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const profileId = user?.userProfile?.profileId;
    // updated Data to send
    const updatedUserData = {
      profileUrl: selectedPhoto,
    };
    // setMessage('');

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
      // setMessage('Error during updating Profile Picture. Please try again.');
      toast({
        title: 'Error',
        description: 'Error during updating Profile Picture. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  const handlePreviousPhoto = () => {
    // Logic to show the previous photo
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : photos.length - 1
    );
    setSelectedPhoto(
      photos[currentPhotoIndex - 1]?.photoUrl ||
        photos[photos.length - 1]?.photoUrl
    );
    setSelectedPhotoId(
      photos[currentPhotoIndex - 1]?.publicId ||
        photos[photos.length - 1]?.publicId
    );
  };

  const handleNextPhoto = () => {
    // Logic to show the next photo
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex < photos.length - 1 ? prevIndex + 1 : 0
    );
    setSelectedPhoto(
      photos[currentPhotoIndex + 1]?.photoUrl || photos[0]?.photoUrl
    );
    setSelectedPhotoId(
      photos[currentPhotoIndex + 1]?.publicId || photos[0]?.publicId
    );
  };

  return (
    <div className='flex '>
      <div className='min-h-screen flex flex-col items-center justify-center text-white p-6 w-full '>
        <div className='w-full bg-white rounded-lg text-gray-800 mb-0'>
          {Boolean(isProfileEditing) ? (
            <h2 className='flex flex-row items-center justify-center text-xl font-semibold text-center mb-4 gap-4 '>
              Upload New Photo
              <FaUpload className='size-6 text-blue-600  ' />
            </h2>
          ) : (
            <h2 className='flex flex-row items-center justify-center text-xl font-semibold text-center mb-4 gap-4 text-center pt-10'></h2>
          )}
          <div className='flex justify-center items-center gap-4 p-2 '>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 '
            />
            <Button onClick={handleFileUpload} disabled={loading}>
              {loading ? <Loader2 className='animate-spin mr-2' /> : null}
              {loading ? 'Please wait' : 'Upload Photo'}
            </Button>
          </div>
          <div className='flex align-right'>
            <button
              onClick={toggleSortOrder}
              onMouseEnter={() =>
                setHoverText(
                  order === 'desc' ? 'Sort by Antique' : 'Sort by Latest'
                )
              }
              onMouseLeave={() => setHoverText('')}
              className='bg-transparent hover:bg-gray-100 m-2 p-2 rounded-lg shadow'
            >
              {order === 'desc' ? (
                <GoSortDesc className='size-7' />
              ) : (
                <GoSortAsc className='size-7' />
              )}
            </button>
            {hoverText && (
              <span className='absolute left-16 m-4 w-32 bg-gray-800 text-white text-sm px-2 py-1 rounded'>
                {hoverText}
              </span>
            )}
          </div>
          {/* <div className='mt-8 text-xl text-center text-red-600'>{message}</div> */}
        </div>
        {/* {Photo Section} */}
        <div className='w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'>
          {photos.length === 0 ? (
            <p className='col-span-full text-center text-lg text-gray-200'>
              No photos available.
            </p>
          ) : (
            photos.map((photo, index) => (
              <div
                key={photo.publicId}
                className='relative mb-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden group'
                onClick={() => openModal(photo.photoUrl, photo.publicId)}
              >
                <img
                  src={photo.photoUrl}
                  alt={`Photo ${index + 1}`}
                  className='w-full h-auto rounded-lg transition-opacity duration-300 group-hover:opacity-90'
                />
              </div>
            ))
          )}
        </div>
        {selectedPhoto && (
          <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 '>
            <div className='relative max-w-4xl max-h-[90vh] p-4 rounded-lg text-black '>
              <button
                onClick={closeModal}
                className='absolute top-4 right-4 text-black text-3xl p-2 transition duration-150 ease-in-out  '
              >
                <RiCloseCircleLine className='text-white opacity-70 ' />
              </button>
              <div className='flex items-center justify-between'>
                <button onClick={handlePreviousPhoto}>
                  <ArrowLeft className='bg-white rounded-lg opacity-60' />
                  <span className='sr-only'>Previous Image</span>
                </button>
                <img
                  src={selectedPhoto}
                  alt='Selected Photo'
                  className='w-full h-auto rounded-lg object-contain mx-4'
                />
                <button onClick={handleNextPhoto}>
                  <ArrowRight className='bg-white rounded-lg opacity-60' />
                  <span className='sr-only'>Next slide</span>
                </button>
              </div>
              {showAlbumDropdown && (
                <div className='absolute top-4 left-4 bg-white text-black shadow-lg p-4 rounded-lg w-72 object-contain'>
                  <h3 className='text-lg font-semibold mb-4'>Select Album</h3>
                  <select
                    value={selectedAlbumId}
                    onChange={(e) => setSelectedAlbumId(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded-lg'
                  >
                    <option value=''>Select an album</option>
                    {albums.map((album) => (
                      <option key={album.albumId} value={album.albumId}>
                        {album.albumName}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddToAlbum}
                    className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-4 w-full'
                  >
                    Add to Album
                  </button>
                </div>
              )}
              <div className='absolute bottom-4 right-4 flex gap-4'>
                {isProfileEditing && (
                  <button
                    onClick={handleAddtoProfilePicture}
                    className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700'
                  >
                    Add to Profile Photo
                  </button>
                )}
                <button
                  onClick={handleUploadToAlbum}
                  className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700'
                >
                  Upload to Album
                </button>
                <Button  variant="secondary" onClick={downloadImage}>
                  <MdFileDownload  />Downlaod
                </Button>
                <button
                  onClick={handleDeletePhoto}
                  className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700'
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
