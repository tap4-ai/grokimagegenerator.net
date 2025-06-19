'use client';

/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/indent */
import { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useImageFormStore from '@/store/form/useImageFormStore';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import useLocalRedirectUrlStore from '@/store/useLocalRedirectUrlStore';
import useloginExpireDialogStore from '@/store/useloginExpireDialogStore';
import usePricingDialogStore from '@/store/usePricingDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { CircleX, Upload } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { getFileByUrl } from '@/lib/utils/fileUtils';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { usePathname } from '@/i18n/navigation';

import Box from './Box';

const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

// eslint-disable-next-line prefer-arrow-callback
const ImageUploadForm: ForwardRefRenderFunction<
  { removeImage: () => void },
  {
    name: string;
    afterSetImage?: () => void;
    label?: string;
    isPaidUserOnly?: boolean;
    onImagePreview?: (imgSrc: string) => void;
    onDelete?: () => void;
  }
> = ({ name, afterSetImage, label, isPaidUserOnly, onImagePreview, onDelete }, ref) => {
  const pathname = usePathname();
  const methods = useFormContext<{ [key: string]: File | null }>();

  const userInfo = useUserInfoStore((state) => state.userInfo);
  const auth = useUserInfoStore((state) => state.auth);
  const setLocalRedirectUrl = useLocalRedirectUrlStore((state) => state.setLocalRedirectUrl);
  const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);
  const setOpenLoginExpireDialog = useloginExpireDialogStore((state) => state.setOpen);
  const setOpenPricingDialogStore = usePricingDialogStore((state) => state.setOpen);
  const setUploadImageObj = useImageFormStore((state) => state.setUploadImageObj);
  const imageFormSrc = useImageFormStore((state) => state.imageFormSrc);
  const setImageFormSrc = useImageFormStore((state) => state.setImageFormSrc);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPaidUser = !!userInfo?.isValidity;

  const localUpload = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (!userInfo) {
      setLocalRedirectUrl(pathname);
      openLoginDialog(true);
      e.preventDefault();
      return;
    }

    if (auth && auth.expire_date < Date.now()) {
      setOpenLoginExpireDialog(true);
      e.preventDefault();
      return;
    }

    if (isPaidUserOnly && !isPaidUser) {
      setOpenPricingDialogStore(true);
      e.preventDefault();
    }
  };

  const previewImage = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        if (onImagePreview) {
          onImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      if (afterSetImage) {
        afterSetImage();
      }
    } else {
      setImageUrl(null);
      methods.setValue(name, null);
    }
  };

  const removeImage = () => {
    setImageUrl(null);
    setUploadImageObj(null);
    methods.setValue(name, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onDelete) {
      onDelete();
    }
  };

  const onRemoveButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removeImage();
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      previewImage(file);
      methods.setValue(name, file);
    }
  };

  useEffect(() => {
    if (imageFormSrc) {
      (async () => {
        setImageUrl(imageFormSrc);
        methods.setValue(name, await getFileByUrl(imageFormSrc));
        if (afterSetImage) {
          afterSetImage();
        }

        if (imageFormSrc) {
          setImageFormSrc(null);
        }
      })();
    }

    return () => {};
  }, [name, methods, setImageUrl, afterSetImage, imageFormSrc, setImageFormSrc]);

  useImperativeHandle(
    ref,
    () => ({
      removeImage,
    }),
    [],
  );

  return (
    <Box className='flex h-[72px] flex-row justify-between p-1'>
      <FormField
        control={methods.control}
        name={name}
        render={() => (
          <FormItem className='w-full space-y-0'>
            <FormLabel onClick={localUpload} className='flex-1 cursor-pointer'>
              <div className='flex flex-1 justify-between'>
                <div className='flex-center relative size-16 rounded bg-white/5'>
                  {imageUrl ? (
                    <>
                      <button
                        type='button'
                        onClick={onRemoveButtonClick}
                        className='absolute -left-2 -top-2 size-5 rounded-full bg-white/20 backdrop-blur-lg'
                      >
                        <CircleX className='size-full' />
                      </button>
                      <img src={imageUrl} alt='Upload' className='max-h-full max-w-full' />
                    </>
                  ) : (
                    <Upload className='size-6 text-white/40' />
                  )}
                </div>
                <div className='flex flex-1 flex-col items-center justify-center whitespace-pre-line text-center text-sm text-white/40'>
                  {label}
                </div>
              </div>
            </FormLabel>
            <FormControl>
              <input
                type='file'
                disabled={!isPaidUser}
                accept={acceptedImageTypes.join(',')}
                className='hidden'
                ref={fileInputRef}
                required={false}
                onChange={inputChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </Box>
  );
};

export default forwardRef(ImageUploadForm);
