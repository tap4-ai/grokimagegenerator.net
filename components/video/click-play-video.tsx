'use client';

import { ComponentProps, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function ClickPlayVideo({
  src,
  className,
  videoClassName,
  ...props
}: ComponentProps<'video'> & { videoClassName?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  const loadVideo = () => {
    if (videoRef.current) {
      videoRef.current.preload = 'metadata';
    }
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
      onMouseEnter={loadVideo}
      className={cn(
        'group/video relative flex h-auto w-full items-center justify-center overflow-hidden rounded-[inherit]',
        className,
      )}
    >
      <div className='pointer-events-none absolute right-2 top-2 z-10 flex items-center justify-center'>
        {isPlaying ? <Pause className='size-5' /> : <Play className='size-5' />}
      </div>
      <video
        onClick={onClick}
        ref={videoRef}
        src={src}
        className={cn('h-full w-full rounded-[inherit] object-cover hover:cursor-pointer', videoClassName)}
        muted
        loop
        playsInline
        preload='none'
        {...props}
      />
    </div>
  );
}
