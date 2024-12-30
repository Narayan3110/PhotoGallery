const LoginPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center'>
      {/* Image  */}
      <div className='flex-1'></div>

      {/* Form */}
      <div className='flex-1 min-h-screen flex items-center justify-center'>
        <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
          <h2 className='text-2xl font-bold text-text mb-4'>Login</h2>
          <p className='text-sm text-text mb-6'>Glad you&apos;re back!</p>
          <form className='space-y-4'>
            <div>
              <label className='block text-text font-medium'>Username</label>
              <input
                type='text'
                placeholder='Enter your username'
                className='form-input w-full border-gray-300 rounded'
              />
            </div>
            <div>
              <label className='block text-text font-medium'>Password</label>
              <input
                type='password'
                placeholder='Enter your password'
                className='form-input w-full border-gray-300 rounded'
              />
            </div>
            <div className='flex justify-between items-center text-sm text-text'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox text-primary mr-2'
                />
                Remember me
              </label>
              <a
                href='/forgot-password'
                className='text-secondary hover:underline'
              >
                Forgot Password?
              </a>
            </div>
            <button className='w-full py-2 rounded bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'>
              Login
            </button>
          </form>
          <p className='text-center text-sm text-text mt-6'>
            Don’t have an account?{' '}
            <a href='/register' className='text-secondary hover:underline'>
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
