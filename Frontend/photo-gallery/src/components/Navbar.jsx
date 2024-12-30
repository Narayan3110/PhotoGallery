import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white shadow-lg h-20 flex items-center justify-center'>
      <div className='container mx-auto flex justify-between items-center px-6'>
        {/* Logo */}
        <h1 className='font-heading text-3xl text-primary'>
          Photo<span className='text-accent'>Gallery</span>
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
          className='bg-gradient-to-r from-secondary to-accent px-5 py-2 rounded-lg text-gray-900 font-medium hover:opacity-90 transition-opacity'
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
