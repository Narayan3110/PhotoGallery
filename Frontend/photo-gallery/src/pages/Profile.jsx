import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import {updateUserProfile} from '@/services/profileUpdateService';
import { RiCameraAiFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthService from '@/services/authTest';
import { Verified } from 'lucide-react';

const Profile = () => {
  const userData = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [reseterrorMessage, setResetErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("profile"); // "profile" or "resetPassword"
  const [showPassword, setShowPassword] = useState(false);
  const [userVerified, setUserVerified] = useState("");
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [removeProfile, setRemoveProfile] = useState(false);

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
        day:'numeric',
        month:'numeric',
        year:'numeric',
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
    city: userData?.userProfile?.address?.split(',')[0] || '', // City
    state: userData?.userProfile?.address?.split(',')[1] || '', // State
    country: userData?.userProfile?.address?.split(',')[2] || '', // Country
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
    if (activeTab === "profile") {
      setFormData({ ...formData, [name]: value });
    } else {
      setResetData({ ...resetData, [name]: value });
    }
  };

   // Handle form submission Profile Update
  const handleSubmit = async (e,removeProfile) => {
    e.preventDefault();
    // Merge full name and address before sending
    const fullName = `${formData.name} ${formData.surname}`;
    const address = `${formData.city}, ${formData.state}, ${formData.country}`;
    // updated Data to send
    const updatedUserData = {
        fullName,
        address,
        contact:formData.phoneNumber,
        dob: formData.dob, // Send updated DOB
        removeProfile
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
      setErrorMessage("Error during updating. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
    // Handle Reset Password Form Submission
    const handleResetSubmit = async (e) => {
      e.preventDefault();

      const usernameOrEmail=resetData.email;
      const password=resetData.password;
      setResetErrorMessage('');
      setIsLoading(true);
        try {
          setUserVerified( await AuthService.loginUser(
        usernameOrEmail,
        password,
        dispatch
      ));
    } catch (err) {
      console.error("Login failed:", err);
      setResetErrorMessage("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }   
    };
    // Handle ProfileChangeButton 
    const handleAddProfilePic = () => {
      navigate("/gallery", {
        state: {
        isProfileEditing:true  
        } });
    };

    const handleDeleteProfilePicture = () => {
      handleSubmit({ preventDefault: () => {} }, true); // Pass 'true' for removeProfile directly
    };
    
  
  // Default Profile picture
  const defaultProfilePic = "src/assets/photos/profilePage/Default Profile.png";

  return (
    <div className='flex min-h-screen bg-gray-100'>

      {/* Main Content */}
      <div className='flex-1 mt-20'>
        <div className="relative w-full h-64">
          <div className="h-full relative  bg-[url('src/assets/photos/profilePage/gallery-banner.webp')] bg-cover bg-center" />
          
          {/* User Info Section */}
          <div className="absolute top-44 grid grid-cols-8 ml-40 items-center ">
              {/* Profile Picture */}
              <div className="relative w-40 h-40 rounded-full shadow-2xl">
                <img
                  src={userData.userProfile?.profileUrl || defaultProfilePic}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 bg-white border-white object-cover"
                />
                <div
                  className="absolute bottom-4 right-4 bg-white p-2 rounded-full cursor-pointer"
                  onClick={toggleProfileOptions} 
                  >
                <RiCameraAiFill />
                {/* Dropdown Menu */}
                {showProfileOptions && (
                  <div className="flex flex-col gap-1 absolute bg-white shadow-lg rounded-lg w-28 p-1">
                    <button
                      className="block w-full bg-gray-300 text-left p-2 hover:bg-gray-200 hover:text-[#083A50]"
                      onClick={handleAddProfilePic}
                    >
                      Add New
                    </button>
                    <button
                      className="block w-full bg-gray-300 text-left p-2 hover:bg-gray-200 hover:text-[#083A50]"
                      onClick={handleDeleteProfilePicture}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* User Details */}
            <div className="ml-5 mt-16 col-span-6 text-white">
              <h1 className="text-5xl font-bold text-gray-700 ">{userData.userProfile?.fullName||userData.userName}</h1>
              <p className="text-md">
               Your journey begins here, your account is ready! Start sharing your story, one photo at a time. 📸✨
              </p>
            </div>
          </div>
        </div>
        
        {/* Sidebar Nav */}
        <div className='flex mt-28 mb-10 p-10'>
        <div className='w-1/6 ml-10 bg-white text-center p-4 rounded-lg shadow'>
            <aside className="bg-white">
              <nav className="flex flex-col gap-6 p-4">
                <button
                  className={`px-3 py-2 bg-gray-300 rounded-md font-bold ${
                    activeTab === "profile" ? "bg-gray-400 text-[#083A50]" : " hover:bg-gray-200 hover:text-[#083A50]"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Edit Profile
                </button>
                <button
                  className={`px-3 py-2 bg-gray-300 rounded-md font-bold ${
                    activeTab === "resetPassword" ? "bg-gray-400 text-[#083A50]" : " hover:bg-gray-200 hover:text-[#083A50]"
                  }`}
                  onClick={() => setActiveTab("resetPassword")}
                >
                  Reset Password
                </button>
              </nav>
            </aside>
          </div>

          {/* Edit Profile Form */}
          <main className="flex-1 ml-5 space-y-5 bg-white p-6 rounded-lg mr-10 shadow">
            {activeTab === "profile" ? (
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 text-[#CACED8] font-bold text-lg">
              <h1 className="text-2xl font-bold text-[#083A50]">Edit Profile</h1>
              <div className="text-right">
                <span>Last Update {formData.updatedDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 mt-4 gap-4 text-[#CACED8] font-bold text-lg">
              <span>Personal</span>
              <span>Contact</span>
            </div>
              

              <div className='grid grid-cols-2 mt-5 gap-4'>
              {/* Username (read-only) */}
              <div className="space-y-2">
                <label className="block font-bold">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  className="p-3 border rounded-lg bg-gray-200"
                  readOnly
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 border rounded-lg bg-gray-200"
                  placeholder="Email"
                  readOnly
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="block font-bold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-3 border rounded-lg"
                  placeholder="Name"
                />
              </div>

               {/* Phone Number */}
               <div className="space-y-2">
                <label className="block font-bold">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="p-3 border rounded-lg"
                  placeholder="Phone Number"
                />
              </div>

              {/* Surname */}
              <div className="space-y-2">
                <label className="block font-bold">Surname</label>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className="p-3 border rounded-lg"
                  placeholder="Surname"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="block font-bold">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="p-3 border rounded-lg"
                  placeholder="City"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="block font-bold">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="p-3 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-bold">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="p-3 border rounded-lg"
                  placeholder="State"
                />
              </div>
              <div></div>
              <div className="space-y-2">
                <label className="block font-bold">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="p-3 border rounded-lg"
                  placeholder="Country"
                />
              </div>
              
              {errorMessage && (
              <p className="text-sm col-span-2 text-red-500">{errorMessage}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-8 col-span-2 bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600"
                disabled={isLoading}
                >
                  {isLoading ? "Saving Changes..." : "Save Changes"}
              </button>
              </div>
            </form>
          ) : (
              // Reset Password Form
              <form className="grid grid-cols-2 mt-5 gap-4" onSubmit={handleResetSubmit}>
                <h1 className="text-2xl col-span-2 font-bold text-[#083A50]">
                  Reset Password
                </h1>
                <div className="space-y-2">
                  <label className="block font-bold">
                    Email
                  </label>
                  <input
                   type="email"
                  name="email" 
                  value={resetData.email} 
                  readOnly className="p-3 border rounded-lg bg-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-bold">
                    Current Password
                  </label>
                  <div className="relative ">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password" 
                  placeholder="Password"
                  className="p-3 border rounded-lg"
                  value={resetData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-xl right-1 mt-1 text-gray-500 bg-transparent hover:bg-transparent focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>


                {reseterrorMessage && (
                  <p className="text-sm col-span-2 text-red-500">{reseterrorMessage}</p>
                )}

                  {/* If userVerified is NOT null, show Set-New-Email & Set-New-Password Buttons */}
                  {userVerified ? (
                    <div className='grid grid-cols-2 mt-8'>
                    {/* <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => navigate("/reset-email")}
                    >
                      Set NewEmail
                    </button> */}
                    <button
                    className="bg-red-500 col-span-2 w-1/3 text-white py-3 rounded-lg hover:bg-red-600 transition"
                    onClick={() => navigate("/set-Password")}
                  >
                    Set NewPassword
                  </button>
                  </div>

                  ) : (
                    /* If userVerified is NULL, show Button */
                    <button
                    type="submit"
                    className="mt-8 col-span-2 w-1/6 bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600"
                    disabled={isLoading}
                    >
                      {isLoading ? "Verifying User..." : "Verified User"}
                  </button>
                  )}
              </form>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
