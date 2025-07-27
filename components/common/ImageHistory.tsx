'use client';

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Sparkles, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import HamsterLoading from './HamsterLoading';
import ImageLightbox from './ImageLightbox';

interface HistoryItem {
  id: string;
  prompt: string;
  timestamp: string;
  imageUrl: string;
  isGenerating?: boolean;
}

interface ImageHistoryProps {
  className?: string;
  historyItems?: HistoryItem[];
  enableWatermark?: boolean; // 控制是否添加水印
}

export default function ImageHistory({ className, historyItems = [], enableWatermark = true }: ImageHistoryProps) {
  const t = useTranslations('components.image-history');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 过滤出已生成的图片用于预览
  const generatedImages = historyItems.filter((item) => !item.isGenerating && !!item.imageUrl);

  // 构建lightbox slides数据
  const slides = generatedImages.map((item) => ({
    src: item.imageUrl,
    alt: item.prompt,
    title: item.prompt,
    description: item.timestamp,
  }));

  // 处理图片点击
  const handleImageClick = (item: HistoryItem) => {
    if (item.isGenerating || !item.imageUrl) return;

    const imageIndex = generatedImages.findIndex((img) => img.id === item.id);
    if (imageIndex !== -1) {
      setCurrentImageIndex(imageIndex);
      setLightboxOpen(true);
    }
  };

  return (
    <div className={cn(className)}>
      <div className='rounded-[12px] bg-[#202020] p-[18px]'>
        <div className='flex flex-col gap-[26px]'>
          {/* Free Plan Banner */}
          <div className='rounded-xl bg-[#2c2c2c] p-[18px]'>
            <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
              <div className='flex flex-1 flex-row items-start gap-[9px]'>
                <div className='mt-0.5 h-6 w-6 flex-shrink-0'>
                  <Sparkles className='h-full w-full text-[#B6D4FF]' />
                </div>
                <div className='flex flex-1 flex-col'>
                  <p className='text-[18px] leading-[27px] font-normal tracking-[0.36px] text-[#ffffff]'>
                    {t('free-plan-title')}
                  </p>
                  <p className='text-base font-normal tracking-[0.36px] text-[#b8b8b8]'>{t('free-plan-description')}</p>
                </div>
              </div>
              <a
                rel='nofollow'
                href={process.env.NEXT_PUBLIC_HIGH_QUALITY_LINK}
                className='h-12 flex-shrink-0 rounded-lg bg-[#1677ff] px-8 py-3 text-base font-semibold whitespace-nowrap text-[#ffffff] capitalize backdrop-blur hover:bg-[#1677ff]/90'
              >
                {t('try-now')}
              </a>
            </div>
          </div>

          {/* History Items */}
          {historyItems.map((item) => (
            <div key={item.id} className='flex flex-col gap-3'>
              {/* Header */}
              <div className='flex flex-col justify-between gap-2 md:flex-row md:items-center'>
                <div className='flex min-w-0 flex-1 flex-row items-center gap-3'>
                  <span className='text-[18px] leading-[27px] font-normal tracking-[0.36px] whitespace-nowrap text-[#ffffff]'>
                    {t('generate-label')}
                  </span>
                  <p className='line-clamp-1 flex-1 overflow-hidden text-base font-normal tracking-[0.36px] break-words text-ellipsis text-[#b8b8b8]'>
                    {item.prompt}
                  </p>
                </div>
                <span className='text-base font-normal tracking-[0.36px] whitespace-nowrap text-[#b8b8b8] md:ml-3'>
                  {item.timestamp}
                </span>
              </div>

              {/* Tips */}
              <div className='flex flex-row items-center gap-3'>
                <span className='text-[18px] leading-[27px] font-normal tracking-[0.36px] whitespace-nowrap text-[#ffffff]'>
                  {t('tips-label')}
                </span>
                <span className='text-base font-normal text-[#b8b8b8]'>{t('tips-message')}</span>
              </div>

              {/* Image Container */}
              {item.isGenerating ? (
                /* Generating State */
                <div className='flex h-[330px] w-full max-w-[640px] items-center justify-center rounded-xl bg-[#2c2c2c] md:h-[480px]'>
                  <div className='flex flex-col items-center gap-3'>
                    {/* Mouse Animation Placeholder - you mentioned you'll handle this */}
                    <HamsterLoading />
                    <p className='text-center text-[18px] leading-[27px] font-normal tracking-[0.36px] text-[#ffffff]'>
                      {t('estimated-time')}
                    </p>
                    <Link
                      rel='nofollow'
                      href={process.env.NEXT_PUBLIC_HIGH_QUALITY_LINK!}
                      className='flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-[#1677ff] px-8 py-3 backdrop-blur hover:bg-[#1677ff]/90'
                    >
                      <Zap className='h-6 w-6 text-white' />
                      <span className='text-[16px] leading-[24px] font-semibold text-[#ffffff] capitalize'>
                        {t('generate-faster')}
                      </span>
                    </Link>
                  </div>
                </div>
              ) : (
                /* Generated Image */
                <div className='h-[280px] w-auto md:h-[480px]'>
                  <Image
                    src={item.imageUrl}
                    alt={t('image-alt')}
                    className='h-full w-auto cursor-pointer rounded-xl object-contain transition-opacity hover:opacity-90'
                    width={720}
                    height={480}
                    onClick={() => handleImageClick(item)}
                  />
                </div>
              )}
            </div>
          ))}

          {historyItems.length === 0 && (
            <div className='flex h-[240px] items-center justify-center rounded-2xl bg-[#2c2c2c] md:h-[320px]'>
              <div className='text-[16px] text-[#b8b8b8]'>{t('no-data')}</div>
            </div>
          )}
        </div>
      </div>

      {/* ImageLightbox */}
      <ImageLightbox
        images={slides}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
        enableWatermark={enableWatermark}
      />
    </div>
  );
}
