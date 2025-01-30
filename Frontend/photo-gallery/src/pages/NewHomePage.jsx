import {
  FaPlayCircle,
  FaCloudUploadAlt,
  FaSort,
  FaRegShareSquare,
} from 'react-icons/fa';
import { FcOrganization, FcShare } from 'react-icons/fc';
import { RiMemoriesFill } from 'react-icons/ri';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';

// import Rectangle from '@/assets/photos/homePage/Rectangle.png';
import Header from '@/assets/photos/homePage/Header.png';
import user1 from '@/assets/photos/homePage/users/user1.jpg';
import user2 from '@/assets/photos/homePage/users/user2.jpg';
import Head from '@/assets/photos/homePage/head.png';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CarouselPlugin } from '@/components/CarouselPlugin';




const NewHomePage = () => {
  const steps = [
    {
      icon: <FaCloudUploadAlt className='text-white text-xl' />,
      title: '📍 Upload Photos',
      description: 'Select and upload your favorite moments effortlessly.',
      color: 'bg-yellow-500',
    },
    {
      icon: <FaSort className='text-white text-xl' />,
      title: '💳 Customize & Sort ',
      description:
        'Arrange, edit, and personalize your gallery to match your style.',
      color: 'bg-red-500',
    },
    {
      icon: <FaRegShareSquare className='text-white text-xl' />,
      title: '🚀 Share & Relive',
      description:
        'Easily share your collection and revisit cherished memories anytime',
      color: 'bg-blue-500',
    },
  ];
  return (
    <div>
      <section className='relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 bg-white'>
        <div className='max-w-lg space-y-6'>
          <h3 className='text-orange-600 font-bold uppercase text-sm'>
            📸 Explore Stunning Moments Around the World
          </h3>
          <h1 className='text-5xl font-extrabold text-gray-900 leading-tight'>
            Capture,{' '}
            <span className='relative'>
              cherish
              <span className='absolute -bottom-2 left-0 w-full h-2 bg-orange-400'></span>
            </span>{' '}
            and relive your best memories
          </h1>
          <p className='text-gray-600'>
            Every picture tells a story—immerse yourself in breathtaking
            landscapes, vibrant cultures, and unforgettable experiences. Let
            your gallery be a window to the world
          </p>
          <div className='flex items-center space-x-6'>
            <Button className='bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-all'>
              Find out more
            </Button>
            <button className='flex items-center space-x-2 text-gray-900 hover:text-orange-600 transition-all'>
              <FaPlayCircle className='w-6 h-6 text-white' />
              <span>Play Demo</span>
            </button>
          </div>
        </div>
        <div className='relative mt-10 md:mt-0'>
          <img
            src={Head}
            alt='Traveler'
            width={500}
            height={500}
            className='rounded-lg'
          />
        </div>
      </section>

      {/* {Second Secton} */}

      <section className='py-16 bg-gray-50 text-center'>
        <h3 className='text-gray-500 uppercase tracking-widest'>Category</h3>
        <h2 className='text-4xl font-extrabold text-gray-900 mb-12'>
          🚀 We Offer the Best Features
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10 max-w-5xl mx-auto'>
          <div className='flex flex-col items-center text-gray-800'>
            {/* <Image src='/satellite.png' alt='Weather' width={60} height={60} /> */}
            {/* <img src={satellite} /> */}
            <FcOrganization className='w-16 h-18 ' />
            <h4 className='text-lg font-bold mt-4'>📷 Smart Organization</h4>
            <p className='text-gray-600'>
              Effortlessly categorize and find your photos with intelligent
              tagging and albums.
            </p>
          </div>
          <div className='flex flex-col items-center text-gray-800'>
            {/* <Image src={satellite} alt='Best Flights' width={60} height={60} /> */}
            {/* <img src={satellite} /> */}
            <FcShare className='w-16 h-18 ' />
            <h4 className='text-lg font-bold mt-4'>🌍 Seamless Sharing</h4>
            <p className='text-gray-600'>
              Share your favorite moments instantly with friends and family,
              anytime, anywhere.
            </p>
          </div>
          <div className='flex flex-col items-center text-gray-800'>
            {/* <Image
            //   src='/microphone.png'
              alt='Local Events'
              width={60}
              height={60}
            /> */}

            {/* <img src={satellite} /> */}
            <RiMemoriesFill className='w-16 h-18 text-red-600' />
            <h4 className='text-lg font-bold mt-4'>🎉 Memories Reimagined</h4>
            <p className='text-gray-600'>
              Relive past experiences with AI-powered highlights and
              storytelling.
            </p>
          </div>
          <div className='flex flex-col items-center text-gray-800'>
            {/* <Image
            //   src='/customization.png'
              alt='Customization'
              width={60}
              height={60}
            /> */}
            {/* <img src={satellite} /> */}
            <HiOutlineWrenchScrewdriver className='w-16 h-18 ' />
            <h4 className='text-lg font-bold mt-4'>🎨 Customization</h4>
            <p className='text-gray-600'>
              Personalize your gallery with themes, layouts, and creative
              editing tools.
            </p>
          </div>
        </div>
      </section>

      {/* {Top DestinationCard} */}
      <section className='text-center flex item-center justify-center py-12 px-4 '>
        <div className='w-full max-w-4xl'>
          {' '}
          {/* Adjust max width as needed */}
          <CarouselPlugin />
        </div>
      </section>

      {/* {How to us App Section Part} */}
      <section className='py-16 px-6 lg:px-20  text-white flex flex-col lg:flex-row items-center lg:items-start gap-12'>
        <div className='flex-1 max-w-lg'>
          <h3 className='text-lg font-semibold text-gray-400'>
            Simple & Quick
          </h3>
          <h2 className='text-4xl font-bold text-black mt-2'>
            📸 Organize Your Gallery in 3 Easy Steps
          </h2>
          <div className='mt-6 space-y-6'>
            {steps.map((step, index) => (
              <div key={index} className='flex items-start gap-4'>
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-md ${step.color}`}
                >
                  {step.icon}
                </div>
                <div>
                  <h4 className='text-xl font-semibold'>{step.title}</h4>
                  <p className='text-gray-400 text-sm mt-1'>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex-1 max-w-lg '>
          <img src={Header} alt='image ' />
        </div>

        {/* <Card className='bg-white text-black rounded-2xl shadow-lg max-w-sm'>
          <img
            src={Rectangle}
            alt='Trip to Greece'
            className='rounded-t-2xl w-full h-52 object-cover'
          />
          <CardContent>
            <h3 className='text-lg font-semibold'>Trip To Greece</h3>
            <p className='text-gray-500 text-sm'>14-29 June | by Robbin j</p>
            <div className='flex justify-between items-center mt-3'>
              <p className='text-gray-600 text-sm'>24 people going</p>

              <button className='text-red-500 text-xl'>&hearts;</button>
            </div>
          </CardContent>
        </Card> */}

        {/* <Card className='absolute bg-white text-black rounded-xl shadow-md p-4 w-60 -bottom-10 lg:bottom-auto lg:right-10'>
          <h4 className='text-gray-500 text-sm'>Ongoing</h4>
          <h3 className='text-lg font-semibold'>Trip to Rome</h3>
          <Progress value={40} className='mt-2' />
        </Card> */}
      </section>

      <section>
        <div className='bg-white py-16 sm:py-24 lg:py-32'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2 className='text-3xl font-extrabold text-gray-900 sm:text-4xl'>
              What People Say About Us.
            </h2>
            <div className='mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Testimonial Card 1 */}
              <Card className='relative p-6 text-left bg-gray-50 shadow-md rounded-2xl'>
                <div className='flex items-center space-x-4'>
                  <img
                    src={user1}
                    alt='Profile picture of Mike Taylor'
                    className='w-12 h-12 rounded-full object-cover'
                  />
                  <div>
                    <p className='font-bold text-lg'>Mike Taylor</p>
                    <p className='text-sm text-gray-500'>Lahore, Pakistan</p>
                  </div>
                </div>
                <CardContent className='mt-4 text-gray-700'>
                  <p>
                    “On the Windows talking painted pasture yet its express
                    parties use. Sure last upon he same as knew next. Of
                    believed or diverted no.”
                  </p>
                </CardContent>
              </Card>
              {/* Testimonial Card 2 */}
              <Card className='relative p-6 text-left bg-gray-50 shadow-md rounded-2xl'>
                <div className='flex items-center space-x-4'>
                  <img
                    src={user2}
                    alt='Profile picture of Chris Thomas'
                    className='w-12 h-12 rounded-full object-cover'
                  />
                  <div>
                    <p className='font-bold text-lg'>Chris Thomas</p>
                    <p className='text-sm text-gray-500'>CEO of Red Button</p>
                  </div>
                </div>
                <CardContent className='mt-4 text-gray-700'>
                  <p>
                    “Their work is truly exceptional and transformed our
                    business!”
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='mt-8 flex justify-center space-x-2'>
              <Button className='w-3 h-3 bg-blue-600 rounded-full'></Button>
              <Button className='w-3 h-3 bg-gray-400 rounded-full'></Button>
              <Button className='w-3 h-3 bg-gray-400 rounded-full'></Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewHomePage;
