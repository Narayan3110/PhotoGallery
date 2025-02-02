import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';

import g1 from '@/assets/photos/homePage/g1.jpg';
import g2 from '@/assets/photos/homePage/g2.jpg'; 
import g3 from '@/assets/photos/homePage/g3.jpg'; 



import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const images = [g1,g2,g3];

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className='w-full ' 
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {/* {Array.from({ length: 5 }).map((_, index) => ( */}
        {images.map((image, index) =>(
          <CarouselItem key={index} className='flex-shrink-0 w-full md:w-1/3 ' >
            <div className='p-1 flex align-center justify-center  '>
              <Card className='w-full h-80 '>
                <CardContent className='flex  items-center justify-center h-full '>
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className='w-full h-full object-cover '
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
