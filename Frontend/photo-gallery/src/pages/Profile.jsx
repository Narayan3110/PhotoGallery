import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '@/services/profileUpdateService';
import { RiCameraAiFill } from 'react-icons/ri';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthService from '@/services/authTest';
// <<<<<<< narayan
// import { Verified } from 'lucide-react';
// =======
// >>>>>>> master

const Profile = () => {
  const userData = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reseterrorMessage, setResetErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('profile'); // "profile" or "resetPassword"
  const [showPassword, setShowPassword] = useState(false);
  const [userVerified, setUserVerified] = useState('');
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const addressParts =
    userData?.userProfile?.address?.split(',').map((part) => part.trim()) || [];

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  // Use To Navigate Pages
  const navigate = useNavigate();

  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  // Format date to a readable format
  const formatDate = (isoString) => {
    return isoString
      ? new Date(isoString).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : '';
  };

  const formatDOB = (isoString) => {
    return isoString
      ? new Date(isoString).toLocaleString('en-US', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        })
      : '';
  };

  // Initialize state with user data
  const [formData, setFormData] = useState({
    userName: userData?.userName || '',
    email: userData?.email || '',
    updatedDate: formatDate(userData?.updatedDate),
    phoneNumber: userData?.userProfile?.contact || '', // Display contact as phone number
    name: userData?.userProfile?.fullName?.split(' ')[0] || '', // First Name
    surname: userData?.userProfile?.fullName?.split(' ')[1] || '', // Surname
    city: addressParts[0] || '',
    state: addressParts[1] || '',
    country: addressParts[2] || '',
    dob: userData?.userProfile?.dob || '', // Date of Birth
  });

  // State for Reset Password form
  const [resetData, setResetData] = useState({
    email: userData?.email,
    password: '',
  });

  // Handle input change for both forms
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (activeTab === 'profile') {
      setFormData({ ...formData, [name]: value });
    } else {
      setResetData({ ...resetData, [name]: value });
    }
  };

  // Handle form submission Profile Update
  const handleSubmit = async (e, removeProfile) => {
    e.preventDefault();

    // Merge full name and address before sending
    const fullName = `${formData.name} ${formData.surname}`;

    // Reassemble the address while ensuring no trailing commas
    const address = [formData.city, formData.state, formData.country].join(
      ', '
    ); // updated Data to send
    const updatedUserData = {
      fullName,
      address,
      contact: formData.phoneNumber,
      dob: formData.dob, // Send updated DOB
      removeProfile,
    };
    setErrorMessage('');
    setIsLoading(true);
    try {
      const response = await updateUserProfile(
        userData.userProfile?.profileId,
        updatedUserData,
        dispatch
      );
      alert(response);
    } catch (error) {
      setErrorMessage('Error during updating. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  // Handle Reset Password Form Submission
  const handleResetSubmit = async (e) => {
    e.preventDefault();

    const usernameOrEmail = resetData.email;
    const password = resetData.password;
    setResetErrorMessage('');
    setIsLoading(true);
    try {
      setUserVerified(
        await AuthService.loginUser(usernameOrEmail, password, dispatch)
      );
    } catch (err) {
      console.error('Login failed:', err);
      setResetErrorMessage('Invalid Credentials');
    } finally {
      setIsLoading(false);
    }
  };
  // Handle ProfileChangeButton
  const handleAddProfilePic = () => {
    navigate('/gallery', {
      state: {
        isProfileEditing: true,
      },
    });
  };

  const handleDeleteProfilePicture = () => {
    handleSubmit({ preventDefault: () => {} }, true); // Pass 'true' for removeProfile directly
  };

  // Default Profile picture
  const defaultProfilePic = 'src/assets/photos/profilePage/Default Profile.png';
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Profile Header */}
        <div className='relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
          <div className='h-48 bg-gradient-to-r from-blue-50 to-indigo-50 relative'>
            <div className='absolute -bottom-16 left-8'>
              <div className='relative group'>
                <img
                  src={userData.userProfile?.profileUrl || defaultProfilePic}
                  alt='Profile'
                  className='w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover'
                />
                <div
                  className='absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                  onClick={toggleProfileOptions}
                >
                  <RiCameraAiFill className='text-white text-2xl' />
                </div>
                {/* Profile Options Dropdown */}
                {showProfileOptions && (
                  <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg py-2 w-40 border border-gray-100'>
                    <button
                      onClick={handleAddProfilePic}
                      className='w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors text-left'
                    >
                      Change Photo
                    </button>
                    <button
                      onClick={handleDeleteProfilePicture}
                      className='w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors text-left'
                    >
                      Remove Photo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className='pt-20 pb-6 px-8'>
            <h1 className='text-2xl font-bold text-gray-900 mb-1'>
              {userData.userProfile?.fullName || userData.userName}
            </h1>
            <p className='text-gray-600 text-sm'>
              Member since {formatDate(userData.createdDate)}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className='mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Navigation Sidebar */}
          <div className='lg:col-span-1'>
            <nav className='space-y-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full px-4 py-3 text-left rounded-md transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab('resetPassword')}
                className={`w-full px-4 py-3 text-left rounded-md transition-colors ${
                  activeTab === 'resetPassword'
                    ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Password & Security
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className='lg:col-span-3'>
            {activeTab === 'profile' ? (
              <form
                onSubmit={handleSubmit}
                className='bg-white rounded-lg shadow-sm border border-gray-200 p-8'
              >
                <div className='pb-6 mb-8 border-b border-gray-200'>
                  <h2 className='text-xl font-semibold text-gray-900'>
                    Edit Profile
                  </h2>
                  <p className='mt-1 text-sm text-gray-500'>
                    Last updated {formData.updatedDate}
                  </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* UserName (ReadOnly) */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Username
                    </label>
                    <input
                      type='text'
                      name='userName'
                      value={formData.userName}
                      className='w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600'
                      readOnly
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email Address
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600'
                      placeholder='Email'
                      readOnly
                    />
                  </div>
                  {/* Name */}
                  <div className='space-y-2'>
                    <label className='block '>Name</label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='p-3 border rounded-lg'
                      placeholder='Name'
                    />
                  </div>
                  {/* Phone Number */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      name='phoneNumber'
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className='p-3 border rounded-lg'
                      placeholder='Phone Number'
                    />
                  </div>
                  {/* Surname */}
                  <div className='space-y-2'>
                    <label className='block '>Surname</label>
                    <input
                      type='text'
                      name='surname'
                      value={formData.surname}
                      onChange={handleChange}
                      className='p-3 border rounded-lg'
                      placeholder='Surname'
                    />
                  </div>

                  {/* Address */}
                  <div className='space-y-2'>
                    <label className='block '>City</label>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleChange}
                      className='p-3 border rounded-lg'
                      placeholder='City'
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className='space-y-2'>
                    <label className='block '>Date of Birth</label>
                    <input
                      type='date'
                      name='dob'
                      value={formData.dob}
                      onChange={handleChange}
                      className='p-3 border rounded-lg'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label className='block '>State</label>
                    <input
                      type='text'
                      name='state'
                      value={formData.state}
                      onChange={handleChange}
                      className='p-3 border rounded-lg'
                      placeholder='State'
                    />
                  </div>
                  <div></div>
                  <div className='space-y-2'>
                    <label className='block '>Country</label>
                    <input
                      type='text'
                      name='country'
                      value={formData.country}
                      onChange={handleChange}
                      className='p-3 border rounded-lg'
                      placeholder='Country'
                    />
                  </div>

                  {errorMessage && (
                    <div className='md:col-span-2 p-4 bg-red-50 border border-red-200 rounded-lg'>
                      <p className='text-sm text-red-600'>{errorMessage}</p>
                    </div>
                  )}

                  <div className='md:col-span-2 pt-6'>
                    <button
                      type='submit'
                      disabled={isLoading}
                      className='w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50'
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form
                onSubmit={handleResetSubmit}
                className='bg-white rounded-lg shadow-sm border border-gray-200 p-8'
              >
                <div className='pb-6 mb-8 border-b border-gray-200'>
                  <h2 className='text-xl font-semibold text-gray-900'>
                    Change Password
                  </h2>
                  <p className='mt-1 text-sm text-gray-500'>
                    Secure your account with a new password
                  </p>
                </div>

                <div className='max-w-lg space-y-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Current Email
                    </label>
                    <input
                      type='email'
                      value={resetData.email}
                      readOnly
                      className='w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Current Password
                    </label>
                    <div className='relative'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={resetData.password}
                        onChange={handleChange}
                        className='w-full px-4 py-2.5 border border-gray-300 rounded-lg pr-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                        placeholder='Enter current password'
                      />
                    </div>
                  </div>

                  {reseterrorMessage && (
                    <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
                      <p className='text-sm text-red-600'>
                        {reseterrorMessage}
                      </p>
                    </div>
                  )}

                  {userVerified ? (
                    <button
                      onClick={() => navigate('/set-Password')}
                      className='w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'
                    >
                      Set New Password
                    </button>
                  ) : (
                    <button
                      type='submit'
                      disabled={isLoading}
                      className='w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50'
                    >
                      {isLoading ? 'Verifying...' : 'Verify Identity'}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
