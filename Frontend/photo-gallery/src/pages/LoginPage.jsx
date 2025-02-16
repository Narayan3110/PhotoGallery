import { useState } from 'react';
import AuthService from '../services/authTest';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from '@/components/ui/toast';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!usernameOrEmail) {
      setError('Username or Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await AuthService.loginUser(
        usernameOrEmail,
        password,
        dispatch
      );
      if (response) {
        if (rememberMe) {
          localStorage.setItem('token', response.token);
        } else {
          sessionStorage.setItem('token', response.token);
        }

        setShowToast(true);
        setTimeout(() => {
          navigate('/gallery');
        }, 2000);
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid Credentials');
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:9090/oauth2/authorization/google';
  };
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:9090/oauth2/authorization/github';
  };
  return (
    <ToastProvider>
      <div className='flex flex-col md:flex-row min-h-screen w-screen bg-gray-100'>
        {/* Left Section: Form */}
        <div className='flex flex-1 flex-col justify-center items-center bg-white p-6'>
          <div className='w-full max-w-[90%] md:max-w-[30rem]'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4 font-[Satisfy] text-black text-center'>
              Welcome
            </h1>
            <p className='text-gray-500 mb-6 text-center'>
              We are glad to see you back with us
            </p>
            <form className='w-full' onSubmit={handleLogin}>
              <div>
                <label className='block text-sm mb-1'>Username</label>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Username'
                    className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm mb-1'>Password</label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    className='w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 bg-transparent hover:bg-transparent focus:outline-none'
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className='flex justify-between text-sm items-center mt-3'>
                <label className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    className='align-middle mb-0'
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span>Remember Me</span>
                </label>

                <a
                  href='/reset-email'
                  className='text-blue-500 hover:text-red-500 hover:underline'
                >
                  Forgot Password?
                </a>
              </div>

              {error && <p className='text-sm text-red-500 mt-2'>{error}</p>}

              <button
                type='submit'
                className='w-full py-2 text-white bg-black rounded-md hover:bg-gray-800 mt-6'
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Next'}
              </button>
            </form>

            <div className='text-center mt-4'>
              <p className='text-base text-gray-700'>
                New here?{' '}
                <a
                  href='/register'
                  className='text-blue-500 hover:text-red-500 hover:underline font-medium'
                >
                  Create an account
                </a>
              </p>
            </div>

            <p className='text-center text-gray-500 mt-4'>
              ---Login with Others---
            </p>
            <div className='flex justify-center mt-2'>
              <Button
                onClick={handleGoogleLogin}
                variant='ghost'
                className='flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm'
              >
                <FcGoogle />
                Login with Google
              </Button>
            </div>
            <div className='flex justify-center mt-2'>
              <Button
                onClick={handleGithubLogin}
                variant='ghost'
                className='flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm'
              >
                <FaGithub />
                Login with Github
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className='hidden lg:flex lg:w-1/2 justify-center items-center bg-white'>
          <img
            src='/photo/LoginPage/LoginMain.jpg'
            alt='Login illustration'
            className='h-screen w-full object-cover bg-white p-4 rounded-lg'
          />
        </div>

        {/* Toast Notification */}
        {showToast && (
          <Toast variant='default' className='bg-white text-black shadow-md'>
            <ToastTitle className='text-black'>Login Successful</ToastTitle>
            <ToastDescription className='text-gray-800'>
              You are being redirected...
            </ToastDescription>
          </Toast>
        )}
        <ToastViewport className='fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[100] flex flex-col space-y-2 w-auto max-w-xs p-4' />
      </div>
    </ToastProvider>
  );
};

export default LoginPage;
