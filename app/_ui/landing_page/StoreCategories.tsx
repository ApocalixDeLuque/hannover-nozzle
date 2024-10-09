'use client';

import React, { useState } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';

interface ExpandingSectionProps {
  title: string;
  image: string;
  href: string;
  isFirst?: boolean;
  isLast?: boolean;
  showOverlay?: boolean;
  onHover: (title: string | null) => void;
}

export function StoreCategories(): JSX.Element {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const handleHover = (title: string | null) => {
    setHoveredSection(title);
  };

  return (
    <div className="flex flex-col min-h-fit w-full bg-light text-dark items-center justify-between gap-20 py-20">
      <div className="flex flex-col w-full px-5">
        <p className="text-[64px] font-extrabold uppercase leading-[100%] tracking-tight">Visita nuestra tienda</p>
        <div className="flex text-2xl font-extrabold">
          <ExpandingSection
            title="Modelos 3D"
            image="/store/models.webp"
            href="/"
            isFirst
            showOverlay={hoveredSection !== null && hoveredSection !== 'Modelos 3D'}
            onHover={handleHover}
          />
          <ExpandingSection
            title="Filamentos"
            image="/store/filaments.webp"
            href="/"
            showOverlay={hoveredSection !== null && hoveredSection !== 'Filamentos'}
            onHover={handleHover}
          />
          <ExpandingSection
            title="Resinas"
            image="/store/resins.webp"
            href="/"
            showOverlay={hoveredSection !== null && hoveredSection !== 'Resinas'}
            onHover={handleHover}
          />
          <ExpandingSection
            title="Refacciones"
            image="/store/spare-parts.webp"
            href="/"
            isLast
            showOverlay={hoveredSection !== null && hoveredSection !== 'Refacciones'}
            onHover={handleHover}
          />
        </div>
      </div>
    </div>
  );
}

const ExpandingSection: React.FC<ExpandingSectionProps> = ({
  title,
  image,
  href,
  isFirst,
  isLast,
  showOverlay,
  onHover,
}) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        className="flex flex-col gap-2.5 group relative overflow-hidden cursor-pointer"
        initial={{ flex: 1 }}
        whileHover={{ flex: 2 }}
        onMouseEnter={() => onHover(title)}
        onMouseLeave={() => onHover(null)}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={cn('h-[500px] overflow-clip relative', {
            'rounded-tl-lg rounded-bl-lg': isFirst,
            'rounded-tr-lg rounded-br-lg': isLast,
          })}
          transition={{ duration: 0.2 }}
        >
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300"
          />
          <div
            className={cn('absolute inset-0 bg-black transition-opacity duration-300', {
              'opacity-40': showOverlay,
              'opacity-0': !showOverlay,
            })}
          />
        </motion.div>
        <div className="flex items-center gap-2.5">
          <p>{title}</p>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2"
          />
        </div>
      </motion.a>
    </Link>
  );
};

export default StoreCategories;
