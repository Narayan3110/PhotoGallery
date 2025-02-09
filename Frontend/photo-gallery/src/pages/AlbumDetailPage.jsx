import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import albumService from '../services/albumService';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { RiCloseCircleLine } from 'react-icons/ri';

const AlbumDetailPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [albumDetails, setAlbumDetails] = useState({
    albumName: '',
    createdAt: '',
    photos: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedPublicId, setSelectedPublicId] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAlbumPhotos = async () => {
      try {
        const data = await albumService.getAlbumPhotos(albumId);
        if (data && Array.isArray(data.photos)) {
          setAlbumDetails({
            albumName: data.albumName,
            createdAt: data.createdAt,
            photos: data.photos,
          });
        } else {
          console.error(
            'Invalid data format: photos is not an array or is missing.'
          );
          console.log('Actual data received:', data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch album photos', error);
        setLoading(false);
      }
    };

    fetchAlbumPhotos();
  }, [albumId]);

  const handleAddPhotosClick = () => {
    navigate('/gallery', { state: { albumId } });
  };

  const handlePhotoClick = (photoUrl, publicId) => {
    setSelectedPhoto(photoUrl);
    setSelectedPublicId(publicId);
  };

  const handleRemovePhoto = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const profileId = storedUser?.userProfile?.profileId;

      if (!profileId) {
        console.error('Profile ID not found in local storage.');
        return;
      }

      await albumService.removePhotoFromAlbum(
        albumDetails.albumName,
        profileId,
        selectedPublicId
      );

      setAlbumDetails((prevDetails) => ({
        ...prevDetails,
        photos: prevDetails.photos.filter(
          (photo) => photo.publicId !== selectedPublicId
        ),
      }));

      setSelectedPhoto(null);
      setSelectedPublicId(null);
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadPhoto = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const profileId = storedUser?.userProfile?.profileId;

      if (!profileId || !file) {
        console.error('Profile ID or file is missing.');
        return;
      }

      const publicId = await albumService.uploadPhotoToAlbum(
        profileId,
        file,
        albumDetails.albumName
      );

      setAlbumDetails((prevDetails) => ({
        ...prevDetails,
        photos: [
          ...prevDetails.photos,
          { photoUrl: URL.createObjectURL(file), publicId },
        ],
      }));

      setFile(null);
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div className='flex'>
      <div className='min-h-screen flex flex-col items-center justify-center text-white p-6 w-full'>
        {/* <div className='gap-2'>
          <h2>{albumDetails.albumName}</h2>
          <h2>{albumDetails.createdAt}</h2>
        </div> */}
        <div className='w-full bg-white rounded-lg text-gray-800 mb-0'>
          <div className='flex justify-center items-center gap-4 p-2'>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500'
            />
            <button
              onClick={handleUploadPhoto}
              className='rounded-full bg-purple-600 px-6 py-2 text-white hover:bg-purple-500'
            >
              <AiOutlineCloudUpload className='size-6' />
            </button>
          </div>
          <div className='mt-8 text-xl text-center text-red-600'>{message}</div>
        </div>
        <div className='w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'>
          {albumDetails.photos.length === 0 ? (
            <p className='col-span-full text-center text-lg text-gray-200'>
              No photos available.
            </p>
          ) : (
            albumDetails.photos.map((photo, index) => (
              <div
                key={photo.publicId}
                className='relative mb-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden group'
                onClick={() => handlePhotoClick(photo.photoUrl, photo.publicId)}
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
          <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50'>
            <div className='relative max-w-4xl max-h-[90vh] p-4 rounded-lg text-black'>
              <button
                onClick={() => setSelectedPhoto(null)}
                className='absolute top-4 right-4 text-black text-3xl p-2 transition duration-150 ease-in-out'
              >
                <RiCloseCircleLine className='text-white opacity-70' />
              </button>
              <img
                src={selectedPhoto}
                alt='Selected Photo'
                className='w-full h-auto rounded-lg object-contain'
              />
              <div className='absolute bottom-4 right-4 flex gap-4'>
                <button
                  onClick={handleRemovePhoto}
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

export default AlbumDetailPage;
