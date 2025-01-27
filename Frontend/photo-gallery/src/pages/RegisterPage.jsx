import { useState } from 'react';
import AuthService from '../services/authTest';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing FontAwesome icons for eye and eye-slash
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom for routing

const SignupPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [confirmpassword, setConfirmpassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To handle error messages
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (formData.password !== confirmpassword) {
      setErrorMessage('Passwords do not match!');
      //      alert("Passwords do not match!");
      return;
    }

    setErrorMessage('');
    setIsLoading(true); // Show loading state

    try {
      // Call AuthService to register the user
      const response = await AuthService.registerUser(formData);
      alert('Signup successful!');
      console.log('User registered successfully:', response);
      window.location.href = '/login';
    } catch (error) {
      setErrorMessage('Error during registration. Please try again.');
      console.error('Error during registration:', error);
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-white-100  flex items-center justify-center'>
      <div className='flex-1 bg-cover bg-center'>
        {/* Left Side Background */}

        <img
          src='src/assets/photos/registerPage/signup.jpg'
          alt='Login Logo'
          className='bg-cover'
        />
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <div className='bg-white bg-opacity-50 shadow-2xl rounded-lg p-8 w-full max-w-md transform transition duration-300 hover:scale-90 hover:bg-opacity-70 backdrop-filter backdrop-blur-lg'>
          <div className='text-center mb-6'>
            <img
              src='src/assets/photos/registerPage/login-logo.png'
              alt='Logo'
              className='h-12 mx-auto mb-4'
            />
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>Sign Up</h2>
            <p className='text-sm text-gray-600'>
              Join us and start your journey!
            </p>
          </div>

          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label className='block text-gray-700 font-medium'>
                Username
              </label>
              <input
                type='text'
                name='userName'
                placeholder='Enter your username'
                className='form-input w-full border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className='block text-gray-700 font-medium'>Email</label>
              <input
                type='email'
                name='email'
                placeholder='Enter your email'
                className='form-input w-full border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className='block text-gray-700 font-medium'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Enter your password'
                  className='form-input w-full border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-1 top-5 transform -translate-y-1/2 text-black bg-transparent  focus:outline-none hover:bg-transparent'
                >
                  {showPassword ? (
                    <FaEyeSlash className='h-5 w-5' />
                  ) : (
                    <FaEye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className='block text-gray-700 font-medium'>
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  placeholder='Confirm your password'
                  className='form-input w-full border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={formData.confirmPassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-1 top-5 transform -translate-y-1/2 text-black bg-transparent  focus:outline-none hover:bg-transparent'
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className='h-5 w-5' />
                  ) : (
                    <FaEye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>
            {errorMessage && (
              <p className='text-red-500 text-center'>{errorMessage}</p>
            )}

            <button
              type='submit'
              className={`w-full py-2 rounded bg-gradient-to-r from-blue-800 via-blue-500 text-white font-bold hover:opacity-90 transition-opacity
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading && <span className='animate-spin'>🔄</span>}
              <span>{isLoading ? 'Signing Up...' : 'Sign Up'}</span>
            </button>
          </form>

          <p className='text-center text-sm text-gray-600 mt-6'>
            Already have an account?{' '}
            {/* <a href='/login' className='text-blue-500 hover:underline'>
              Login
            </a> */}
            <Link to='/login'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
