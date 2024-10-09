'use client';

import { useState, useEffect, useRef } from 'react';
import LogoIcon from '../../global/components/LogoIcon';

export default function InfiniteText(): JSX.Element {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth / 2);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const content = (
    <div className="flex items-center gap-4 mx-8">
      <LogoIcon color="#0B0604" className="w-32 h-32" />
      <h1 className="text-[96px] font-extrabold uppercase whitespace-nowrap tracking-tight">¿Qué hacemos?</h1>
    </div>
  );

  return (
    <div className="w-full overflow-hidden bg-light text-dark">
      <div
        ref={carouselRef}
        className="carousel-content flex items-center"
        style={{
          width: `${width * 2}px`,
        }}
      >
        <div className="flex animate-scroll">
          {content}
          {content}
          {content}
          {content}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll ${width / 50}s linear infinite;
        }
      `}</style>
    </div>
  );
}
