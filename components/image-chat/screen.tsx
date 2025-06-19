'use client';

/* eslint-disable no-param-reassign */
import { useEffect, useRef } from 'react';
import { AsyncGenerationImageResult, generateImageAsyncApi, pollImageApi } from '@/network/generation/client';
import { ChatStatus, OnMessageSubmit, OnReferImage } from '@/network/image/client';
import useChatStore from '@/store/chat/use-chat-store';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
// import usePricingDialogStore from '@/store/usePricingDialogStore';
// import useUserInfoStore from '@/store/useUserInfoStore';
import { nanoid } from 'nanoid';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import useSWR from 'swr';

import { ResponseData } from '@/types/server';
import { FLUX_KONTEXT_MODEL_LIST } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { compressMultiImages, FileType, getImageFileByUrl } from '@/lib/utils/fileUtils';
import { executeTasksInInterval } from '@/lib/utils/promiseUtils';
import useUploadFiles from '@/hooks/use-upload-files';
import useUpdateUserInfo from '@/hooks/useUpdateUserInfo';
import { usePathname } from '@/i18n/navigation';

import type { ImageFormType } from './image-context-provider';
import ImageContenxtProvider from './image-context-provider';
import InputForm, { InputFormRef } from './input-form';
import MessageList from './message-list';

export default function Screen({ imageType, chatId }: { imageType: ImageFormType; chatId: string }) {
  const t = useTranslations('components.chat-image-editor-form');
  const pathname = usePathname();
  const isChatRoute = pathname.includes(`/flux-kontext/${chatId}`);

  // const userInfo = useUserInfoStore((state) => state.userInfo);
  // const openPricing = usePricingDialogStore((state) => state.setOpen);
  const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);
  const { updateUserInfo } = useUpdateUserInfo(false);
  const uploadFilesToStorageThroughBackEnd = useUploadFiles();

  // const getMessages = useChatStore((state) => state.getMessages);
  // const messages = getMessages(chatId);
  const addMessage = useChatStore((state) => state.addMessage);
  const setActiveChat = useChatStore((state) => state.setActiveChat);
  const updateReferImageStatus = useChatStore((state) => state.updateReferImageStatus);
  const clearAllReferImageStatus = useChatStore((state) => state.clearAllReferImageStatus);
  const messages = useChatStore((state) => state.chats[chatId] || []);
  const updateUserImgList = useChatStore((state) => state.updateUserImgList);

  const inputFormRef = useRef<InputFormRef>(null);

  const { data: status = 'ready', mutate: mutateStatus } = useSWR<ChatStatus>([chatId, 'status'], null);

  const onSubmit = async ({ prompt, multiImages, model, ratio = '1:1' }: Parameters<OnMessageSubmit>[number]) => {
    let currentModel = FLUX_KONTEXT_MODEL_LIST[0];
    const imageCount = (multiImages && multiImages.length) || 0;

    if (model) {
      currentModel = FLUX_KONTEXT_MODEL_LIST.find((el) => el.value === model) || currentModel;
    }

    const originalImgList = multiImages?.map((el) => URL.createObjectURL(el));
    const userMessageId = nanoid();

    addMessage(chatId, { id: userMessageId, content: prompt, role: 'user', originalImgList });

    try {
      mutateStatus('submitted');
      clearAllReferImageStatus(chatId);

      let filesToUpload: FileType[] = [];
      let uploadedUrls: string[] = [];

      if (multiImages && multiImages.length > 0) {
        const compressImages = await compressMultiImages(multiImages.map((el) => el));
        filesToUpload = compressImages.map((el) => ({ data: el, type: el.type }));
      }

      if (filesToUpload.length > 0) {
        uploadedUrls = await uploadFilesToStorageThroughBackEnd(filesToUpload);
        updateUserImgList(chatId, userMessageId, uploadedUrls);
      }

      let intervalTime = 1000;
      let maxTime = 120_000;

      switch (imageType) {
        case 'flux-kontext':
          intervalTime = 2000;
          maxTime = 600_000;
          break;
        default:
          break;
      }

      const [width, height] = ratio.split(':').map(Number);

      let reqData: Parameters<typeof generateImageAsyncApi>[0] = {
        prompt,
        outputPrompt: prompt,
        platformType: currentModel.platformType,
        modelName: currentModel.value,
        aiEnhance: false,
        width,
        height,
        isPublic: 0,
        imageType,
      };

      if (imageCount === 1) {
        reqData = {
          ...reqData,
          imageUrl: uploadedUrls[0],
        };
      } else if (imageCount > 1) {
        reqData = {
          ...reqData,
          imageUrlList: uploadedUrls,
        };
      }

      const res = await generateImageAsyncApi(reqData);
      const { code, msg, data } = res;

      if (code === 401) {
        mutateStatus('error');
        openLoginDialog(true);
        return;
      }

      if (code !== 200 || data?.status === 'failed' || !data?.key) {
        mutateStatus('error');
        throw new Error(msg);
      }

      const pollRes = await executeTasksInInterval<ResponseData<AsyncGenerationImageResult>, string>({
        taskFunction: pollImageApi,
        params: res.data.key,
        intervalTime,
        totalTimeLimit: maxTime,
      });

      const { code: pollCode, msg: pollMsg, data: pollResultData } = pollRes;

      if (pollCode !== 200 || pollResultData?.status === 'failed' || !pollResultData?.imageResponseVo) {
        mutateStatus('error');
        throw new Error(pollResultData?.message || pollMsg);
      }

      if (pollResultData.imageResponseVo) {
        mutateStatus('ready');
        addMessage(chatId, {
          id: pollResultData.imageResponseVo?.id.toString() || '',
          imgSrc: pollResultData?.imageResponseVo?.url || '',
          role: 'assistant',
        });
      }
    } catch (error: any) {
      mutateStatus('error');
      toast.error(error);
    } finally {
      updateUserInfo();
      mutateStatus('ready');
    }
  };

  const onReferImage: OnReferImage = async (messageEl) => {
    const { id, isReferImage, imgSrc } = messageEl;
    const currentImageNumber = inputFormRef.current?.getCurrentImageNumber() || 0;

    updateReferImageStatus(chatId, id, !isReferImage);
    if (isReferImage) {
      inputFormRef.current?.removeImgById(id);
      return;
    }

    if (currentImageNumber >= 5) {
      toast.error(`${t('max-file')}: 5`);
      return;
    }

    const imgFile = await getImageFileByUrl(imgSrc || '');
    inputFormRef.current?.addImgToForm([
      {
        id,
        mineType: imgFile.type,
        previewUrl: URL.createObjectURL(imgFile),
        file: imgFile,
      },
    ]);
  };

  useEffect(() => {
    if (chatId) {
      setActiveChat(chatId);
    }
  }, [chatId, setActiveChat]);

  return (
    <ImageContenxtProvider imageFormType={imageType}>
      <div
        className={cn(
          'mx-auto w-full max-w-[750px] px-3 py-5 lg:px-0 lg:py-2',
          isChatRoute ? 'flex h-full flex-col' : 'flex flex-col gap-10',
        )}
      >
        <MessageList
          status={status}
          // chatId={chatId}
          messages={messages}
          onReferImage={onReferImage}
          onSubmit={onSubmit}
          // setMessages={setMessages}
          className={cn(isChatRoute ? 'no-scrollbar mb-5 flex-1 overflow-y-auto' : '')}
        />
        <InputForm
          ref={inputFormRef}
          onSubmit={onSubmit}
          chatId={chatId}
          status={status}
          className={isChatRoute ? 'shrink-0' : ''}
        />
      </div>
    </ImageContenxtProvider>
  );
}
