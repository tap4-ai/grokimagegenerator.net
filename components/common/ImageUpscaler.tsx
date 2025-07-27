'use client';

import React, { useRef, useState } from 'react';
import { DownloadIcon, ImageUp, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';

import ImageLightbox from '@/components/common/ImageLightbox';
import { cn } from '@/lib/utils';
import { scaleWithPica } from '@/lib/utils/imageUtils';

interface UploadedImage {
  file: File;
  preview: string;
}

interface UpscaledImage {
  original: UploadedImage;
  x2: string | null;
  x4: string | null;
}

type ScaleFactor = 2 | 4;

const ImageUpscaler = ({ className }: { className?: string }) => {
  const t = useTranslations('components.image-upscaler');
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<UpscaledImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeScale, setActiveScale] = useState<ScaleFactor>(2);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<Array<{ src: string; alt?: string }>>([]);

  const upscaleImage = async (scale: ScaleFactor, imageToProcess: UploadedImage | null = uploadedImage) => {
    if (!imageToProcess) return;

    setActiveScale(scale);

    // If upscaled image for this scale already exists, just return.
    if (scale === 2 && upscaledImage?.x2) return;
    if (scale === 4 && upscaledImage?.x4) return;

    // Cancel any existing processing
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this operation
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsProcessing(true);

    try {
      const scaledImageUrl = await scaleWithPica(imageToProcess.preview, scale, abortController.signal);

      // Check if operation was aborted
      if (abortController.signal.aborted) {
        URL.revokeObjectURL(scaledImageUrl);
        return;
      }

      setUpscaledImage((prev) => {
        if (!prev) return null;
        const newUpscaled = {
          ...prev,
          [scale === 2 ? 'x2' : 'x4']: scaledImageUrl,
        };
        // Revoke old object URL if it exists
        if (scale === 2 && prev.x2) {
          URL.revokeObjectURL(prev.x2);
        }
        if (scale === 4 && prev.x4) {
          URL.revokeObjectURL(prev.x4);
        }
        return newUpscaled;
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Image upscaling was cancelled');
      } else {
        console.error('Image upscaling failed:', error);
      }
    } finally {
      if (abortController === abortControllerRef.current) {
        setIsProcessing(false);
        abortControllerRef.current = null;
      }
    }
  };
  const onDrop = (acceptedFiles: File[]) => {
    const imageFile = acceptedFiles.find((file) => file.type.startsWith('image/'));
    if (imageFile) {
      // Cancel any ongoing processing before setting new image
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }

      // Clean up previous image resources
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage.preview);
      }
      if (upscaledImage?.x2) {
        URL.revokeObjectURL(upscaledImage.x2);
      }
      if (upscaledImage?.x4) {
        URL.revokeObjectURL(upscaledImage.x4);
      }

      // Reset states
      setIsProcessing(false);
      setActiveScale(2);

      const newImage = {
        file: imageFile,
        preview: URL.createObjectURL(imageFile),
      };
      setUploadedImage(newImage);
      setUpscaledImage({
        original: newImage,
        x2: null,
        x4: null,
      });
      // Automatically upscale to 2x on upload
      upscaleImage(2, newImage);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  const handleOpenLightbox = () => {
    if (!upscaledImage) return;

    const images: { src: string; alt: string }[] = [];
    images.push({ src: upscaledImage.original.preview, alt: 'Original' });
    if (upscaledImage.x2) {
      images.push({ src: upscaledImage.x2, alt: '2x Upscaled' });
    }
    if (upscaledImage.x4) {
      images.push({ src: upscaledImage.x4, alt: '4x Upscaled' });
    }

    const currentDisplayUrl =
      (activeScale === 4 && upscaledImage.x4) ||
      (activeScale === 2 && upscaledImage.x2) ||
      upscaledImage.original.preview;

    let currentIndex = images.findIndex((img) => img.src === currentDisplayUrl);
    if (currentIndex === -1) {
      currentIndex = 0;
    }

    setLightboxImages(images);
    setLightboxIndex(currentIndex);
    setIsLightboxOpen(true);
  };

  const removeImage = () => {
    // Cancel any ongoing processing
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Reset all states
    setIsProcessing(false);
    setActiveScale(2); // Reset to default scale

    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    if (upscaledImage?.x2) {
      URL.revokeObjectURL(upscaledImage.x2);
    }
    if (upscaledImage?.x4) {
      URL.revokeObjectURL(upscaledImage.x4);
    }
    setUploadedImage(null);
    setUpscaledImage(null);
  };

  const currentImageUrl =
    (activeScale === 4 && upscaledImage?.x4) || (activeScale === 2 && upscaledImage?.x2) || uploadedImage?.preview;

  const hasUpscaledImage = !!(upscaledImage?.x2 || upscaledImage?.x4);

  return (
    <div className={cn('relative mx-4 flex h-full w-full flex-col gap-2.5 rounded-xl bg-[#2c2c2c] p-3', className)}>
      <div className='relative w-full overflow-clip rounded-lg bg-[#202020] p-3'>
        {/* Upload area - always visible */}
        <div className='mb-3'>
          <div
            {...getRootProps()}
            className={cn(
              'relative h-40 w-full cursor-pointer rounded-lg border-2 border-dashed border-[#434343] bg-[#202020] transition-colors',
              isDragActive ? 'border-solid' : '',
              'hover:border-solid',
            )}
          >
            <input {...getInputProps()} />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <div className='flex flex-col items-center justify-center overflow-hidden rounded-xl bg-white/7 bg-gradient-to-tl from-[#007ACB]/20 via-[#007ACB]/5 to-transparent p-4 backdrop-blur-[48px]'>
                <ImageUp strokeWidth={1} className='size-10 text-white' />
                <p className='mt-1 text-base font-normal text-white'>{t('upload-image')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image display area */}
        {uploadedImage && (
          <div className='relative'>
            <div className='absolute top-2 right-2 z-10'>
              <button
                type='button'
                onClick={removeImage}
                className='flex h-6 w-6 items-center justify-center rounded-full border border-neutral-400 bg-transparent text-white/70'
              >
                <XIcon className='h-4 w-4' />
              </button>
            </div>
            <div className='relative mx-auto h-[400px] w-full p-4'>
              <img src={currentImageUrl} alt='Uploaded' className='h-full w-full object-contain' />
            </div>
          </div>
        )}
      </div>

      <div className='flex flex-row items-start justify-start gap-2'>
        <div className='box-border flex flex-row items-center justify-start gap-1 rounded-xl border border-[#2f2f2f] bg-[#141516] p-[12px]'>
          <span className='text-[16px] font-normal text-[rgba(255,255,255,0.7)] capitalize'>{t('upscale')}</span>
          <button
            type='button'
            onClick={() => upscaleImage(2)}
            disabled={!uploadedImage || isProcessing}
            className={cn(
              'size-6 rounded-sm text-[12px] font-normal tracking-[0.24px] text-[#ffffff] disabled:opacity-50',
              activeScale === 2 ? 'bg-[#434343]' : 'border border-[#434343]',
            )}
          >
            {isProcessing && activeScale === 2 && !upscaledImage?.x2 ? '...' : 'X2'}
          </button>
          <button
            type='button'
            onClick={() => upscaleImage(4)}
            disabled={!uploadedImage || isProcessing}
            className={cn(
              'size-6 rounded-sm text-[12px] font-normal tracking-[0.24px] text-[#ffffff] disabled:opacity-50',
              activeScale === 4 ? 'bg-[#434343]' : 'border border-[#434343]',
            )}
          >
            {isProcessing && activeScale === 4 && !upscaledImage?.x4 ? '...' : 'X4'}
          </button>
        </div>
        <button
          type='button'
          onClick={handleOpenLightbox}
          disabled={!hasUpscaledImage || isProcessing}
          className='box-border flex flex-row items-center justify-start gap-1 rounded-xl border border-[#2f2f2f] bg-[#141516] p-[12px] text-[16px] text-[rgba(255,255,255,0.7)] disabled:opacity-50'
        >
          <DownloadIcon className='size-6' />
          <span className='font-normal capitalize'>{t('download')}</span>
        </button>
      </div>
      {isLightboxOpen && (
        <ImageLightbox
          images={lightboxImages}
          open={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          currentIndex={lightboxIndex}
          onIndexChange={setLightboxIndex}
          enableWatermark={false}
        />
      )}
    </div>
  );
};

export default ImageUpscaler;
