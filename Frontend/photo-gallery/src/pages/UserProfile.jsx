import React from 'react';

const UserProfile = () => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className='w-20 bg-teal-500 flex flex-col items-center py-4'>
        <div className='w-10 h-10 bg-white rounded-full mb-6'></div>
        <div className='flex flex-col space-y-4 text-white'>
          <button className='w-8 h-8 bg-white rounded'></button>
          <button className='w-8 h-8 bg-white rounded'></button>
          <button className='w-8 h-8 bg-white rounded'></button>
          <button className='w-8 h-8 bg-white rounded'></button>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-8'>
        <h1 className='text-2xl font-semibold text-gray-800'>Setting</h1>

        <div className='flex mt-6'>
          {/* Profile Section */}
          <div className='w-1/4 bg-white p-4 rounded-lg shadow'>
            <div className='flex flex-col items-center'>
              <div className='w-24 h-24 bg-gray-300 rounded-full'></div>
              <h2 className='mt-4 text-xl font-semibold'>Mobina Mirbagheri</h2>
              <p className='text-sm text-gray-500'>Your account is ready, you can now apply for advice.</p>
              <button className='mt-4 bg-teal-500 text-white px-4 py-2 rounded'>Edit Profile</button>
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className='flex-1 ml-8 bg-white p-6 rounded-lg shadow'>
            <h2 className='text-xl font-semibold mb-4'>Edit Profile</h2>
            <form className='grid grid-cols-2 gap-4'>
              <input type='text' placeholder='First Name' className='p-3 border rounded' />
              <input type='text' placeholder='Surname' className='p-3 border rounded' />
              <input type='text' placeholder='National Code' className='p-3 border rounded' />
              <input type='date' className='p-3 border rounded' />
              <input type='text' placeholder='Education Level' className='p-3 border rounded' />
              <input type='email' placeholder='Email' className='p-3 border rounded' />
              <input type='tel' placeholder='Phone Number' className='p-3 border rounded' />
              <input type='text' placeholder='Country' className='p-3 border rounded' />
              <input type='text' placeholder='City' className='p-3 border rounded' />
              <button type='submit' className='col-span-2 bg-teal-500 text-white py-3 rounded'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
