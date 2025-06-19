/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable arrow-body-style */

'use client';

import { memo, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useRouter } from '@/i18n/navigation';

const list = [
  {
    image: '/home/videos/1.png',
    path: '/flux-ai-image-generator',
  },
  {
    image: '/home/videos/2.png',
    video: '/home/videos/2.mp4',
    path: '/flux-video-ai',
  },
  {
    image: '/home/videos/3.png',
    video: '/home/videos/3.mp4',
    path: '/flux-video-ai',
  },
];

const VideoList = memo(
  ({
    selectedVideoId,
    setSelectedVideoId,
    className,
  }: {
    selectedVideoId: number;
    setSelectedVideoId: (id: number) => void;
    className?: string;
  }) => {
    return (
      <div
        className={cn(
          'no-scrollbar flex w-full gap-5 overflow-x-auto scroll-smooth lg:items-center lg:justify-center lg:overflow-x-hidden',
          className,
        )}
      >
        {list.map((item, index) => {
          const isSelected = selectedVideoId === index + 1;
          const id = index + 1;
          return (
            <button
              key={index}
              type='button'
              onClick={() => setSelectedVideoId(id)}
              className={cn('mt-auto shrink-0 snap-center', isSelected ? 'z-10' : 'z-0')}
            >
              <Image
                src={item.image}
                alt={`Image to Video AI Home top - ${id}`}
                width={160}
                height={90}
                loading='lazy'
                sizes='160px'
                className={cn(
                  'h-[90px] w-[160px] rounded-lg object-cover transition-all duration-100 ease-linear',
                  isSelected ? 'border-white' : 'border-transparent',
                  'border',
                )}
              />
            </button>
          );
        })}
      </div>
    );
  },
);

const getNextVideoId = (selectedVideoId: number) => {
  const nextId = selectedVideoId === list.length ? 1 : selectedVideoId + 1;
  return nextId;
};

export default function VideoListHeroSection() {
  const [selectedVideoId, setSelectedVideoId] = useState(1);

  const selectedItem = list[selectedVideoId - 1];
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = !!selectedItem.video;

  const router = useRouter();
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const handleLoadedData = () => {
      console.log('video loaded');
      setIsVideoReady(true);
      video.play();
    };
    video.addEventListener('loadeddata', handleLoadedData);
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const handleEnded = () => {
      setIsVideoReady(false);
      setSelectedVideoId(getNextVideoId(selectedVideoId));
    };
    if (hasVideo) {
      video.addEventListener('ended', handleEnded);
      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }

    const timeout = setTimeout(() => {
      setIsVideoReady(false);
      setSelectedVideoId(getNextVideoId(selectedVideoId));
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [selectedVideoId, hasVideo]);

  return (
    <div className='relative mx-auto flex w-full flex-col items-center justify-center gap-5 lg:w-[960px]'>
      <div
        onClick={() => router.push(selectedItem.path)}
        className='relative h-[198px] w-full cursor-pointer lg:h-[540px]'
      >
        <Image
          src={selectedItem.image}
          alt={`Free Image to Video AI Home top - ${selectedVideoId}`}
          priority
          width={1536}
          height={1024}
          className={cn(
            'absolute inset-0 z-10 h-full w-full rounded-xl object-cover',
            hasVideo && isVideoReady ? 'hidden' : 'block',
          )}
        />
        <video
          ref={videoRef}
          muted
          playsInline
          preload='auto'
          poster={selectedItem.image}
          src={selectedItem.video}
          className='absolute inset-0 h-full w-full rounded-xl bg-black'
          controlsList='nodownload'
          disablePictureInPicture
        />
      </div>

      <VideoList selectedVideoId={selectedVideoId} setSelectedVideoId={setSelectedVideoId} />
    </div>
  );
}
