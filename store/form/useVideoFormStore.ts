/* eslint-disable @typescript-eslint/indent */
import type { VideoRequestType } from '@/network/video/useVideoHistory';
import { create } from 'zustand';

const DefaultPreviewMedia: { formType: VideoRequestType['videoType']; imgSrc: string; videoSrc: string }[] = [
  {
    formType: 'Hug',
    imgSrc: 'https://c.topshort.org/fluxpro/ai_template/ai_hug/key_features/image2.webp',
    videoSrc: 'https://c.topshort.org/fluxpro/ai_template/ai_hug/key_features/video2.mp4',
  },
  {
    formType: 'ai-kiss',
    imgSrc: 'https://c.topshort.org/fluxpro/ai_template/ai_kiss/key_features/image1.webp',
    videoSrc: 'https://c.topshort.org/fluxpro/ai_template/ai_kiss/key_features/video1.mp4',
  },
];

type PreviewMedia = {
  id: string;
  videoSrc: string;
  posterSrc: string;
  model: string;
  name: string;
  isAllowExtend: boolean;
  startFrame?: string;
  endFrame?: string;
  prompt: string;
};

type State = {
  videoObj:
    | (PreviewMedia & {
        mediaList?: typeof DefaultPreviewMedia;
      })
    | (Partial<PreviewMedia> & {
        mediaList: typeof DefaultPreviewMedia;
      })
    | null;
};

type Actions = {
  updateVideoObj: (videoObj: State['videoObj']) => void;
  resetDefault: () => void;
};

const DEFAULT_DATA: State = {
  videoObj: {
    mediaList: DefaultPreviewMedia,
  },
};

const useVideoFormStore = create<State & Actions>((set) => ({
  ...DEFAULT_DATA,
  updateVideoObj: (videoObj) => set({ videoObj }),
  resetDefault: () => set(DEFAULT_DATA),
}));

export default useVideoFormStore;
