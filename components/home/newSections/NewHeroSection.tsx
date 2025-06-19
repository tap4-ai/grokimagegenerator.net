'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

export default function NewHeroSection() {
  const t = useTranslations('Home.heading');
  // const [imgLoaded, setImgLoaded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return () => {};

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // setImgLoaded(true);
          videoEl.play();
        } else {
          videoEl.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    observer.observe(videoEl);

    const onCanPlay = () => {
      setIsVideoReady(true);
      videoEl?.play();
    };

    const handleProgress = () => {
      if (videoEl && videoEl.duration > 0) {
        setProgress((videoEl.currentTime / videoEl.duration) * 100);
      }
    };

    videoEl?.addEventListener('canplay', onCanPlay);
    videoEl?.addEventListener('timeupdate', handleProgress);

    if (videoEl && videoEl?.readyState >= 3) {
      videoEl.play();
    }

    return () => {
      videoEl?.removeEventListener('canplay', onCanPlay);
      videoEl?.removeEventListener('timeupdate', handleProgress);
    };
  }, []);

  return (
    <section className='relative w-full max-w-pc rounded-xl px-3 lg:h-[640px] lg:rounded-36 lg:px-0'>
      <img
        src='https://c.topshort.org/fluxpro/home_2/v2/top_image.webp'
        alt={t('title')}
        // onLoad={() => setImgLoaded(true)}
        className={cn(
          'inset-0 left-1/2 rounded-inherit bg-white/10 lg:absolute lg:h-full lg:-translate-x-1/2',
          isVideoReady && 'hidden',
        )}
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        src='https://c.topshort.org/fluxpro/home_2/v2/top_video.mp4'
        className={cn(
          'inset-0 left-1/2 z-10 rounded-inherit lg:absolute lg:h-full lg:-translate-x-1/2',
          !isVideoReady && 'size-0 opacity-0',
        )}
      />
      <div
        className={cn(
          'absolute left-1/2 top-[172px] z-50 hidden h-1 w-full -translate-x-1/2 rounded-full px-9 lg:bottom-0 lg:top-auto lg:block',
        )}
      >
        <div className='size-full overflow-hidden rounded-inherit bg-white'>
          <div className='h-full bg-gradient-main' style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className='static bottom-3 left-1/2 z-20 flex flex-col items-center justify-center gap-3 bg-black/40 p-5 backdrop-blur-md lg:absolute lg:min-w-[760px] lg:-translate-x-1/2 lg:rounded-36'>
        <h1 className='text-gradient-main text-nowrap text-2xl font-semibold lg:text-5xl'>{t('title')}</h1>
        <p className='text-center text-sm'>{t('content')}</p>
        <div className='flex flex-col items-center gap-3 lg:flex-row'>
          <Link
            href='/flux-ai-image-generator'
            className='flex-center group relative h-10 gap-1 text-nowrap rounded-lg bg-gradient-main px-5 font-semibold text-black lg:px-3'
          >
            {t('flux-image')}
            <ArrowRight className='rotate-0 text-black/40 transition group-hover:-rotate-45 group-hover:text-black' />
          </Link>
          <Link
            href='/flux-video-ai'
            className='flex-center group relative h-10 gap-1 text-nowrap rounded-lg bg-gradient-main px-5 font-semibold text-black lg:px-3'
          >
            {t('flux-video')}
            <ArrowRight className='rotate-0 text-black/40 transition group-hover:-rotate-45 group-hover:text-black' />
          </Link>
        </div>
      </div>
    </section>
  );
}
