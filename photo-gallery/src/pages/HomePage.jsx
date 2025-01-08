const HomePage = () => {
  return (
    <div
      className='flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed'
      style={{ backgroundImage: `url('photo/i1.jpg')` }}
    >
      <div className='flex items-center justify-center  bg-black bg-opacity-50 p-8'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold text-gray-100 mb-4 animate-fade-in-down'>
            Welcome to Photo Gallery
          </h1>
          <p className='text-lg text-gray-300 mb-6 animate-fade-in-up'>
            Upload and explore beautiful images seamlessly.
          </p>
          <button className='bg-blue-600 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-blue-700 transition duration-300 animate-bounce'>
            <a href='/login' className='text-white'>
              Get Started
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
