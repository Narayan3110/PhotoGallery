import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import albumService from '../services/albumService';
import { RiCloseCircleLine } from 'react-icons/ri';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MdFileDownload } from 'react-icons/md';

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
  const [albumName, setAlbumName] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

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
          // console.log('Actual data received:', data);
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
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Please select a file to upload',
        });
        return;
      }

      setLoading(true);
      const publicId = await albumService.uploadPhotoToAlbum(
        profileId,
        file,
        albumDetails.albumName
      );
      setLoading(false);
      toast({
        title: 'Success',
        description: 'Photo uploaded successfully',
      });
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
      toast({
        variant: 'destructive',
        title: 'Size Too big !',
        description: 'Error uploading photo upload !',
      });
    } finally {
      setLoading(false);
    }
  };
  const downloadImage = async () => {
    if (!selectedPhoto) return;

    try {
      const response = await fetch(selectedPhoto);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = selectedPublicId || 'downloaded_image'; // Default name if publicId is not provided
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast({
        // title: 'Success ',
        description: 'Photo Downloaded successfully 🎉',
      });
    } catch (error) {
      console.error('Error downloading image:', error);
      toast({
        variant: 'destructive',
        title: 'Try Again !',
        description: 'Something Went Wrong !',
      });
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
          <div className='flex justify-center items-center gap-4 p-2 '>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 '
            />
            {/* To upload From Device  */}
            <Button onClick={handleUploadPhoto} disabled={loading}>
              {loading ? <Loader2 className='animate-spin mr-2' /> : null}
              {loading ? 'Please wait' : 'Upload Photo'}
            </Button>
            {/* button to add from gallery */}
            <Button onClick={handleAddPhotosClick} variant='outline'>
              Select from gallery
            </Button>
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
                <Button variant='secondary' onClick={downloadImage}>
                  <MdFileDownload />
                  Downlaod
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
