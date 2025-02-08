import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaBars } from 'react-icons/fa6';

const GalleryNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  };

  // Default Profile picture
  const defaultProfilePic =
    'src/assets/photos/gallerynavbar/Default Profile.png';

  return (
    <div className='relative'>
      <nav className='fixed left-0 right-0 top-6 z-50 mx-auto w-[90vw] max-w-2xl flex items-center justify-between rounded-full bg-white px-6 py-2 shadow-md gap-8'>
        <ul className='hidden md:flex space-x-6'>
          <Link to='/profile' className='flex items-center gap-2'>
            <div className='size-10 rounded-full overflow-hidden border border-gray-300'>
              <img
                src={user?.userProfile?.profileUrl || defaultProfilePic}
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </div>
            <span className='hidden md:block font-medium'>
              
            </span>
          </Link>
          <li>
            <Link to='/' className='hover:text-orange-500'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/gallery' className='hover:text-orange-500'>
              Gallery
            </Link>
          </li>
          <li>
            <Link to='/profile' className='hover:text-orange-500'>
              Profile
            </Link>
          </li>
          <li>
            <Link to='/about' className='hover:text-orange-500'>
              About
            </Link>
          </li>
          <li>
            <Link to='/contact' className='hover:text-orange-500'>
              Contact
            </Link>
          </li>
        </ul>
        <div className='flex items-center gap-2'>
          {user ? (
            <button
              onClick={handleLogout}
              className='rounded-full bg-red-500 px-6 py-2 text-white hover:bg-red-600'
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to='/login'
                className='rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-orange-600'
              >
                Log In
              </Link>
              <Link
                to='/register'
                className='rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 ml-2'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className='flex-between h-10 w-full px-6 md:hidden flex justify-between items-center'>
        <div className='text-lg font-semibold'>PhotoGallery</div>
        <button type='button'>
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default GalleryNavbar;
