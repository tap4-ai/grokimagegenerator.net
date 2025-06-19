'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import VideoExtend from '@/components/svg/video/VideoExtend';

import BottomBtn from './BottomBtn';

const VideoExtendDialog = dynamic(() => import('./VideoExtendDialog'), { ssr: false });

export default function VideoExtendBtn({
  text,
  videoUrl,
  videoId,
  successCallback,
}: {
  text: string;
  videoUrl: string;
  videoId: string;
  successCallback?: () => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <BottomBtn onClick={() => setOpenDialog(true)}>
        <VideoExtend />
        {text}
      </BottomBtn>
      <VideoExtendDialog
        open={openDialog}
        setOpen={setOpenDialog}
        videoUrl={videoUrl}
        videoId={videoId}
        successCallback={successCallback}
      />
    </>
  );
}
