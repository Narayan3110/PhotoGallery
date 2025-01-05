import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white shadow-lg h-20 flex items-center justify-center'>
      <div className='container mx-auto flex justify-between items-center px-6'>
        {/* Logo */}
        <h1 className='font-heading text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-transparent bg-clip-text'>
          Photo<span className='text-pink-500'>Gallery</span>
        </h1>

        {/* Navigation Links */}
        <ul className='flex space-x-6'>
          <li>
            <Link to='/' className='hover:text-accent transition-colors'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/gallery' className='hover:text-accent transition-colors'>
              Gallery
            </Link>
          </li>
          <li>
            <Link to='/about' className='hover:text-accent transition-colors'>
              About Us
            </Link>
          </li>
          <li>
            <Link to='/contact' className='hover:text-accent transition-colors'>
              Contact
            </Link>
          </li>
        </ul>

        {/* Login Button */}
        <Link
          to='/login'
          className='flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 px-5 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 space-x-3 shadow-lg'
        >
          <img
            src='https://img.icons8.com/?size=100&id=g7IgcLvs4JT6&format=png&color=000000'
            alt='Logo'
            className='h-5 w-5'
          />
          <span>Login</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
