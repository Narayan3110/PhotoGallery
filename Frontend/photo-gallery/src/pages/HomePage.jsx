import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div
      className='flex items-center justify-center min-h-screen bg-cover bg-center bg-fixed '
      style={{ backgroundImage: `url('photo/i1.jpg')` }}
    >
      <div className='flex items-center justify-center  bg-black bg-opacity-50 p-8 '>
        <div className='text-center text-Gray-50'>
          <h1 className='text-5xl font-bold text-gray-100 mb-4 animate-fade-in-down'>
            Welcome to Photo Gallery
          </h1>
          <p className='text-lg text-gray-300 mb-6 animate-fade-in-up'>
            Upload and explore beautiful images seamlessly.
          </p>
          <button>
            <Link
              to='/login'
              className='flex items-center justify-center text-white font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 space-x-3 shadow-lg'
            >
              <img
                src='https://img.icons8.com/?size=100&id=g7IgcLvs4JT6&format=png&color=000000'
                alt='Logo'
                className='h-5 w-5'
              />
              <span> Click Here To Start !!</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
