import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaBars, FaTimes } from 'react-icons/fa'; // Updated import
import { useState } from 'react';

const GalleryNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Added state for mobile menu

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Default Profile picture
  const defaultProfilePic =
    'src/assets/photos/gallerynavbar/Default Profile.png';

  return (
    <div className='relative'>
      <nav className='fixed left-0 right-0 top-6 z-50 mx-auto w-[90vw] max-w-2xl flex items-center justify-between rounded-full bg-white px-6 py-2 shadow-md gap-5'>
        <div>
          <Link to='/profile' className='flex items-center gap-2'>
            <div className='w-10 h-10 rounded-full overflow-hidden border border-gray-300'>
              <img
                src={user?.userProfile?.profileUrl || defaultProfilePic}
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </div>
            <span className='hidden md:block font-medium'>
              {/* {user?.userProfile?.name || 'User'} */}
            </span>
          </Link>
        </div>

        <ul className='hidden md:flex space-x-6'>
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
            <Link to='/albums' className='hover:text-orange-500'>
              Albums
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

        {/* Mobile Menu Button */}
        <button
          type='button'
          className='md:hidden text-xl'
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden absolute left-0 right-0 top-20 z-50 mx-auto w-[90vw] max-w-2xl flex flex-col items-center bg-white px-6 py-4 shadow-md'>
          <ul className='space-y-4 text-center'>
            <li>
              <Link to='/' className='hover:text-orange-500' onClick={toggleMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to='/gallery' className='hover:text-orange-500' onClick={toggleMobileMenu}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to='/albums' className='hover:text-orange-500' onClick={toggleMobileMenu}>
                Albums
              </Link>
            </li>
            <li>
              <Link to='/profile' className='hover:text-orange-500' onClick={toggleMobileMenu}>
                Profile
              </Link>
            </li>
            <li>
              <Link to='/about' className='hover:text-orange-500' onClick={toggleMobileMenu}>
                About
              </Link>
            </li>
            <li>
              <Link to='/contact' className='hover:text-orange-500' onClick={toggleMobileMenu}>
                Contact
              </Link>
            </li>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className='rounded-full bg-red-500 px-6 py-2 text-white hover:bg-red-600'
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to='/login'
                  className='rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-orange-600'
                  onClick={toggleMobileMenu}
                >
                  Log In
                </Link>
                <Link
                  to='/register'
                  className='rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 ml-2'
                  onClick={toggleMobileMenu}
                >
                  Register
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GalleryNavbar;
