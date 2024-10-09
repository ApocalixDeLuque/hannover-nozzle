import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../global/components/Carousel';
import InfiniteText from './components/InfiniteText';
interface FeaturedCardProps {
  title: string[];
  image: string;
}

export function Featured(): JSX.Element {
  return (
    <div className="flex flex-col min-h-fit w-full bg-light text-dark items-center justify-between gap-20 py-20">
      <InfiniteText />
      <div className="w-full px-5">
        <Carousel opts={{ align: 'start', loop: true }}>
          <CarouselContent>
            {[
              { title: ['Stand para Audífonos'], image: '/pitch/product_1.jpg' },
              { title: ['Llavero con Código QR'], image: '/pitch/product_2.jpg' },
            ].map((item, index) => (
              <CarouselItem key={index} className="basis-1/4 pl-0">
                <FeaturedCard title={item.title} image={item.image} />
              </CarouselItem>
            ))}
            <CarouselItem className="basis-1/4">
              <FeaturedCard title={[' ', 'TRLT Makers', 'Kit de Robótica para jóvenes']} image="/kit.webp" />
            </CarouselItem>
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default function FeaturedCard({ title, image }: FeaturedCardProps): JSX.Element {
  return (
    <div className="w-[400px] h-[300px] rounded-lg overflow-hidden relative group border border-dark">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/40" />
      <p className="absolute bottom-5 left-[18px] right-[18px] flex justify-start items-center gap-2.5 text-xl font-bold leading-tight text-light">
        {title.map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}
