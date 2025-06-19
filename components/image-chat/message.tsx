import { useEffect, useState } from 'react';
import type { Message as MessageType, OnReferImage } from '@/network/image/client';
// import type { ChatStatus, Message as MessageType, OnMessageSubmit } from '@/network/image/client';
// import type { ChatState } from '@/store/chat/use-chat-store';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { downloadFile } from '@/lib/utils/fileUtils';
import { Link } from '@/i18n/navigation';

import Image from 'next/image';
import CopyBtn from '../CopyBtn';
import ArrowDown from '../image-ui-form/svg/ArrowDown';
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

export default function Message({
  // chatId,
  // status,
  message,
  index,
  lastIndex,
  // setMessage,
  onReferImage,
  // onSubmit,
}: {
  // chatId: string;
  // status: ChatStatus;
  message: MessageType;
  index: number;
  lastIndex: number;
  // setMessage: ChatState['setMessages'];
  // onSubmit: OnMessageSubmit;
  onReferImage?: OnReferImage;
}) {
  const t = useTranslations('components.chat-image-editor-form');
  const { isReferImage } = message;

  const [isReferred, setIsReferred] = useState(isReferImage);

  useEffect(() => {
    if (isReferred !== isReferImage) {
      setIsReferred(isReferImage);
    }
  }, [isReferImage, isReferred]);

  // const onRefresh = async () => {
  //   setMessage(chatId, message.id, {
  //     ...message,
  //     content: '',
  //   });
  //   Promise.resolve().then(() => {
  //     onSubmit({
  //       prompt: message.content || '',
  //     });
  //   });
  // };

  const handleDownload = () => {
    if (message.imgSrc) {
      downloadFile(message.imgSrc, message.imgSrc.split('/').pop() || 'image');
    }
  };

  const handleReferImage = () => {
    if (message) {
      onReferImage?.(message);
    }
  };

  return (
    <div className='w-full'>
      <div className={cn('flex flex-col gap-3', message.role === 'user' && 'ml-auto w-fit max-w-2xl')}>
        {message.role === 'assistant' && (
          <img src='/images/logo.png' alt='logo' className='size-8 rounded-lg bg-[#1A1A1A]' />
        )}
        {!!message.content && (
          <div className='flex w-fit flex-col gap-2.5 rounded-lg border border-white/5 bg-white/10 p-3'>
            {message.originalImgList && message.originalImgList.length > 0 && (
              <div className='ml-auto flex flex-wrap items-center gap-1'>
                {message.originalImgList.map((img) => (
                  <img src={img} alt='original img' className='h-9 rounded' />
                ))}
                <ArrowDown className='translate-y-1/2 text-white' />
              </div>
            )}
            <p>{message.content}</p>
          </div>
        )}
        {!!message.imgSrc && (
          <>
            <Image
              width={434}
              height={434}
              src={message.imgSrc}
              alt='generated img'
              className='h-[434px] w-[434px] self-start rounded-xl object-contain'
            />
            <div className='flex items-center justify-start gap-3'>
              {index === lastIndex ? (
                <TooltipProvider>
                  <Tooltip delayDuration={0} defaultOpen>
                    <TooltipTrigger asChild>
                      <button
                        type='button'
                        className='flex h-9 items-center justify-center gap-1 rounded bg-white/10 px-3 py-2 text-sm text-white/70'
                        onClick={handleReferImage}
                      >
                        <div
                          className={cn(
                            'size-3 rounded-full border border-white/70',
                            isReferred && 'border-none bg-gradient-main',
                          )}
                        />
                        <div className={cn(isReferred && 'text-gradient-main')}>{t('refer-image')}</div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side='bottom' className='border-none bg-white px-5 py-3 text-sm text-black'>
                      <TooltipArrow className='fill-white' />
                      <p>{t('click-to-edit')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <button
                  type='button'
                  className='flex h-9 items-center justify-center gap-1 rounded bg-white/10 px-3 py-2 text-sm text-white/70'
                  onClick={handleReferImage}
                >
                  <div
                    className={cn(
                      'size-3 rounded-full border border-white/70',
                      isReferred && 'border-none bg-gradient-main',
                    )}
                  />
                  <div className={cn(isReferred && 'text-gradient-main')}>{t('refer-image')}</div>
                </button>
              )}
              <Link
                href={`/flux-ai/${message.id}`}
                className='flex h-9 items-center justify-center gap-1 rounded bg-white/10 px-3 py-2 text-sm text-white/70'
              >
                {t('image-details')}
              </Link>
              <button type='button' className='text-sm text-white/70' onClick={handleDownload}>
                <Download className='size-5' />
              </button>
            </div>
          </>
        )}
        {message.role === 'user' && (
          <div className='flex items-center justify-end gap-3'>
            {/* <button
              type='button'
              onClick={onRefresh}
              disabled={status === 'submitted'}
              className='disabled:cursor-not-allowed'
            >
              <RefreshCw className='size-5' />
            </button> */}
            <CopyBtn content={message.content || ''} />
          </div>
        )}
      </div>
    </div>
  );
}
