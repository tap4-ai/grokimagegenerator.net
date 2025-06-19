'use client';

/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { createKlingVideoTraceId, createVideoExtend } from '@/network/video/client';
import { refreshVideoHistory } from '@/network/video/useVideoHistory';
import useVideoVersionStore from '@/store/form/useVideoVersionStore';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
// import useInsufficientCreditsStore from '@/store/useInsufficientCreditsStore';
import useLocalRedirectUrlStore from '@/store/useLocalRedirectUrlStore';
import useloginExpireDialogStore from '@/store/useloginExpireDialogStore';
import usePricingDialogStore from '@/store/usePricingDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import useImageToVideoStore from '@/store/video/useImageToVideoStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUp, BookText, CircleX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  GroupImageToVideoModel,
  KLING_VIDEO_RESOLUTION_LIST,
  klingVideoModelOnePointSix,
  toolsChildrenList,
  VIDEO_DURATION_LIST,
  VIDEO_GENERATE_ID_VIDEO,
  VIDEO_RESOLUTION_LIST,
  videoModelProVersionList,
  VideoModelType,
  videoModelVersionList,
} from '@/lib/constants';
import { cn } from '@/lib/utils';
import { sendGAEventBtnClicked } from '@/lib/utils/analyticsUtils';
import { FileType, shouldCompressImageFileList } from '@/lib/utils/fileUtils';
import useUploadFiles from '@/hooks/use-upload-files';
import useUpdateUserInfo from '@/hooks/useUpdateUserInfo';
import useVideoTutorial, { stepIdList } from '@/hooks/useVideoTutorial';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import CopyBtn from '@/components/CopyBtn';
import EnhanceBtn from '@/components/form/EnhanceBtn';
import Spinning from '@/components/Spinning';
import FormItemBox from '@/app/[locale]/(with-footer)/flux-video-ai/components/FormItemBox';
import FormSelect from '@/app/[locale]/(with-footer)/flux-video-ai/components/FormSelect';
import { usePathname } from '@/i18n/navigation';

import ImageUploadForm from '@/app/[locale]/(with-footer)/flux-video-ai/components/ImageUploadForm';

const FormSchema = z.object({
  startFrame: z
    .instanceof(File)
    .refine((file) => file.size >= 0)
    .refine((file) => file.type.startsWith('image/'))
    .optional()
    .or(z.any()),
  endFrame: z
    .instanceof(File)
    .refine((file) => file.size >= 0)
    .refine((file) => file.type.startsWith('image/'))
    .optional()
    .or(z.any()),
  prompt: z.string(),
  videoDuration: z.string().optional(),
  modelVersion: z.string().optional(),
  modelProVersion: z.string().optional(),
  resolution: z.string(),
});

const TEXT_MAX_LENGTH = 512;

function getVideoModel(videoVersion: string, modelVersion: string, videoDuration: string): VideoModelType {
  const key = `${videoVersion}__${modelVersion}__${videoDuration}`;

  return GroupImageToVideoModel[key] || klingVideoModelOnePointSix;
}

export default function InputForm({
  allowImageUpload = true,
  isExtendVideo,
  showVideoTitle = true,
  videoId,
  successCb,
}: {
  allowImageUpload?: boolean;
  isExtendVideo?: boolean;
  showVideoTitle?: boolean;
  videoId?: string;
  successCb?: () => void;
}) {
  const t = useTranslations('flux-video-ai.form');
  const pathname = usePathname();
  const navItem = toolsChildrenList.find((el) => pathname.includes(el.href));

  const { updateUserInfo } = useUpdateUserInfo();
  const videoVersion = useVideoVersionStore((state) => state.videoVersion);

  const auth = useUserInfoStore((state) => state.auth);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  // const openInsufficientCreditsStore = useInsufficientCreditsStore((state) => state.setOpen);
  const setOpenLoginExpireDialog = useloginExpireDialogStore((state) => state.setOpen);
  const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);
  const setLocalRedirectUrl = useLocalRedirectUrlStore((state) => state.setLocalRedirectUrl);
  const openPricingDialog = usePricingDialogStore((state) => state.setOpen);
  const setPageNum = useImageToVideoStore((state) => state.setPageNum);
  const imageGenerateFormName = useImageToVideoStore((state) => state.imageGenerateFormName);
  const drive = useVideoTutorial();
  const uploadFilesToStorageThroughBackEnd = useUploadFiles();

  const [loading, setLoading] = useState(false);

  // const isPaidUser = !!userInfo?.isValidity;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    progressive: true,
    defaultValues: {
      prompt: '',
      resolution: '16:9',
      videoDuration: '5',
      modelVersion: '1.6',
      modelProVersion: 'pro-1.6',
    },
  });

  const watchPrompt = form.watch('prompt');
  const watchModelVersion = form.watch('modelVersion') || '1.6';
  const watchVideoDuration = form.watch('videoDuration') || '5';
  const watchModelProVersion = form.watch('modelProVersion') || 'pro-1.6';

  const selectedVideoModel = getVideoModel(
    videoVersion,
    videoVersion === 'pro' ? watchModelProVersion : watchModelVersion,
    videoVersion === 'pro' ? watchVideoDuration : '5',
  );

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    sendGAEventBtnClicked(VIDEO_GENERATE_ID_VIDEO);

    let formSubmitVideoModel = selectedVideoModel;
    if (videoVersion === 'pro' && watchModelProVersion === 'pro-1.6' && !data.endFrame) {
      const key = `${videoVersion}__${watchModelProVersion}__${watchVideoDuration}__noEndFrame`;
      formSubmitVideoModel = GroupImageToVideoModel[key];
    }

    if (!userInfo) {
      setLocalRedirectUrl(pathname);
      openLoginDialog(true);
      return;
    }

    // if (!isPaidUser) {
    //   // openInsufficientCreditsStore(true);
    //   openPricingDialog(true);
    //   return;
    // }

    if (auth && auth.expire_date < Date.now()) {
      setOpenLoginExpireDialog(true);
      return;
    }

    if (userInfo.credits < formSubmitVideoModel.credit) {
      openPricingDialog(true);
      // openInsufficientCreditsStore(true);
      return;
    }

    if (!data.prompt.trim()) {
      return;
    }

    if (videoVersion === 'pro' && !(data.startFrame || data.endFrame)) {
      toast.error(t('atLeastOneImage'));
      return;
    }

    const errMsg = t('networkError');

    const modelName = formSubmitVideoModel.value;
    const videoPlatformType = formSubmitVideoModel.platformType;

    try {
      setLoading(true);

      const filesToUpload: FileType[] = [];
      let uploadedUrls: string[] = [];

      if (allowImageUpload && data.startFrame) {
        filesToUpload.push({
          data: data.startFrame,
          type: data.startFrame.type,
        });
      }

      if (allowImageUpload && data.endFrame && formSubmitVideoModel.supportEndFrame) {
        filesToUpload.push({
          data: data.endFrame,
          type: data.endFrame.type,
        });
      }

      if (filesToUpload.length) {
        const compressedFilesToUpload = await shouldCompressImageFileList(filesToUpload);
        uploadedUrls = await uploadFilesToStorageThroughBackEnd(compressedFilesToUpload);
      }

      const res =
        isExtendVideo && videoId
          ? await createVideoExtend({
              // model: 'kling-proxy',
              prompt: data.prompt,
              videoId,
            })
          : await createKlingVideoTraceId({
              imageUrl: uploadedUrls[0],
              imageEndUrl: uploadedUrls[1],
              model: modelName,
              prompt: data.prompt,
              platformType: videoPlatformType,
              ratio: data.resolution,
            });

      if (res?.code === 401) {
        setOpenLoginExpireDialog(true);
        return;
      }

      if (res.code !== 200 || !res.data?.traceId) {
        if (res.code === 204) {
          toast.error(res.msg);
          return;
        }
        throw new Error(res.msg);
      }

      setPageNum(1);
      refreshVideoHistory();

      toast.success(res.msg);
      await updateUserInfo();

      if (successCb) {
        successCb();
      }
      // form.reset();
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setLoading(false);
      // setVideoProcessing(false);
    }
  };

  const videoResolutionList = videoVersion === 'pro' ? VIDEO_RESOLUTION_LIST : KLING_VIDEO_RESOLUTION_LIST;

  if (videoVersion === 'pro' && form.watch('resolution') === '1:1') {
    form.setValue('resolution', VIDEO_RESOLUTION_LIST[0].value);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-1 flex-col gap-3 lg:flex-row lg:items-center'>
        {allowImageUpload && (
          <div className='flex w-full gap-3 lg:w-auto'>
            <ImageUploadForm id={stepIdList[0]} name='startFrame' title={t('startFrame')} color={navItem?.color} />
            {selectedVideoModel.supportEndFrame && (
              <ImageUploadForm
                id={stepIdList[3]}
                name='endFrame'
                title={t('endFrame')}
                showDisabledBtn
                defaultOff={false}
                color={navItem?.color}
              />
            )}
          </div>
        )}
        <FormField
          control={form.control}
          name='prompt'
          render={({ field }) => (
            <FormItem className={cn('size-full flex-1 space-y-0', imageGenerateFormName && 'mt-[818px] lg:mt-0')}>
              <FormControl>
                <div id={stepIdList[4]} className='relative'>
                  {showVideoTitle && (
                    <div className='flex w-full items-center justify-between'>
                      <div className='mr-auto flex h-8 w-fit items-center rounded-t-xl border border-b-0 border-main-gray bg-card-black p-3 font-semibold'>
                        {t('video-input-title')}
                      </div>
                      <button
                        type='button'
                        onClick={() => drive()}
                        className='flex h-7 w-fit items-center gap-1 rounded-lg bg-gradient-main px-3 text-sm text-black/70'
                      >
                        <BookText className='size-5' />
                        {t('tutorial')}
                      </button>
                    </div>
                  )}
                  <div className='flex flex-col gap-2.5 rounded-b-xl border border-main-gray bg-card-black p-3'>
                    <div className='relative'>
                      <Textarea
                        {...form.register('prompt', { maxLength: TEXT_MAX_LENGTH })}
                        placeholder={t('video-placeholder')}
                        // size={TEXT_MAX_LENGTH}
                        className='size-full h-[177px] resize-none text-wrap rounded-lg border-none bg-black p-3 text-white/70'
                      />
                      <div className='absolute bottom-0 right-0 flex h-8 items-center gap-2.5 rounded-tl bg-card-black px-3 py-1.5'>
                        <CopyBtn content={field.value} className='text-white/70' />
                        <Separator orientation='vertical' className='h-full w-px bg-main-gray' />
                        <button type='button' onClick={() => field.onChange('')}>
                          <CircleX className='size-5 text-white/70' />
                        </button>
                      </div>
                    </div>
                    <div className='flex w-full flex-col-reverse items-center justify-between lg:flex-row'>
                      <div className='flex items-center gap-3'>
                        <FormItemBox className='w-fit rounded-full border border-main-gray bg-card-black'>
                          <EnhanceBtn prompt={watchPrompt} successCb={(val) => form.setValue('prompt', val)} />
                        </FormItemBox>
                        {videoVersion !== 'pro' && (
                          <FormSelect
                            name='modelVersion'
                            className='border border-main-gray bg-transparent lg:w-fit'
                            options={videoModelVersionList}
                          />
                        )}
                        {videoVersion === 'pro' && (
                          <FormSelect
                            name='modelProVersion'
                            className='border border-main-gray bg-transparent lg:w-40'
                            options={videoModelProVersionList}
                          />
                        )}
                        <FormSelect
                          name='resolution'
                          className='border border-main-gray bg-transparent lg:w-40'
                          options={videoResolutionList.map((item) => ({
                            ...item,
                            leftIcon: (
                              <div
                                style={{
                                  width: item.iconWidth,
                                  height: item.iconHeight,
                                }}
                                className='rounded-[2px] bg-white/70'
                              />
                            ),
                          }))}
                        />
                        {videoVersion === 'pro' && (
                          <FormSelect
                            name='videoDuration'
                            className='border border-main-gray bg-transparent lg:w-20'
                            options={VIDEO_DURATION_LIST}
                          />
                        )}
                      </div>
                      <div className='ml-auto flex items-center gap-3 lg:ml-0'>
                        <div className='flex items-center gap-1 text-sm text-white/40'>
                          {field.value?.length || 0}/{TEXT_MAX_LENGTH}
                        </div>
                        <button
                          id={VIDEO_GENERATE_ID_VIDEO}
                          type='submit'
                          disabled={loading || !watchPrompt}
                          className={cn(
                            'ml-auto flex size-9 items-center justify-center gap-1 rounded-full bg-[#333] bg-gradient-main text-sm',
                            (loading || !watchPrompt.trim()) && 'cursor-not-allowed opacity-40',
                          )}
                        >
                          {loading ? <Spinning className='size-4' /> : <ArrowUp className='size-5 text-black' />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
