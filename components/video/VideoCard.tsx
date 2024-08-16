'use client';

import { useRef } from 'react';

export default function VideoCard({
  src,
  type = 'video/mp4',
  tags,
  onClick,
}: {
  src: string;
  type?: string;
  tags?: string[];
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // const handleMouseEnter = () => {
  //   if (videoRef.current) {
  //     videoRef.current.play();
  //   }
  // };

  // const handleMouseLeave = () => {
  //   if (videoRef.current) {
  //     videoRef.current.pause();
  //     // videoRef.current.currentTime = 0; // Optional: Reset video to start
  //   }
  // };

  return (
    <button
      type='button'
      onClick={onClick}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      className='relative w-full'
    >
      <video
        ref={videoRef}
        // controls
        muted
        playsInline
        loop
        className='video pointer-events-none aspect-video w-full rounded-lg bg-black'
        width={320}
      >
        <source src={src} type={type} />
      </video>
      {tags?.length ? (
        <ul className='absolute bottom-0 left-0 z-10 flex w-fit items-center gap-2 p-2'>
          {tags.map((item) => (
            <li
              key={item}
              className='mt-auto flex h-[30px] items-center justify-center rounded border border-main-gray bg-black px-3 text-white/70 backdrop-blur-sm'
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </button>
  );
}
