import { useState } from 'react';
import AuthService from '../services/authTest';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing FontAwesome icons for eye and eye-slash

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!usernameOrEmail) {
      setError('UserName Or Email are required');
      return;
    }
    if (!password) {
      setError('Password are required');
      return;
    }

    setError('');
    setIsLoading(true); // Show loading state

    try {
      const response = await AuthService.loginUser(usernameOrEmail, password);
      if (response) {
        console.log('Login successful:', response);
        // Assuming `response.data.username` contains the user's name
        const name = response.user.userName;
        alert(`Hello ${name}\nLogin successful!\nRedirecting to HomePage...`);
        // Store token based on "Remember Me"
        if (rememberMe) {
          localStorage.setItem('token', response.token); // Persistent storage
        } else {
          sessionStorage.setItem('token', response.token); // Session-based storage
        }
        window.location.href = '/'; // Redirect if needed
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid Credential');
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorize/google';
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      {/* Left Side Background */}
      <div className='flex-1 bg-cover bg-center'>
        <img
          src='src/assets/photos/loginpage/loginleft.jpg'
          alt='Login Logo'
          className='bg-cover'
        />
      </div>

      {/* Right Side Login Form */}
      <div className='flex-1 min-h-screen flex items-center justify-center'>
        <div className='bg-white bg-opacity-50 shadow-2xl rounded-lg p-8 w-full max-w-md transform transition duration-300 hover:scale-105 hover:bg-opacity-80 backdrop-filter backdrop-blur-lg'>
          {/* Login Logo */}
          <div className='flex items-center justify-center mb-6'>
            <img
              src='src/assets/photos/loginpage/login-logo.png'
              alt='Login Logo'
              className='h-12 w-12'
            />
          </div>

          {/* Title */}
          <h2 className='text-3xl font-extrabold text-gray-800 mb-2 text-center'>
            Welcome Back!
          </h2>
          <p className='text-gray-500 text-center mb-6'>
            Please login to your account.
          </p>

          {/* Login Form */}
          <form className='space-y-4' onSubmit={handleLogin}>
            <div>
              <label className='block text-gray-700 font-medium flex items-center'>
                <img
                  src='src/assets/photos/loginpage/username.png'
                  alt='Username Icon'
                  className='h-5 w-5 mr-2'
                />
                Username
              </label>
              <input
                type='text'
                placeholder='Enter your username'
                className='form-input w-full border-gray-300 rounded shadow-sm focus:ring focus:ring-pink-300'
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>

            <div>
              <label className='block text-gray-700 font-medium flex items-center'>
                <img
                  src='https://img.icons8.com/?size=100&id=17948&format=png'
                  alt='Password Icon'
                  className='h-5 w-5 mr-2'
                />
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  className='form-input w-full border-gray-300 rounded shadow-sm focus:ring focus:ring-pink-300'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-1 top-5 transform -translate-y-1/2 text-black bg-transparent focus:outline-none hover:bg-transparent'
                >
                  {showPassword ? (
                    <FaEyeSlash className='h-5 w-5' />
                  ) : (
                    <FaEye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='flex justify-between items-center text-sm text-gray-600'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox text-pink-500 mr-2'
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <a
                href='/forgot-password'
                className='text-pink-500 hover:underline'
              >
                Forgot Password?
              </a>
            </div>

            {/* Error Message */}
            {error && <p className='text-red-500 text-sm'>{error}</p>}

            {/* Submit Button */}
            <button
              type='submit'
              className={`w-full py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center space-x-3 hover:opacity-50 transition-all duration-300 transform hover:scale-105
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              <img
                src='https://img.icons8.com/?size=100&id=bSYAgL542A4K&format=png&color=000000'
                alt='Logo'
                className='h-5 w-5'
              />
              {isLoading && <span className='animate-spin'>🔄</span>}
              <span>{isLoading ? 'Logging in...' : 'Login'}</span>
            </button>
          </form>

          {/* Google Login Button */}
          <div className='mt-6'>
            <button
              onClick={handleGoogleLogin}
              className='w-full py-2 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition'
            >
              <img
                src='https://img.icons8.com/?size=100&id=17949&format=png'
                alt='Google Logo'
                className='h-5 w-5 mr-2'
              />
              Login with Google
            </button>
          </div>

          {/* Signup Link */}
          <p className='text-center text-sm text-gray-600 mt-6'>
            Don’t have an account?{' '}
            <a href='/register' className='text-pink-500 hover:underline'>
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
