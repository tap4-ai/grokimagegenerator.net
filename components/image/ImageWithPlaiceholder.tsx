'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import Loading from '../Loading';

export default function ImageWithPlaiceholder({
  src,
  className,
  alt,
  title,
}: {
  src: string;
  className?: string;
  alt: string;
  title: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <figure
      className={cn(
        'group relative w-full overflow-hidden rounded-xl',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      <img className='w-full transition-all duration-200 group-hover:scale-125' onLoad={onLoad} src={src} alt={alt} />
      <div
        className={cn(
          'absolute inset-0 -z-10 h-auto w-full bg-[#26232D]',
          // isLoaded ? 'opacity-0' : 'opacity-100',
          // 'transition-all duration-300 ease-out',
        )}
      >
        <div className='flex-xy-center h-full min-h-[300px] w-full'>
          <Loading className='h-[35px] w-[50px]' />
        </div>
      </div>
      <figcaption className='absolute bottom-0 left-0 w-full p-2'>
        <div className='flex w-full flex-col rounded-lg bg-black/40 p-2'>
          <span className='line-clamp-1 text-xs'>{title}</span>
        </div>
      </figcaption>
    </figure>
  );
}
