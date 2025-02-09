import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';

import g1 from '@/assets/photos/homePage/g1.jpg';
import g2 from '@/assets/photos/homePage/g2.jpg';
import g3 from '@/assets/photos/homePage/g3.jpg';
import g4 from '@/assets/photos/homePage/g4.jpg';
import g5 from '@/assets/photos/homePage/g5.jpg';
import g6 from '@/assets/photos/homePage/g6.jpg';
import g7 from '@/assets/photos/homePage/g7.jpg';
import g8 from '@/assets/photos/homePage/g8.jpg';
import g9 from '@/assets/photos/homePage/g9.jpg';
import g10 from '@/assets/photos/homePage/g10.jpg';
import g11 from '@/assets/photos/homePage/g11.jpg';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const images = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11];

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <div className='relative w-full mx-auto p-4 object-contain md:object-cover'>
      <Carousel
        plugins={[plugin.current]}
        className='w-full rounded-lg shadow-lg overflow-hidden object-center'
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className='flex'>
          {images.map((image, index) => (
            <CarouselItem key={index} className='flex-shrink-0 w-full md:w-1/3'>
              <Card className='w-full h-96 overflow-hidden rounded-lg'>
                <CardContent className='flex items-center justify-center h-full p-3'>
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className='w-full h-full object-cover rounded-lg transition-transform transform'
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute left-2 top-1/2 transform -translate-y-1/2 z-10' />
        <CarouselNext className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10' />
      </Carousel>
    </div>
  );
}
