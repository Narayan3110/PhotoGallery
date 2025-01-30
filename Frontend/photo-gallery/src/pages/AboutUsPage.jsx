import React, { useState } from 'react';

const MapMarker = ({ style ,locationName }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative w-10 h-10"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        <img src="/photo/aboutus/pointer.png" />
      </div>
      {/* Popup on Hover */}
      {isHovered && (
        <div 
          className="relative w-[150px] -top-20 left-1/2 transform -translate-x-1/2 bg-white text-black text-lg px-3 py-1 rounded-lg shadow-lg"
          style={{ whiteSpace: 'nowrap' }}
        >
          {locationName}
        </div>
      )}
    </div>
  );
};
const AboutUsPage = () => {
    return (
      <div className='flex flex-col items-center py-20 md:py-[50px] gap-3 md:gap-10 w-full'>
        <div className='flex flex-col p-10 pt-0 gap-8 w-full max-w-7xl mx-auto'>
          <h1 className='text-[32px] md:text-[80px] font-bold text-center text-neutral-900 leading-[1.38] md:leading-[88px]'>
          <span> About </span><span className='text-blue-600'>Photo Gallery</span>
          </h1>
          <div className='relative w-full max-w-7xl h-[7px] bg-gray-300'></div>
        </div>
    
          <div className='shadow-xl rounded-xl border border-gray-300 p-5 md:p-10 w-full max-w-7xl'>
            <div className='flex flex-col items-start gap-8 w-full'>
              <div className='relative bg-black shadow-xl w-full rounded-lg border border-gray-300 overflow-hidden'>
                <img
                  src='/photo/aboutus/banner.webp'
                  alt='Business Meeting'
                  className='w-full h-auto shadow-xl'
                />
                <div className='absolute shadow-xl top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-20 p-5'>
                  <div className='w-[250px] shadow-xl md:w-[250px] lg:w-[400px] lg:pb-7 bg-black bg-opacity-40 p-4 rounded-lg'>
                    <p className='text-gray-200 text-center font-bold text-sm md:text-sm lg:text-2xl'>
                      Our photo gallery showcases stunning visuals, captured with care to bring a unique perspective to each subject.
                      Whether it's landscapes, architecture, or moments frozen in time, our collection is designed to inspire and engage visitors like you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div className='flex flex-col items-start pl-10 pr-10 gap-8 w-full max-w-7xl mx-auto'>
          <div className='flex flex-col items-start gap-2 w-full'>
            <h2 className='text-neutral-900 font-bold text-4xl md:text-5xl leading-tight'>
            Our <span className='text-blue-600'>Vision</span>
            </h2>
            <div className='w-full h-1 bg-neutral-300'></div>
          </div>

          <div className='flex flex-col items-start gap-8 w-full'>
            <div className='flex flex-row items-start gap-16 w-full'>
              <h2 className='text-2xl font-semibold text-gray-900 w-80'>
              Capturing Excellence
              </h2>
              <p className='text-lg text-justify text-gray-600 w-full'>
              We strive to provide an unparalleled visual experience, showcasing stunning photography that inspires and engages our audience.
              </p>
            </div>

            <div className='flex flex-row items-start gap-16 w-full'>
              <h2 className='text-2xl font-semibold text-gray-900 w-80'>
              Focused Creativity
              </h2>
              <p className='text-lg text-justify text-gray-600 w-full'>
              Our expertise lies in curating and presenting breathtaking visuals that highlight the beauty of specific subjects, themes, and moments.
              </p>
            </div>

            <div className='flex flex-row items-start gap-16 w-full'>
              <h2 className='text-2xl font-semibold text-gray-900 w-80'>
              Versatile Experience
              </h2>
              <p className='text-lg text-justify text-gray-600 w-full'>
              From professional photographers to hobbyists, we cater to a wide range of creative minds, delivering a diverse collection of images that capture unique perspectives.
              </p>
            </div>

            <div className='flex flex-row items-start gap-16 w-full'>
              <h2 className='text-2xl font-semibold text-gray-900 w-80'>
              Innovation & Artistry
              </h2>
              <p className='text-lg text-justify text-gray-600 w-full'>
              Blending cutting-edge technology with artistic vision, we ensure each photograph reflects the perfect balance of creativity and technical precision.              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col items-start pl-10 pr-10 gap-8 w-full max-w-7xl mx-auto'>
          <div className='flex flex-col items-start gap-2 w-full'>
            <h2 className='text-neutral-900 font-bold text-4xl md:text-5xl leading-tight'>
            Our <span className='text-blue-600'>Commitment</span>
            </h2>
            <div className='w-full h-1 bg-neutral-300'></div>
          </div>

          <div className='flex flex-col items-start gap-8 w-full'>
            <div className='flex flex-row items-start gap-16 w-full'>
              <h2 className='text-2xl font-semibold text-gray-900 w-80'>
              Integrity
              </h2>
              <p className='text-lg text-justify text-gray-600 w-full'>
              We prioritize confidentiality and exclusivity, ensuring that every photo collection is uniquely curated for our audience. Each image is thoughtfully presented to offer a one-of-a-kind visual experience.              </p>
            </div>

            <div className='flex flex-row items-start gap-16 w-full'>
              <h2 className='text-2xl font-semibold text-gray-900 w-80'>
              Excellence
              </h2>
              <p className='text-lg text-justify text-gray-600 w-full'>
              ConsultUs is committed to ensuring that our advice and recommendations are based on the best combination of methods, information research, creativity and internal quality assurance.
              </p>
            </div>

            <div className='flex flex-row items-start gap-16 w-full'>
              <h2 className='text-2xl font-semibold text-gray-900 w-80'>
              Lasting Connections
              </h2>
              <p className='text-lg text-justify text-gray-600 w-full'>
              We value long-term relationships with our audience and contributors, believing that consistency and trust are key to delivering an inspiring and ever-evolving photography experience.              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col text-center items-start pl-10 pr-10 gap-8 w-full max-w-7xl mx-auto'>
          <div className='flex flex-col items-center gap-12 md:gap-[48px] w-full'>
              <h1 className='text-[32px] md:text-[80px] font-bold text-center text-neutral-900 leading-[1.38] md:leading-[88px]'>
              <span>Meet Our </span>
              <span className='text-blue-600'>Success Team</span>
              </h1>
            <div className='relative w-full max-w-4xl h-[7px] bg-gray-300'></div>
          </div>

          {/* Team Bios */}
          <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <img src='/photo/aboutus/team/Rushi.png' alt='Rushikesh Aher' className='rounded-full mx-auto' />
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Rushikesh Aher(post)</h3>
                <p className="text-gray-600">Responsible for integrating both frontend and backend components, with a key focus on frontend development.</p>
              </div>
              <div className="text-center">
                <img src='/photo/aboutus/team/N.png' alt='Nikhil Katoch' className='rounded-full mx-auto' />
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Nikhil Katoch(post)</h3>
                <p className="text-gray-600">Works across both backend and frontend, ensuring seamless integration and optimizing project functionality.</p>
              </div>
              <div className="text-center">
                <img src='/photo/aboutus/team/N.png' alt='Narayan Pandey' className='rounded-full mx-auto' />
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Narayan Pandey(post)</h3>
                <p className="text-gray-600">Focused on frontend development, delivering an intuitive and visually appealing user interface for the project.</p>
              </div>
              <div className="text-center">
                <img src='/photo/aboutus/team/S.png' alt='Shresth Shrivastav' className='rounded-full mx-auto' />
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">Shresth Shrivastav(post)</h3>
                <p className="text-gray-600">Specializes in integrating Cloudinary API for photo storage, while also contributing to frontend development efforts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className='flex flex-col items-start pl-10 pr-10 gap-8 w-full max-w-7xl mx-auto'>
          <div className="w-full max-w-screen-xl">

            <div className='flex flex-col items-center gap-12 md:gap-[48px] w-full'>
                <h1 className='text-[32px] md:text-[80px] font-bold text-center text-neutral-900 leading-[1.38] md:leading-[88px]'>
                <span>We're here for you</span>
                <br />
                <span className='text-blue-600'>no matter where you are</span>
                </h1>
              <div className='relative w-full max-w-7xl h-[7px] bg-gray-300'></div>
            </div>  
            
          <div className="flex gap-8 w-full pt-5">
              <div className="w-full h-full relative">
                <MapMarker 
                style={{
                  position: 'absolute',
                  top: '52.5%',
                  left: '69%',
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                }}
                locationName='Bengaluru,India'
                />
                <img 
                src="https://dashboard.codeparrot.ai/api/image/Z5fajtgGlUAkMdME/contents.png" 
                alt="world map" 
                className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-center text-neutral-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-full mt-6 space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800">How can I view the photos?</h3>
              <p className="text-gray-600">Simply navigate through our gallery section where you can explore different categories of photos. Click on any image to view it in full size.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800">Can I purchase the images?</h3>
              <p className="text-gray-600">Yes, we offer high-resolution downloads of selected images. You can purchase them directly through our website.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800">Are the images free to use?</h3>
              <p className="text-gray-600">While we offer free previews, the images are copyrighted. Please check our licensing terms for details on how you can use the images.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800">Do you provide custom photography services?</h3>
              <p className="text-gray-600">Yes, we offer custom photography services. Contact us directly to discuss your needs and get a quote.</p>
            </div>
          </div>
        </div>
      </div>

    );
  };

export default AboutUsPage;