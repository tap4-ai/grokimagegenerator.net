'use client';

import { CircleX } from 'lucide-react';

import useVideoLastFrame from '@/hooks/useVideoLastFrame';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';

import InputForm from './InputForm';

export default function VideoExtendDialog({
  open,
  setOpen,
  videoUrl,
  videoId,
  successCallback,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  videoUrl: string;
  videoId: string;
  successCallback?: () => void;
}) {
  const lastFrameUrl = useVideoLastFrame(videoUrl);

  const successCb = () => {
    setOpen(false);
    if (successCallback) {
      successCallback();
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        closeBtnClassName='hidden'
        className='flex h-fit min-h-[150px] w-[calc(100%-24px)] flex-col rounded-2xl border-none bg-white/10! p-3 backdrop-blur-xs lg:max-w-[1158px]'
      >
        <div className='flex flex-col gap-3 lg:flex-row lg:items-start'>
          <img
            src={lastFrameUrl || ''}
            alt='iamge'
            className='mx-auto h-auto w-[84px] rounded-xl bg-black bg-cover lg:mx-0'
          />
          <div className='flex flex-1 flex-col gap-3'>
            <InputForm
              isExtendVideo
              allowImageUpload={false}
              showVideoTitle={false}
              successCb={successCb}
              videoId={videoId}
            />
          </div>
        </div>
        <DialogClose asChild>
          <button
            type='button'
            className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-10 text-sm'
            onClick={onClose}
          >
            <CircleX className='size-5 text-white/40' />
            <span className='sr-only'>close</span>
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
