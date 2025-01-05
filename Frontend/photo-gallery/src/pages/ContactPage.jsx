const ContactPage = () => {
  return (
    <div className='max-w-2xl mx-auto mt-10 p-6 text-center bg-gray-100 border border-gray-300 rounded-lg shadow-lg'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Contact Us</h1>
      <p className='text-gray-600 mb-6'>
        We&apos;re here to help! Feel free to reach out to us with any
        questions, concerns, or feedback.
      </p>
      <div className='text-left space-y-2'>
        <p>
          <span className='font-semibold text-gray-800'>Email:</span>{' '}
          <a
            href='mailto:contact@yourwebsite.com'
            className='text-blue-500 hover:underline'
          >
            contact@yourwebsite.com
          </a>
        </p>
        <p>
          <span className='font-semibold text-gray-800'>Phone:</span>{' '}
          <a href='tel:+1234567890' className='text-blue-500 hover:underline'>
            +123 456 7890
          </a>
        </p>
        <p>
          <span className='font-semibold text-gray-800'>Address:</span> 123 Main
          Street, Cityville, Country
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
