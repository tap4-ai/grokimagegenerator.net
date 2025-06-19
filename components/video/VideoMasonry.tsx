'use client';

import { ComponentProps, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { deleteVideoById } from '@/network/video/client';
import { VideoResponseType } from '@/network/video/useVideoHistory';
import { Masonry } from 'react-plock';
import { toast } from 'sonner';

import VideoCard from './VideoCard';
import VideoCardWithoutLink from './VideoCardWithoutLink';

const ConfirmDialog = dynamic(() => import('@/components/dialog/ConfirmDialog'), { ssr: false });

type Props = {
  dataList: {
    id: string;
    url: string;
    prompt: string;
    status?: VideoResponseType['status'];
    createAt?: number;
    videoFirstFrame?: string | null;
    duration?: number;
    showVideoExtendBtn?: boolean;
  }[];
  route?: string;
  className?: string;
  config?: ComponentProps<typeof Masonry>['config'];
  showBtns?: boolean;
  deleteCb?: () => void;
  onRefresh?: ComponentProps<typeof VideoCard>['onRefresh'];
};

export default function VideoMasonry({ dataList, route, className, config, showBtns, deleteCb, onRefresh }: Props) {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const idToDeleteRef = useRef('');

  const setIdToDeleteAndOpen = (id: string) => {
    idToDeleteRef.current = id;
    setOpenConfirmDialog(true);
  };

  const openDialog = (open: boolean) => {
    if (!open) {
      idToDeleteRef.current = '';
    }
    setOpenConfirmDialog(open);
  };

  const deleteVideo = async () => {
    try {
      const res = await deleteVideoById(idToDeleteRef.current);
      if (res.code !== 200) {
        toast.error(res.msg);
        return;
      }
      toast.success(res.msg);
      if (deleteCb) {
        deleteCb();
      }
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <>
      <Masonry
        items={dataList}
        className={className}
        config={
          config || {
            columns: [1, 4],
            gap: [8, 8],
            media: [768, 1709],
          }
        }
        render={(item) => {
          if (route) {
            return (
              <VideoCard
                key={item.id}
                route={route}
                id={item.id}
                videoFirstFrame={item.videoFirstFrame}
                duration={item.duration}
                createAt={item.createAt}
                videoUrl={item.url}
                prompt={item.prompt}
                videoStatus={item.status}
                showBtns={showBtns}
                onDelete={setIdToDeleteAndOpen}
                showDelete={!!deleteCb}
                onRefresh={onRefresh}
                showVideoExtendBtn={item.showVideoExtendBtn}
              />
            );
          }
          return (
            <VideoCardWithoutLink
              key={item.id}
              id={item.id}
              videoFirstFrame={item.videoFirstFrame}
              duration={item.duration}
              createAt={item.createAt}
              videoUrl={item.url}
              prompt={item.prompt}
              videoStatus={item.status}
              showBtns={showBtns}
            />
          );
        }}
      />
      {!!deleteCb && <ConfirmDialog open={openConfirmDialog} setOpen={openDialog} callback={deleteVideo} />}
    </>
  );
}
