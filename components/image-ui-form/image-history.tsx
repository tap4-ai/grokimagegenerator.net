'use client';

/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useState } from 'react';
import useUserImageHistory from '@/network/profile/use-user-image-history';
import useImageFormStore from '@/store/form/useImageFormStore';
import useloginExpireDialogStore from '@/store/useloginExpireDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { IMAGE_RESOLUTION_LIST } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { numberList } from '@/lib/utils/arrayUtils';
import { findClosestResolution } from '@/lib/utils/numUtils';
import { useRouter } from '@/i18n/navigation';

import Box from './Box';
import { ImageFormType, ImageTypeContenxt } from './image-context-provider';

function getHistoryHref(imageType: ImageFormType): string {
  const historyHref = '/profile/history';

  switch (imageType) {
    case 'flux-fill':
    case 'canny-depth':
    case 'redux':
    case 'new-year-avatar':
    case 'new-year-image':
    case 'flux-realism':
    case 'flux-avatar':
      return `${historyHref}?filter=${imageType}`;

    default:
      return historyHref;
  }
}

function Btn({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type='button'
      className={cn(
        'flex-center h-8 flex-1 rounded bg-white/10 hover:bg-white/10 lg:bg-transparent',
        disabled && 'cursor-not-allowed',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function ImageItem({ imgSrc, resolution, onClick }: { imgSrc: string; resolution: string; onClick: () => void }) {
  return (
    <div
      className='group relative flex aspect-square size-[168px] items-center justify-center overflow-hidden rounded bg-white/5 hover:cursor-pointer lg:size-[102px]'
      onClick={onClick}
    >
      <img
        src={imgSrc}
        alt='imgSrc'
        className='max-h-full max-w-full bg-black transition-all duration-200 group-hover:scale-110'
      />
      <div className='flex-center absolute bottom-0.5 left-0.5 h-5 rounded-[2px] border border-[#A5A5A5]/40 px-1 text-sm text-white backdrop-blur-xs'>
        {resolution}
      </div>
    </div>
  );
}

export default function ImageHistory({ imageNum, onClickImage }: { imageNum: number; onClickImage?: () => void }) {
  const imageType = useContext(ImageTypeContenxt);
  const updateImageObj = useImageFormStore((state) => state.updateImageObj);
  const setLayerImageObj = useImageFormStore((state) => state.setLayerImageObj);
  const t = useTranslations('components.image-form');
  const auth = useUserInfoStore((state) => state.auth);
  const setOpenLoginExpireDialog = useloginExpireDialogStore((state) => state.setOpen);
  const router = useRouter();

  const [pageNum, setPageNum] = useState(1);
  const { total, data, isLoading } = useUserImageHistory(
    pageNum,
    imageNum,
    // ['flux-fill', 'canny-depth', 'redux', 'new-year-avatar', 'new-year-image', 'flux-realism', 'flux-avatar'].includes(
    //   imageType,
    // )
    //   ? imageType
    //   : 'not-flux-fill',
  );

  const hasData = !!data && data.length > 0;

  const handleClickImg = (imgData: NonNullable<typeof data>[number]) => {
    const [resWidth, resHeight] = imgData.resolution.split('x');
    if (imageType === 'flux-fill') {
      setLayerImageObj(null);
      updateImageObj({
        id: imgData.id.toString(),
        src: imgData.url,
        originalImg: imgData.sourceImageUrl,
        name: imgData.url.split('/').pop()!,
        resolution: `${resWidth}:${resHeight}`,
        prompt: imgData.prompt,
        type: 'compare-two',
      });
    } else {
      updateImageObj({
        id: imgData.id.toString(),
        src: imgData.url,
        name: imgData.url.split('/').pop()!,
        resolution: `${resWidth}:${resHeight}`,
        prompt: imgData.prompt,
        type: 'display-one',
      });
    }

    if (onClickImage) {
      onClickImage();
    }
  };

  const onClickHistory = () => {
    if (auth && auth.expire_date < Date.now()) {
      setOpenLoginExpireDialog(true);
      return;
    }
    router.push(getHistoryHref(imageType));
  };

  return (
    <div className='flex w-full flex-1 flex-col items-center gap-3 text-balance text-center lg:flex-none'>
      <div className='text-white/40'>{t('history')}</div>
      <div
        className={cn('grid grid-cols-2 gap-3', !hasData && 'flex items-center justify-center', isLoading && 'grid')}
      >
        {isLoading &&
          numberList(imageNum).map((num) => (
            <div key={num} className='size-[168px] animate-pulse rounded bg-white/20 lg:size-[102px]' />
          ))}
        {!isLoading && !hasData && <div className='inset-0 size-full text-white/40'>{t('noHistory')}</div>}
        {!isLoading &&
          hasData &&
          data.map((el) => (
            <ImageItem
              key={el.id}
              imgSrc={el.thumbnailUrl}
              resolution={findClosestResolution(el.resolution, IMAGE_RESOLUTION_LIST)}
              onClick={() => handleClickImg(el)}
            />
          ))}
      </div>
      <div className={cn('mt-auto flex w-full gap-3', !hasData && 'hidden')}>
        <Btn onClick={() => setPageNum(pageNum - 1)} disabled={pageNum === 1}>
          <ChevronLeft strokeWidth={1} />
        </Btn>
        <Btn onClick={() => setPageNum(pageNum + 1)} disabled={!!total && pageNum === Math.ceil(total / imageNum)}>
          <ChevronRight strokeWidth={1} />
        </Btn>
      </div>
      <Box className={cn('w-full rounded-lg hover:bg-white/20', !hasData && 'hidden')}>
        <button type='button' onClick={onClickHistory} className='flex-center relative size-full gap-1'>
          {t('checkAll')} <ChevronRight strokeWidth={1} className='absolute right-0 size-5' />
        </button>
      </Box>
    </div>
  );
}
