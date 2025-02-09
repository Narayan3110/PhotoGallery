import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useState } from 'react';
import { LogOut } from 'lucide-react';
import logo1 from '@/assets/photos/Navbar/logo1.png';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <nav className='bg-white py-2 w-full  top-0 z-50 '>
      <div className='container mx-auto flex items-center justify-between px-6 max-w-6xl'>
        {/* Logo */}
        <div className='flex items-center space-x-2'>
          <img
            src={logo1} // Replace with your logo
            alt='Logo'
            className='h-8 w-auto '
          />
          <span className='text-xl font-bold font-[Satisfy] text-black'>
            SnapSafe
          </span>
        </div>

        {/* Navigation */}
        <ul className='hidden md:flex space-x-6 bg-white px-4 py-2 rounded-full shadow-md text-gray-700 font-medium'>
          <li>
            <Link to='/' className='hover:text-orange-600'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/about' className='hover:text-orange-600'>
              Team
            </Link>
          </li>
          <li>
            <Link to='/contact' className='hover:text-orange-600'>
              Contact
            </Link>
          </li>
          {user && (
            <li>
              <Link to='/gallery' className='hover:text-orange-600 transition'>
                Gallery
              </Link>
            </li>
          )}
        </ul>

        <div className='flex items-center space-x-4'>
          {user ? (
            <button
              onClick={handleLogout}
              className='flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition'
            >
              <LogOut className='h-5 w-5 mr-2' /> Logout
            </button>
          ) : (
            <div className='flex space-x-3'>
              <Link
                to='/login'
                className='px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition duration-200 ease-in-out shadow-md'
              >
                Log In
              </Link>
              <Link
                to='/register'
                className='px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition duration-200 ease-in-out shadow-md'
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
