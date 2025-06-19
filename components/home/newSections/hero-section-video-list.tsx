'use client';

/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { numberList } from '@/lib/utils/arrayUtils';
import useInView from '@/hooks/useInView';
import { Link } from '@/i18n/navigation';

const list = numberList(4);

function VideoList({
  selectedVideoId,
  setSelectedVideoId,
  className,
}: {
  selectedVideoId: number;
  setSelectedVideoId: (id: number) => void;
  className?: string;
}) {
  // const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollContainerRef, inView] = useInView();

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer && inView) {
      const selectedButton = scrollContainer.querySelector(`button:nth-child(${selectedVideoId})`);
      selectedButton?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [scrollContainerRef, selectedVideoId, inView]);

  return (
    <div
      ref={scrollContainerRef}
      className={cn(
        'no-scrollbar flex w-full gap-1 overflow-x-auto scroll-smooth rounded-lg lg:overflow-x-hidden',
        className,
      )}
    >
      {list.map((num) => (
        <button
          key={num}
          type='button'
          onClick={() => setSelectedVideoId(num)}
          className={cn(
            'mt-auto shrink-0 snap-center first:ml-auto last:mr-auto',
            selectedVideoId === num ? 'z-10' : 'z-0',
          )}
        >
          <img
            src={`https://c.topshort.org/fluxpro/home_2/top_video/${num}.webp`}
            alt={num.toString()}
            loading='eager'
            decoding='async'
            fetchPriority='high'
            className={cn(
              'h-[90px] w-[160px] rounded-lg border border-transparent transition-all duration-100 ease-linear',
              selectedVideoId === num ? 'border-white' : 'hover:scale-105',
            )}
          />
        </button>
      ))}
    </div>
  );
}

export default function HeroSectionVideoList() {
  const t = useTranslations('Home.heading');
  const [selectedVideoId, setSelectedVideoId] = useState(1);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const preloadVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Calculate the ID of the next video
  const getNextVideoId = useCallback(
    () => (selectedVideoId === list.length ? 1 : selectedVideoId + 1),
    [selectedVideoId],
  );

  // Preload the next video
  useEffect(() => {
    if (!isPlaying) return;

    const nextVideoId = getNextVideoId();
    if (preloadVideoRef.current) {
      preloadVideoRef.current.src = `https://c.topshort.org/fluxpro/home_2/top_video/${nextVideoId}.mp4`;
      preloadVideoRef.current.load();
    }
  }, [selectedVideoId, isPlaying, getNextVideoId]);

  useEffect(() => {
    const videoEl = videoRef.current;
    const sectionEl = sectionRef.current;

    const playNextVideo = () => {
      if (isPlaying) {
        setIsVideoReady(false);
        setSelectedVideoId(selectedVideoId === list.length ? 1 : selectedVideoId + 1);
      }
    };

    const isElementInViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    const onCanPlay = () => {
      setIsVideoReady(true);
      if (sectionEl && isElementInViewport(sectionEl)) {
        videoEl?.play().then(() => setIsPlaying(true));
      }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().then(() => setIsPlaying(true));
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      });
    };

    videoEl?.addEventListener('canplay', onCanPlay);
    videoEl?.addEventListener('ended', playNextVideo);

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    if (sectionEl) {
      observer.observe(sectionEl);
    }

    // Play video immediately if it's already loaded
    if (videoEl && videoEl?.readyState >= 3) {
      videoEl.play();
    }

    return () => {
      videoEl?.removeEventListener('ended', playNextVideo);
      videoEl?.removeEventListener('canplay', onCanPlay);
      if (sectionEl) {
        observer.unobserve(sectionEl);
      }
      observer.disconnect();
    };
  }, [selectedVideoId, isPlaying]);

  return (
    <section
      ref={sectionRef}
      className='mx-auto mb-[110px] flex w-full flex-col items-center gap-5 px-3 lg:mb-0 lg:px-0'
    >
      <div className='flex w-full max-w-5xl flex-col items-center text-center'>
        <h1 className='font-montserrat text-gradient-main text-2xl font-semibold lg:text-5xl'>{t('title')}</h1>
        <h2 className='whitespace-pre-line text-base lg:text-lg'>{t('content')}</h2>
      </div>
      <div className='flex flex-col items-center gap-3 lg:flex-row'>
        <Link
          href='/flux-ai-image-generator'
          className='flex h-10 min-w-[243px] items-center justify-center rounded-full bg-gradient-main px-3 text-black hover:opacity-70'
        >
          {t('flux-image')}
        </Link>
        <Link
          href='/flux-video-ai'
          className='flex h-10 min-w-[243px] items-center justify-center rounded-full bg-gradient-main px-3 text-black hover:opacity-70'
        >
          {t('flux-video')}
        </Link>
      </div>
      <div className='relative mx-auto flex w-full items-center justify-center lg:w-[1038px]'>
        <img
          src={`https://c.topshort.org/fluxpro/home_2/top_video/${selectedVideoId}.webp`}
          alt={`Poster for video ${selectedVideoId}`}
          fetchPriority='high'
          decoding='async'
          loading='eager'
          className={cn(
            'absolute inset-0 h-[198px] w-full rounded-xl object-cover lg:h-[540px]',
            isVideoReady ? 'hidden' : 'block',
          )}
        />
        <video
          ref={videoRef}
          muted
          playsInline
          src={`https://c.topshort.org/fluxpro/home_2/top_video/${selectedVideoId}.mp4`}
          className='h-[198px] w-full rounded-xl bg-black lg:h-[540px]'
        />
        <video ref={preloadVideoRef} preload='auto' muted playsInline className='hidden' aria-hidden='true' />
      </div>
      <VideoList
        selectedVideoId={selectedVideoId}
        setSelectedVideoId={setSelectedVideoId}
        className='lg:mx-auto lg:w-[1038px]'
      />
    </section>
  );
}
