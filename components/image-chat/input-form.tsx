'use client';

/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-spaced-func */
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import type { ChatStatus, OnMessageSubmit } from '@/network/image/client';
import useChatStore from '@/store/chat/use-chat-store';
import useShareFormStore from '@/store/form/use-share-form-store';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import usePricingDialogStore from '@/store/usePricingDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CircleX,
  ImageIcon,
  //  Trash2,
  X,
} from 'lucide-react';
import { nanoid } from 'nanoid';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  FLUX_KONTEXT_IMAGE_RATIO_LIST,
  FLUX_KONTEXT_MULTI_IMAGES_MAX_MODEL,
  FLUX_KONTEXT_MULTI_IMAGES_PRO_MODEL,
  FLUX_KONTEXT_ONE_IMAGE_MAX_MODEL,
  FLUX_KONTEXT_ONE_IMAGE_PRO_MODEL,
  FLUX_KONTEXT_TEXT_TO_IMAGE_MAX_MODEL,
  FLUX_KONTEXT_TEXT_TO_IMAGE_PRO_MODEL,
  FLUX_KONTEXT_TYPE_LIST,
  type ImageStyle,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { getFileByUrl } from '@/lib/utils/fileUtils';

// import { useRouter } from '@/i18n/navigation';

import CopyBtn from '../CopyBtn';
import FormSelect from '../image-ui-form/FormSelect';
import Spinning from '../Spinning';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import SendIcon from './send-icon';

const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

export function getModel(modelType: string, imageCount: number): ImageStyle {
  switch (modelType) {
    case 'pro':
      if (imageCount === 1) {
        return FLUX_KONTEXT_ONE_IMAGE_PRO_MODEL;
      }
      if (imageCount > 1) {
        return FLUX_KONTEXT_MULTI_IMAGES_PRO_MODEL;
      }
      return FLUX_KONTEXT_TEXT_TO_IMAGE_PRO_MODEL;
    case 'max':
      if (imageCount === 1) {
        return FLUX_KONTEXT_ONE_IMAGE_MAX_MODEL;
      }
      if (imageCount > 1) {
        return FLUX_KONTEXT_MULTI_IMAGES_MAX_MODEL;
      }
      return FLUX_KONTEXT_TEXT_TO_IMAGE_MAX_MODEL;
    default:
      return FLUX_KONTEXT_TEXT_TO_IMAGE_PRO_MODEL;
  }
}

const FormSchema = z.object({
  prompt: z.string(),
  multiImages: z
    .array(
      z.object({
        id: z.string(),
        mineType: z.string(),
        previewUrl: z.string(),
        file: z
          .instanceof(File)
          .refine((file) => file.size >= 0)
          .refine((file) => file.type.startsWith('image/')),
      }),
    )
    .optional(),
  modelType: z.string(),
  ratio: z.string(),
});

export type InputFormRef = {
  addImgToForm: (
    fileDataList: { id: string; mineType: string; previewUrl: string; file: File; isReferImage?: boolean }[],
  ) => void;
  updatePrompt: (prompt: string) => void;
  removeImgById: (id: string) => void;
  getCurrentImageNumber: () => number;
};

export type InputFormProps = {
  maxFile?: number;
  onSubmit: OnMessageSubmit;
  chatId: string;
  status: ChatStatus;
  className?: string;
};

const InputForm = forwardRef<InputFormRef, InputFormProps>(
  ({ maxFile = 5, onSubmit, chatId, status, className }, ref) => {
    const t = useTranslations('components.chat-image-editor-form');
    // const router = useRouter();

    const userInfo = useUserInfoStore((state) => state.userInfo);
    const auth = useUserInfoStore((state) => state.auth);
    const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);

    const setActiveChat = useChatStore((state) => state.setActiveChat);
    const updateReferImageStatus = useChatStore((state) => state.updateReferImageStatus);
    const openPricing = usePricingDialogStore((state) => state.setOpen);
    const shareImageObj = useShareFormStore((state) => state.shareImageObj);
    const setShareImageObj = useShareFormStore((state) => state.setShareImageObj);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        prompt: '',
        modelType: FLUX_KONTEXT_TYPE_LIST[0].value,
        ratio: '1:1',
      },
    });

    const handleSubmit = async (formData: z.infer<typeof FormSchema>) => {
      if (!userInfo) {
        openLoginDialog(true);
        return;
      }

      const imageCount = (formData.multiImages && formData.multiImages.length) || 0;
      const currentModel = getModel(formData.modelType, imageCount);

      if (!formData.prompt) {
        toast.error(t('input-required'));
        return;
      }

      if (userInfo && userInfo.credits < currentModel.credit) {
        openPricing(true);
        return;
      }

      // if (imageCount === 1 && currentModel.imageOptionsType !== 'one-image') {
      //   toast.error(
      //     `${t('one-image-required')}: ${FLUX_KONTEXT_ONE_IMAGE_PRO_MODEL.name} & ${FLUX_KONTEXT_ONE_IMAGE_MAX_MODEL.name}`,
      //   );
      //   return;
      // }

      // if (imageCount > 1 && currentModel.imageOptionsType !== 'multi-images') {
      //   toast.error(
      //     `${t('multi-images-required')}: ${FLUX_KONTEXT_MULTI_IMAGES_PRO_MODEL.name} & ${FLUX_KONTEXT_MULTI_IMAGES_MAX_MODEL.name}`,
      //   );
      //   return;
      // }

      setActiveChat(chatId);

      // window.history.replaceState({}, '', `/flux-kontext/${chatId}`);
      // router.push(`/flux-kontext/${chatId}`);

      Promise.resolve().then(() => {
        onSubmit({
          prompt: formData.prompt,
          multiImages: formData.multiImages?.map((el) => el.file),
          model: currentModel.value,
          ratio: formData.ratio,
        });
      });

      // form.reset();
      form.setValue('prompt', '');
      form.setValue('multiImages', []);
      setShareImageObj(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const getCurrentImageNumber = (): number => form.getValues('multiImages')?.length || 0;

    const removeImgById = (id: string) => {
      form.setValue(
        'multiImages',
        form.getValues('multiImages')?.filter((el) => el.id !== id),
      );
      updateReferImageStatus(chatId, id, false);
    };

    const updateFileList = async (files: File[]) => {
      form.setValue('multiImages', [
        ...(form.getValues('multiImages') || []),
        ...files.map((fileElem) => ({
          id: nanoid(),
          mineType: fileElem.type,
          previewUrl: URL.createObjectURL(fileElem),
          file: fileElem,
        })),
      ]);
    };

    const onClickUpload: React.MouseEventHandler<HTMLLabelElement> = (e) => {
      if (!userInfo || (auth && auth.expire_date < new Date().getTime())) {
        openLoginDialog(true);
        e.preventDefault();
      }
    };

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files || null;
      const currentImageNumber = getCurrentImageNumber();

      if (fileList && currentImageNumber + fileList.length > maxFile) {
        toast.error(`${t('max-file')}: ${maxFile}`);
        return;
      }

      if (fileList) {
        updateFileList(Array.from(fileList));
      }
    };

    const updatePrompt = (prompt: string) => {
      form.setValue('prompt', prompt);
    };

    const addImgToForm = (fileDataList: { id: string; mineType: string; previewUrl: string; file: File }[]) => {
      form.setValue('multiImages', [...(form.getValues('multiImages') || []), ...fileDataList]);
    };

    const addImgToFormByUrl = async ({ id, url }: { id: string; url: string }) => {
      const imgFile = await getFileByUrl(url);
      const mineType = imgFile.type.split('.').pop() || '';

      form.setValue('multiImages', [
        ...(form.getValues('multiImages') || []),
        {
          id,
          mineType,
          previewUrl: url,
          file: imgFile,
        },
      ]);
    };

    const onClear = () => {
      form.setValue('prompt', '');
    };

    useImperativeHandle(ref, () => ({ addImgToForm, updatePrompt, removeImgById, getCurrentImageNumber }));

    const multiImages = form.watch('multiImages');

    useEffect(() => {
      if (shareImageObj && shareImageObj.touchCount === 0) {
        addImgToFormByUrl({
          id: shareImageObj.id,
          url: shareImageObj.src,
        });
        setShareImageObj({
          ...shareImageObj,
          touchCount: shareImageObj.touchCount + 1,
        });
      }

      return () => {
        if (shareImageObj && shareImageObj.touchCount > 0) {
          setShareImageObj(null);
        }
      };
    }, [shareImageObj]);

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={cn('flex w-full flex-col rounded-[24px] border border-main-gray', className)}
        >
          <div className='flex h-[123px] flex-col rounded-t-[24px] bg-[#1A1A1A] p-3 pb-0 pt-1'>
            {multiImages && multiImages.length > 0 && (
              <div className='no-scrollbar w-full overflow-x-auto'>
                <div className='flex w-full flex-nowrap items-center gap-3 px-2 py-1'>
                  {multiImages.map((el) => (
                    <div key={el.id} className='relative z-10 shrink-0 pr-2 pt-2'>
                      <img src={el.previewUrl} alt='preview' className='h-16 rounded-xl object-contain' />
                      <button
                        type='button'
                        onClick={() => removeImgById(el.id)}
                        className='absolute -right-1 -top-1 z-10 flex size-5 items-center justify-center rounded-full border border-white bg-black'
                      >
                        <X className='size-4' />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className='relative flex flex-1'>
              <textarea
                {...form.register('prompt')}
                className='w-full flex-1 resize-none border-none bg-transparent text-white/70 outline-hidden placeholder:text-white/70'
                placeholder={t('input-placeholder')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault();

                    if (status !== 'ready') {
                      toast.error(t('plz-wait'));
                    } else {
                      handleSubmit({
                        prompt: form.getValues('prompt'),
                        multiImages: form.getValues('multiImages'),
                        modelType: form.getValues('modelType'),
                        ratio: form.getValues('ratio'),
                      });
                    }
                  }
                }}
              />
              <div className='absolute bottom-1 right-0 flex items-center gap-2.5 rounded-lg border border-main-gray bg-card-black px-2 py-1.5 text-white/70'>
                <CopyBtn content={form.getValues('prompt')} />
                <div className='h-4 w-px bg-main-gray' />
                <button type='button' onClick={onClear}>
                  <CircleX className='size-4' />
                </button>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-3 rounded-b-[24px] bg-[#262626] px-2.5 py-2'>
            <FormField
              control={form.control}
              name='multiImages'
              render={() => (
                <FormItem className='relative aspect-square h-full space-y-0'>
                  <FormLabel
                    onClick={onClickUpload}
                    className={cn(
                      'flex aspect-square h-full cursor-pointer items-center justify-center',
                      status === 'submitted' && 'cursor-not-allowed',
                    )}
                  >
                    <ImageIcon className='size-6 opacity-70' />
                  </FormLabel>
                  <FormControl>
                    <input
                      type='file'
                      ref={fileInputRef}
                      accept={acceptedImageTypes.join(',')}
                      className='hidden'
                      required={false}
                      multiple
                      max={maxFile}
                      disabled={status === 'submitted'}
                      onChange={inputOnChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormSelect name='modelType' options={FLUX_KONTEXT_TYPE_LIST} />
            <FormSelect name='ratio' options={FLUX_KONTEXT_IMAGE_RATIO_LIST} />
            <button
              type='submit'
              disabled={status === 'submitted'}
              className='ml-auto flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-main text-black disabled:cursor-not-allowed disabled:opacity-40'
            >
              {status === 'submitted' ? <Spinning className='size-4' /> : <SendIcon />}
            </button>
          </div>
        </form>
      </Form>
    );
  },
);

InputForm.displayName = 'InputForm';
export default InputForm;
