'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import Spinning from '@/components/Spinning';

interface VideoProcessingProps {
  createAt: number;
  onRefresh?: () => void;
}

function VideoProcessing({ createAt, onRefresh }: VideoProcessingProps) {
  const t = useTranslations('flux-video-ai.creation-list');
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = Math.max(5 * 60 * 1000 - dayjs().diff(createAt), 0);
    const timer = setTimeout(() => {
      setShowButton(true);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [createAt]);

  const onClick = useCallback(async () => {
    setLoading(true);
    if (onRefresh) {
      await onRefresh();
    }
    setLoading(false);
  }, [onRefresh]);

  return (
    <div className='flex h-[180px] w-full shrink-0 flex-col items-center justify-center rounded-lg bg-black text-center text-sm text-white/40'>
      {showButton ? (
        <button
          disabled={loading}
          type='button'
          onClick={onClick}
          className='h-9 rounded-full bg-[#333] px-3 text-white'
        >
          {loading ? <Spinning className='size-4' /> : t('refresh')}
        </button>
      ) : (
        <Spinning className='size-5' />
      )}
      <div>{t('processing')}</div>
      <div>{showButton ? t('wait 5 min') : t('wait')}</div>
    </div>
  );
}

VideoProcessing.displayName = 'VideoProcessing';

export default memo(VideoProcessing);
