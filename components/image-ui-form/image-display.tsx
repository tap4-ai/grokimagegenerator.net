'use client';

import { useState } from 'react';
import useImageFormStore from '@/store/form/useImageFormStore';
import { ChevronDown, ChevronRight, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import useImageConverter, { ImageType, imageTypesList } from '@/hooks/useImageConverter';
import ImagesCompare from '@/components/ui/images-compare';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ClientOnly from '@/components/ClientOnly';
import CopyBtn from '@/components/CopyBtn';
import Spinning from '@/components/Spinning';
import { Link, useRouter } from '@/i18n/navigation';

import Box from './Box';
import ImageInpainting from './image-inpainting';
// import ImageEdit from './ImageEdit';
import ImageInfo from './ImageInfo';
import NoData from './svg/NoData';

function Btn({
  children,
  onClick,
  className,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Box className={cn('rounded-lg hover:bg-white/20', className)}>
      <button
        type='button'
        className={cn('flex-center h-8 flex-1 gap-1.5 rounded', disabled && 'cursor-not-allowed opacity-40')}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </Box>
  );
}

export default function ImageDisplay({ redirectToImageToImage = false }: { redirectToImageToImage?: boolean }) {
  const t = useTranslations('components.image-form.display');
  const router = useRouter();

  const imageObj = useImageFormStore((state) => state.imageObj);
  const layerImageObj = useImageFormStore((state) => state.layerImageObj);
  const setLayerImageObj = useImageFormStore((state) => state.setLayerImageObj);
  const updateImageObj = useImageFormStore((state) => state.updateImageObj);
  const setImageFormSrc = useImageFormStore((state) => state.setImageFormSrc);

  const { convertAndDownload, isLoading } = useImageConverter();
  const [imageType, setImageType] = useState<ImageType>(imageTypesList[0]);
  const [showInfo, setShowInfo] = useState(false);

  const btnDisabled = !imageObj || imageObj === 'loading';
  const imageHasData = !!imageObj && typeof imageObj === 'object';

  const onRestFillImage = () => {
    if (!!imageObj && typeof imageObj === 'object' && imageObj?.originalImg) {
      updateImageObj(null);
      setImageFormSrc(imageObj.originalImg);
      setLayerImageObj({
        id: Date.now().toString(),
        originalImg: imageObj.originalImg,
      });
    }
  };

  const onDownload = () => {
    if (!!imageObj && typeof imageObj === 'object') {
      convertAndDownload({ imageUrl: imageObj.src, type: imageType, imageName: imageObj.name });
    }
  };

  const onNav = () => {
    if (!!imageObj && typeof imageObj === 'object') {
      router.push(`/flux-ai/${imageObj.id}`);
    }
  };

  if (layerImageObj) {
    return <ImageInpainting key={layerImageObj.id} imgSrc={layerImageObj.originalImg} />;
  }

  return (
    <div id='ImageDisplay' className='flex max-h-full flex-1 grow flex-col'>
      <div className='relative flex flex-1 items-center justify-center rounded-lg bg-color-bg p-3 lg:h-[calc(100%-48px)] lg:p-5'>
        {imageHasData && imageObj.type === 'display-one' && (
          <img
            key={imageObj.id}
            src={imageObj.src}
            alt={imageObj.name}
            className='max-h-[351px] max-w-full rounded lg:max-h-full'
          />
        )}
        {imageHasData && imageObj.type === 'compare-two' && (
          <ImagesCompare
            firstImage={imageObj.src}
            secondImage={imageObj.originalImg}
            initialSliderPercentage={99}
            slideMode='drag'
            className='aspect-square max-h-full w-full max-w-full lg:aspect-auto'
            key={imageObj.id}
          />
        )}
        {imageObj === 'loading' && <Spinning className='size-10' />}
        {imageObj === null && (
          <div className='flex flex-1 flex-col items-center gap-3 text-white/40'>
            <NoData />
            {t('noImage')}
          </div>
        )}
        {showInfo && (
          <ClientOnly>
            <ImageInfo />
          </ClientOnly>
        )}
      </div>
      <div className='relative flex flex-none flex-col gap-3 pt-3 lg:flex-row lg:items-center lg:justify-end'>
        {imageHasData && imageObj.type === 'compare-two' && (
          <Box className='mr-auto gap-1.5 rounded-lg p-1 px-3 text-sm text-white/70'>
            <button type='button' onClick={onRestFillImage}>
              {t('reset-inpainting')}
            </button>
          </Box>
        )}
        {/* {imageHasData && <ImageEdit imageSrc={imageObj.src} showImageToImage={showImageToImage} />} */}
        {redirectToImageToImage && (
          <Link href='/flux-ai-redux' className='mr-auto w-full hover:opacity-70 lg:w-fit'>
            <Box className='flex items-center gap-1.5 rounded-lg p-1 text-sm text-white/70'>
              {t('imageToImage')}
              <ChevronRight strokeWidth={1} className='size-5' />
            </Box>
          </Link>
        )}
        {imageHasData && (
          <Box className='gap-1.5 rounded-lg p-1 text-sm text-white/70'>
            <div className='flex-center size-7 rounded bg-white/10 hover:opacity-70'>
              <CopyBtn content={imageObj?.prompt || ''} />
            </div>
            <button
              type='button'
              onClick={() => setShowInfo(!showInfo)}
              disabled={btnDisabled}
              className={cn(
                'flex flex-1 items-center justify-between gap-1 rounded bg-white/10 p-1 px-2 hover:opacity-70',
                btnDisabled && 'cursor-not-allowed opacity-40',
              )}
            >
              {t('prompt')}
              <ChevronDown className={cn('size-3.5 rotate-0 transition duration-200', showInfo && '-rotate-180')} />
            </button>
          </Box>
        )}
        <Box className='gap-1 rounded-lg p-1 text-white'>
          <Select disabled={btnDisabled} value={imageType} onValueChange={(val) => setImageType(val as ImageType)}>
            <SelectTrigger className='h-full rounded border-none bg-white/10 uppercase hover:text-white/40'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='flex border border-white/10 bg-card-black p-0'>
              <SelectGroup>
                {imageTypesList.map((type) => (
                  <SelectItem key={type} value={type} className='cursor-pointer focus:bg-white/40'>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <button
            type='button'
            onClick={onDownload}
            disabled={isLoading || btnDisabled}
            className={cn(
              'flex-center aspect-square h-full rounded bg-white/10 hover:text-white/40',
              btnDisabled && 'cursor-not-allowed opacity-40',
            )}
          >
            {isLoading ? <Spinning className='size-5' /> : <Download className='size-5' strokeWidth={1} />}
          </button>
        </Box>
        <Btn
          onClick={onNav}
          className='order-first pr-0.5 lg:order-last'
          disabled={!imageObj || imageObj === 'loading'}
        >
          {t('imageDetail')} <ChevronRight strokeWidth={1} className='size-5' />
        </Btn>
      </div>
    </div>
  );
}
