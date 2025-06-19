'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import LoadingDots from '../LoadingDots';

export default function MessageLoading() {
  const t = useTranslations('components.chat-image-editor-form');

  return (
    <div className='flex flex-col gap-3'>
      <img src='/images/logo.png' alt='logo' className='size-8 rounded-lg bg-[#1A1A1A]' />
      <p>{t('generating')}</p>
      <div className='w-fit rounded-lg border border-white/5 bg-white/10 px-5 py-4'>
        <LoadingDots />
      </div>
    </div>
  );
}
