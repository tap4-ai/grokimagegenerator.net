'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { numberList } from '@/lib/utils/arrayUtils';

interface ImageCompareProps {
  leftImage: string;
  rightImage: string;
  leftAlt?: string;
  rightAlt?: string;
  leftSize?: string;
  rightSize?: string;
  className?: string;
  code: string;
  href?: string;
}

export default function ImageCompare({
  leftImage,
  rightImage,
  leftAlt = 'Original',
  rightAlt = 'Upscaled',
  leftSize = '1.7MB',
  rightSize = '205KB',
  className = '',
  code,
  href = '/',
}: ImageCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // 百分比
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations(`${code}.comparision`);
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !containerRef.current) return;

      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    [isDragging],
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const sliderLeft = `${sliderPosition}%`;
  const leftClipPath = `inset(0 ${100 - sliderPosition}% 0 0)`;
  const rightClipPath = `inset(0 0 0 ${sliderPosition}%)`;

  return (
    <div className={cn('container-centered container-py', className)}>
      <div className='flex flex-col-reverse gap-4 rounded border border-[#2F2F2F] p-2 md:flex-row'>
        <div ref={containerRef} className='relative min-h-[200px] flex-1 overflow-hidden rounded-xl md:h-[409px]'>
          {/* 右侧图片（压缩后） */}
          <img
            src={rightImage}
            alt={rightAlt}
            className='absolute block h-full w-full object-cover'
            style={{
              clipPath: rightClipPath,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            draggable={false}
          />

          {/* 左侧图片（原图） */}
          <img
            src={leftImage}
            alt={leftAlt}
            className='absolute block h-full w-full object-cover'
            style={{
              clipPath: leftClipPath,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
            draggable={false}
          />

          {/* 拖拽滑块 */}
          <div
            className='absolute top-0 flex h-full cursor-ew-resize flex-col items-center justify-center'
            style={{
              left: sliderLeft,
              width: '40px',
              transform: 'translateX(-50%)',
              zIndex: 10,
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            role='slider'
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={sliderPosition}
            aria-label='Image comparison slider'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setSliderPosition(Math.max(0, sliderPosition - 1));
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                setSliderPosition(Math.min(100, sliderPosition + 1));
              }
            }}
          >
            {/* 上半部分的竖线 */}
            <div
              className='w-[5px] flex-1 bg-white'
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
              }}
            />

            {/* 中间的圆形控制器 */}
            <div className='flex h-auto w-auto flex-none items-center justify-center'>
              <div
                className='flex h-10 w-[5px] items-center justify-center bg-white'
                style={{
                  boxShadow:
                    'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
                }}
              >
                {/* 左箭头 */}
                <div
                  style={{
                    borderWidth: '11px',
                    borderStyle: 'inset solid inset inset',
                    borderColor: 'transparent rgb(255, 255, 255) transparent transparent',
                    height: '0px',
                    width: '0px',
                    marginLeft: '-40px',
                    marginRight: '18px',
                  }}
                />

                {/* 右箭头 */}
                <div
                  style={{
                    borderWidth: '11px',
                    borderStyle: 'inset inset inset solid',
                    borderColor: 'transparent transparent transparent rgb(255, 255, 255)',
                    height: '0px',
                    width: '0px',
                    marginRight: '-40px',
                  }}
                />
              </div>
            </div>

            {/* 下半部分的竖线 */}
            <div
              className='w-[5px] flex-1 bg-white'
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
              }}
            />
          </div>

          {/* 左侧标签 (ORIGINAL) */}
          <div className='absolute bottom-4 left-8 rounded bg-black/30 px-3 py-1 text-center text-xs tracking-wider text-white backdrop-blur-sm'>
            <div className='leading-[18px] font-semibold'>{t('original')}</div>
            <div className='leading-[18px] font-normal'>{leftSize}</div>
          </div>

          {/* 右侧标签 (TINIFY) */}
          <div className='text-color-main absolute top-4 right-8 rounded bg-black/30 px-3 py-1 text-center text-xs tracking-wider backdrop-blur-sm'>
            <div className='leading-[18px] font-semibold'>{t('tinify')}</div>
            <div className='leading-[18px] font-normal'>{rightSize}</div>
          </div>
        </div>

        {/* Right section with content */}
        <div className='flex flex-1 flex-col justify-between rounded-lg bg-white/5 p-5'>
          {/* Top content */}
          <div className='flex flex-col gap-5'>
            {/* Title and description */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-2xl leading-9 font-semibold tracking-[0.48px] text-white'>{t('title')}</h2>
              <p className='text-base leading-6 text-white/40'>{t('description')}</p>
            </div>

            {/* Features list */}
            <div className='flex flex-col gap-1'>
              {numberList(5).map((item) => (
                <div key={item} className='flex items-center gap-3'>
                  <div className='h-3.5 w-3.5 shrink-0 rounded-[18px] border border-white bg-white/20' />
                  <span className='text-base leading-6 text-white/40'>{t(`features.${item}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Try Now button */}
          <Link
            href={href}
            className='bg-color-main hover:bg-color-main/90 mt-3 block w-fit self-end rounded-lg px-8 py-3 text-base leading-6 font-semibold text-white transition-colors'
          >
            {t('tryNow')}
          </Link>
        </div>
      </div>
    </div>
  );
}
