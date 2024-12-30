const HomePage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen '>
      <div className='text-center'>
        <h1 className='text-5xl font-bold text-gray-800 mb-4'>
          Welcome to Photo Gallery
        </h1>
        <p className='text-lg text-gray-600 mb-6'>
          Upload and explore beautiful images seamlessly.
        </p>
        <button className='bg-blue-600 text-white px-8 py-3 rounded-full font-medium shadow-md hover:bg-blue-700 transition duration-300'>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
