const SignupPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-r from-secondary via-accent to-primary flex items-center justify-center'>
      <div className='flex-1'></div>

      <div className='flex-1 flex items-center justify-center'>
        <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
          <h2 className='text-2xl font-bold text-text mb-4'>Signup</h2>
          <p className='text-sm text-text mb-6'>
            Join us and start your journey!
          </p>
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
              <label className='block text-text font-medium'>
                Email / Phone
              </label>
              <input
                type='email'
                placeholder='Enter your email or phone'
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
            <div>
              <label className='block text-text font-medium'>
                Confirm Password
              </label>
              <input
                type='password'
                placeholder='Confirm your password'
                className='form-input w-full border-gray-300 rounded'
              />
            </div>
            <button className='w-full py-2 rounded bg-gradient-to-r from-secondary to-primary text-white hover:opacity-90'>
              Signup
            </button>
          </form>
          <p className='text-center text-sm text-text mt-6'>
            Already have an account?{' '}
            <a href='/login' className='text-secondary hover:underline'>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
