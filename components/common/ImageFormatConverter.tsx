'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Download, ImageUp, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FREE_IMAGE_FORMAT_CONVERTER_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

import ImageLightbox from './ImageLightbox';

const Spinner = () => <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />;

const formSchema = z.object({
  images: z.array(z.instanceof(File)),
});

interface ConvertedImage {
  id: string;
  originalFile: File;
  convertedFile: File | null;
  originalUrl: string;
  convertedUrl: string | null;
  status: 'loading' | 'done' | 'error';
}

export function ImageFormatConverter({ className }: { className?: string }) {
  const t = useTranslations('components.image-format-converter');
  const { slug } = useParams<{ slug: string }>();

  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const getTargetFormat = useCallback(() => {
    if (slug) {
      const parts = slug.split('-to-');
      if (parts.length === 2) {
        return parts[1];
      }
    }
    return 'jpg';
  }, [slug]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  });

  const handleConversion = useCallback(
    async (files: File[]) => {
      const targetFormat = getTargetFormat();
      const mimeType = `image/${targetFormat === 'jpg' ? 'jpeg' : targetFormat}`;

      const newImages = files.map((file) => ({
        id: `${file.name}-${Date.now()}`,
        originalFile: file,
        convertedFile: null,
        originalUrl: URL.createObjectURL(file),
        convertedUrl: null,
        status: 'loading' as const,
      }));

      setConvertedImages((prev) => [...prev, ...newImages]);

      const convertWithCanvas = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = URL.createObjectURL(file);
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Failed to get canvas context'));
              return;
            }
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob);
                } else {
                  reject(new Error('Canvas to Blob conversion failed'));
                }
              },
              mimeType,
              1.0, // for full quality
            );
          };
          img.onerror = (err) => {
            reject(err);
          };
        });
      };

      await Promise.all(
        newImages.map(async (image) => {
          try {
            const blob = await convertWithCanvas(image.originalFile);
            const convertedFile = new File([blob], `${image.originalFile.name.split('.')[0]}.${targetFormat}`, {
              type: mimeType,
            });
            const convertedUrl = URL.createObjectURL(convertedFile);

            setConvertedImages((prev) =>
              prev.map((img) => (img.id === image.id ? { ...img, convertedFile, convertedUrl, status: 'done' } : img)),
            );
          } catch (error) {
            console.error('Error during image conversion:', error);
            setConvertedImages((prev) => prev.map((img) => (img.id === image.id ? { ...img, status: 'error' } : img)));
          }
        }),
      );
    },
    [getTargetFormat],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const targetFormat = getTargetFormat();
      const filteredFiles = acceptedFiles.filter((file) => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (
          (targetFormat === 'jpg' || targetFormat === 'jpeg') &&
          (fileExtension === 'jpeg' || fileExtension === 'jpg')
        ) {
          return false;
        }
        return fileExtension !== targetFormat;
      });

      if (filteredFiles.length > 0) {
        form.setValue('images', filteredFiles);
        handleConversion(filteredFiles);
      }
    },
    [form, handleConversion, getTargetFormat],
  );

  const format = getTargetFormat();
  const accept = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'image/gif': ['.gif'],
    'image/bmp': ['.bmp'],
    'image/svg+xml': ['.svg'],
    'image/tiff': ['.tiff', '.tif'],
    'image/avif': ['.avif'],
  };

  if (format === 'jpg') {
    Reflect.deleteProperty(accept, 'image/jpeg');
  } else {
    Reflect.deleteProperty(accept, `image/${format}`);
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  const handleOpenLightbox = (imageId: string) => {
    const completedImages = convertedImages.filter((img) => img.status === 'done' && img.convertedUrl);
    const lightboxImageIndex = completedImages.findIndex((img) => img.id === imageId);
    if (lightboxImageIndex !== -1) {
      setLightboxIndex(lightboxImageIndex);
      setLightboxOpen(true);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handleLightboxIndexChange = (index: number) => {
    setLightboxIndex(index);
  };

  const removeImage = (id: string) => {
    setConvertedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className={cn('rounded-lg bg-[#2c2c2c] p-3 text-white', className)}>
      <div className='mb-4 flex flex-wrap justify-start gap-2'>
        {FREE_IMAGE_FORMAT_CONVERTER_LINKS.map((link) => (
          <Link scroll={false} href={link.href} key={link.href}>
            <span
              className={cn(
                'cursor-pointer rounded-lg px-3 py-1 text-sm font-medium',
                slug === link.code ? 'bg-white/10 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10',
              )}
            >
              {t(link.code)}
            </span>
          </Link>
        ))}
      </div>

      <div className='rounded-lg bg-[#202020] p-3'>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name='images'
              render={() => (
                <FormItem>
                  <FormControl>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {convertedImages.length > 0 && (
          <div className='mt-3 space-y-3'>
            {convertedImages.map((image) => (
              <div
                key={image.id}
                className='flex items-center justify-between rounded-lg border border-[#434343] bg-transparent p-3'
              >
                <div className='flex items-center gap-3.5'>
                  <div className='relative h-[78px] w-[78px] flex-shrink-0'>
                    <Image
                      src={image.originalUrl}
                      alt={image.originalFile.name}
                      layout='fill'
                      objectFit='cover'
                      className='rounded'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-lg font-medium text-white'>{image.originalFile.name.split('.')[0]}</p>
                    <div className='flex items-center gap-2 text-sm text-white/80'>
                      <span>{image.originalFile.name.split('.').pop()?.toUpperCase()}</span>
                      <span className='h-3 w-px bg-white/50' />
                      <span>{formatFileSize(image.originalFile.size)}</span>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3'>
                  {image.status === 'loading' && <Spinner />}
                  {image.status === 'error' && <span className='text-red-500'>{t('error')}</span>}
                  {image.status === 'done' && image.convertedUrl && image.convertedFile && (
                    <>
                      <div className='rounded-full border border-white px-4 py-2 text-sm'>
                        {image.convertedFile.name.split('.').pop()?.toUpperCase()}
                      </div>
                      <button
                        type='button'
                        onClick={() => handleOpenLightbox(image.id)}
                        className='flex cursor-pointer items-center justify-center rounded-full border border-white bg-[#202020] p-2'
                      >
                        <Download className='h-6 w-6' />
                      </button>
                    </>
                  )}
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => removeImage(image.id)}
                    className='h-6 w-6 rounded-full border border-neutral-400'
                  >
                    <X className='h-4 w-4 text-white/70' />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageLightbox
        images={convertedImages
          .filter((img) => img.status === 'done' && img.convertedUrl)
          .map((img) => ({
            src: img.convertedUrl!,
            alt: img.convertedFile?.name || img.originalFile.name,
            width: undefined,
            height: undefined,
          }))}
        open={lightboxOpen}
        onClose={handleCloseLightbox}
        currentIndex={lightboxIndex}
        onIndexChange={handleLightboxIndexChange}
        enableWatermark={false}
      />
    </div>
  );
}
