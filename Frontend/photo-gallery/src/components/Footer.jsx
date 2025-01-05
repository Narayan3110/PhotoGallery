const Footer = () => {
  return (
    <footer className='bg-text text-white py-4'>
      <div className='container mx-auto text-center text-sm'>
        <p>
          <a href='/terms' className='hover:underline'>
            Terms & Conditions
          </a>{' '}
          |{' '}
          <a href='/support' className='hover:underline'>
            Support
          </a>{' '}
          |{' '}
          <a href='/customer-care' className='hover:underline'>
            Customer Care
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
