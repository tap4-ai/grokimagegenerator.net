'use client';

import React, { ComponentProps, memo, useCallback, useRef, useState } from 'react';
import { VideoResponseType } from '@/network/video/useVideoHistory';
import { Download, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { downloadFile } from '@/lib/utils/fileUtils';
import { formatDuration, formatTime } from '@/lib/utils/timeUtils';
import { Link } from '@/i18n/navigation';

import Play from '../svg/video/Play';
import BottomBtn from './BottomBtn';
import VideoExtendBtn from './VideoExtendBtn';
import VideoFail from './VideoFail';
import VideoProcessing from './VideoProcessing';

interface VideoCardProps {
  videoUrl: string;
  videoFirstFrame?: string | null;
  videoStatus?: VideoResponseType['status'];
  prompt: string;
  className?: string;
  showBtns?: boolean;
  route: string;
  id: string;
  createAt?: number;
  duration?: number;
  onDelete: (id: string) => void;
  showVideoExtendBtn?: boolean;
  showDelete?: boolean;
  onRefresh?: ComponentProps<typeof VideoProcessing>['onRefresh'];
}

function VideoCard({
  videoUrl,
  videoStatus,
  prompt,
  className,
  showBtns = true,
  route,
  id,
  createAt,
  videoFirstFrame,
  duration,
  onDelete,
  showVideoExtendBtn = false,
  showDelete = false,
  onRefresh,
}: VideoCardProps) {
  const t = useTranslations('flux-video-ai.creation-list');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleDownload = useCallback(() => {
    const fileName = videoUrl.split('/').pop() || '';
    downloadFile(videoUrl, fileName);
  }, [videoUrl]);

  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-xl bg-card-black p-2',
        videoUrl && 'gap-2',
        className,
      )}
    >
      {(videoStatus === 'pending' || videoStatus === 'processing') && createAt && (
        <VideoProcessing createAt={createAt} onRefresh={onRefresh} />
      )}
      {videoStatus === 'fail' && <VideoFail />}
      {(!videoStatus || videoStatus === 'completed') && (
        <Link
          href={`${route}/${id}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className='group relative w-full overflow-hidden rounded-lg border-2 border-[#221111] bg-main-gray'
        >
          {videoFirstFrame && (
            <Play className='absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 opacity-100 transition-all duration-150 group-hover:opacity-0' />
          )}
          <img
            src={videoFirstFrame || '/images/video/video-fallback.jpg'}
            alt='Video thumbnail'
            className='h-auto w-full object-contain opacity-100 transition-opacity duration-150 group-hover:opacity-0'
          />
          {isPlaying && (
            <video
              ref={videoRef}
              src={videoUrl}
              muted
              playsInline
              loop
              autoPlay
              preload='metadata'
              className='absolute inset-0 z-20 h-auto w-full object-contain opacity-0 transition-opacity duration-150 group-hover:opacity-100'
            />
          )}
        </Link>
      )}
      <div className='flex flex-col gap-2'>
        <div className='text-sm'>
          <div className='flex items-center justify-between text-white/40'>
            <span>{createAt ? formatTime(createAt, 'YYYY-MM-DD') : ''}</span>
            <span>{duration ? formatDuration(duration) : ''}</span>
          </div>
          <p className='line-clamp-2 text-white/70' title={prompt}>
            {prompt}
          </p>
        </div>
        {showBtns && (
          <div className='flex items-center justify-end gap-1'>
            {showDelete && (
              <button type='button' onClick={() => onDelete(id)} className='mr-auto'>
                <Trash2 className='size-4 text-white/40' />
                <span className='sr-only'>delete</span>
              </button>
            )}
            {showVideoExtendBtn && videoUrl && <VideoExtendBtn text={t('extend')} videoUrl={videoUrl} videoId={id} />}
            {videoUrl && (
              <BottomBtn onClick={handleDownload}>
                <Download className='size-4' />
                {t('download')}
              </BottomBtn>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

VideoCard.displayName = 'VideoCard';

export default memo(VideoCard);
