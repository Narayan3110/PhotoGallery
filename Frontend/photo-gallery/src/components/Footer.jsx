import { FaFacebook } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';

import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='bg-white text-gray-900 py-10 px-6 md:px-12 lg:px-24'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {/* Left Section - Brand Info */}
        <div>
          <h2 className='text-3xl font-bold text-indigo-900'>PhotoGallery</h2>
          <p className='text-gray-500 mt-3'>
            Book your trip in minutes, get full control for much longer.
          </p>
        </div>

        {/* Middle Section - Links */}
        <div>
          <h3 className='font-semibold text-gray-900 mb-3'>Company</h3>
          <ul className='space-y-2 text-gray-500'>
            <li>
              <a href='#' className='hover:text-indigo-900'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-indigo-900'>
                Careers
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-indigo-900'>
                Mobile
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='font-semibold text-gray-900 mb-3'>Contact</h3>
          <ul className='space-y-2 text-gray-500'>
            <li>
              <a href='#' className='hover:text-indigo-900'>
                Help/FAQ
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-indigo-900'>
                Press
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-indigo-900'>
                Affiliates
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='font-semibold text-gray-900 mb-3'>More</h3>
          <ul className='space-y-2 text-gray-500'>
            <li>
              <a href='#' className='hover:text-indigo-900'>
                Airline Fees
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-indigo-900'>
                Airline
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-indigo-900'>
                Low Fare Tips
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media & App Buttons */}
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-10'>
        {/* Social Media */}
        <div className='flex space-x-4'>
          <a
            href='#'
            className='w-10 h-10 flex items-center justify-center rounded-full border text-blue-600 border-gray-300 hover:bg-gray-200'
          >
            <FaFacebook />
          </a>
          <a
            href='#'
            className='w-10 h-10 flex items-center justify-center rounded-full border text-red-500  border-gray-300 hover:bg-gray-200'
          >
            <GrInstagram />
          </a>
          <a
            href='#'
            className='w-10 h-10 flex items-center justify-center rounded-full border text-black  border-gray-300 hover:bg-gray-200'
          >
            <FaXTwitter/>
          </a>
        </div>

        {/* App Store Links */}
        <div className='flex space-x-4 mt-6 md:mt-0'>
          <a href='#'>
            <img
              src='/icons/google-play.png'
              alt='Google Play'
              className='h-10'
            />
          </a>
          <a href='#'>
            <img src='/icons/app-store.png' alt='App Store' className='h-10' />
          </a>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className='text-center text-gray-500 mt-10'>
        All rights reserved @photoGallery.co
      </div>
    </footer>
  );
};

export default Footer;
