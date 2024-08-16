'use client';

/* eslint-disable @typescript-eslint/indent */
// import Link from 'next/link';
import { ComponentProps } from 'react';
import { ImageResponseVo } from '@/network/prompt-market/server';
import { Masonry } from 'react-plock';

import { cn } from '@/lib/utils';
import { Link } from '@/app/navigation';

import ImageWithPlaiceholder from './ImageWithPlaiceholder';

type Props = {
  imageList: ImageResponseVo[];
  route: string;
  className?: string;
  imageClassName?: string;
  config?: ComponentProps<typeof Masonry>['config'];
};

export default function ImageMasonry({ imageList, route, className, imageClassName, config }: Props) {
  return (
    <Masonry
      items={imageList}
      className={cn(className)}
      config={
        config || {
          columns: [2, 6],
          gap: [12, 20],
          media: [768, 1709],
        }
      }
      render={(image, idx) => (
        <Link key={image.id} href={`${route}/${image.id}`} className='w-full'>
          <ImageWithPlaiceholder
            key={idx}
            src={image.thumbnailUrl}
            alt={image.title}
            title={image.title}
            className={imageClassName}
          />
        </Link>
      )}
    />
  );
}
