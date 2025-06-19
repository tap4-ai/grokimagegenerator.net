'use client';

import { ComponentProps, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import Play from '../svg/video/Play';

export default function Video({
  src,
  className,
  videoClassName,
  ...props
}: ComponentProps<'video'> & { videoClassName?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  };

  const onClick = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  return (
    <div
      className={cn('group/video relative flex h-auto w-full items-center justify-center overflow-hidden', className)}
    >
      <video
        onClick={onClick}
        onMouseEnter={playVideo}
        onMouseLeave={pauseVideo}
        ref={videoRef}
        src={src}
        className={cn('h-full w-full object-cover hover:cursor-pointer', videoClassName)}
        muted
        loop
        playsInline
        {...props}
      />
      <Play
        className={cn(
          'absolute-center pointer-events-none absolute z-30 opacity-100 transition-opacity duration-200',
          isPlaying ? 'opacity-0' : 'opacity-100',
        )}
      />
    </div>
  );
}
