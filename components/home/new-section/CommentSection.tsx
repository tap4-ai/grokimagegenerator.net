'use client';

import React, { useCallback, useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';

import RatingStars from '@/components/common/RatingStars';

type PropType = {
  slides: {
    name: string;
    title: string;
    rating: string;
    comment: string;
  }[];
  options?: EmblaOptionsType;
  title: string;
  subtitle: string;
};

interface CommentCardProps {
  name: string;
  title: string;
  rating: number;
  comment: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ name, title, rating, comment }) => {
  return (
    <div className='flex h-full flex-col gap-9 rounded-xl bg-[#202020] p-[18px]'>
      <div className='flex items-start justify-between'>
        <div className='flex items-end gap-5'>
          <div className='h-[77px] w-[77px] shrink-0 rounded-full bg-white' />
          <div className='flex flex-col gap-1.5'>
            <h3 className='text-base leading-6 font-semibold tracking-[0.64px] text-white capitalize'>{name}</h3>
            <p className='text-sm leading-[21px] font-normal tracking-[0.56px] text-[rgba(255,255,255,0.7)] capitalize'>
              {title}
            </p>
          </div>
        </div>
        <div className='shrink-0'>
          <RatingStars value={rating} sizeClass='w-5 h-5' />
        </div>
      </div>
      <div className='text-sm leading-[21px] font-normal tracking-[0.56px] text-[rgba(255,255,255,0.7)] capitalize'>
        &quot;{comment}&quot;
      </div>
    </div>
  );
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options = {}, title, subtitle } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      dragFree: true,
      loop: true,
      containScroll: 'trimSnaps',
      watchDrag: true,
      ...options,
    },
    [
      AutoScroll({
        playOnInit: true,
        stopOnInteraction: true,
        startDelay: 200,
        speed: 0.8,
      }),
    ],
  );

  const onPointerUp = useCallback(() => {
    if (emblaApi) {
      setTimeout(() => {
        emblaApi.plugins().autoScroll.play();
      }, 1000);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('pointerUp', () => emblaApi.plugins().autoScroll.play());
    }

    return () => {
      if (emblaApi) {
        emblaApi.off('pointerUp', onPointerUp);
      }
    };
  }, [emblaApi, onPointerUp]);

  return (
    <div className='container-centered container-py'>
      <div className='mb-4 md:mb-8'>
        <h2 className='text-center text-[32px] leading-[36px] font-semibold tracking-[0.06em] text-white capitalize md:text-[48px] md:leading-[54px] md:tracking-[0.04em]'>
          {title}
        </h2>
        <p className='mt-1 text-center text-base leading-6 font-normal tracking-[0.04em] text-[#b8b8b8] capitalize md:text-center md:text-base md:leading-6 md:tracking-[0.04em] md:capitalize'>
          {subtitle}
        </p>
      </div>

      <div
        className='relative w-full overflow-hidden before:absolute before:top-0 before:left-0 before:z-10 before:hidden before:h-full before:w-[30%] before:bg-gradient-to-r before:from-[#141414] before:to-transparent after:absolute after:top-0 after:right-0 after:z-10 after:hidden after:h-full after:w-[30%] after:bg-gradient-to-l after:from-[#141414] after:to-transparent md:before:block md:after:block'
        ref={emblaRef}
      >
        <div className='flex touch-pan-y touch-pinch-zoom items-stretch'>
          {slides.map((review, index) => (
            <div className='shrink-0 basis-full transform-gpu pl-6 select-none md:basis-[35%]' key={index}>
              <CommentCard
                name={review.name}
                title={review.title}
                rating={parseFloat(review.rating)}
                comment={review.comment}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
