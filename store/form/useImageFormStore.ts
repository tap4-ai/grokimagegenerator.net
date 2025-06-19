/* eslint-disable @typescript-eslint/indent */
import { create } from 'zustand';

type State = {
  imageObj:
    | {
        id: string;
        src: string; // generated img
        name: string;
        resolution: string;
        prompt: string;
        originalImg?: string;
        type: 'display-one' | 'compare-two' | 'new-year-cover';
      }
    | 'loading'
    | null;
  imageFormSrc: string | null;
  layerImageObj: { id: string; originalImg: string; maskImg?: string; generatedImg?: string; prompt?: string } | null;
  layerMaskDataUrl: string | null;
  uploadImageObj: { src: string } | null;
};

type Actions = {
  updateImageObj: (imageObj: State['imageObj']) => void;
  setImageFormSrc: (imageObj: State['imageFormSrc']) => void;
  setUploadImageObj: (uploadImageObj: State['uploadImageObj']) => void;
  setLayerImageObj: (layerImageObj: State['layerImageObj']) => void;
  setLayerMaskDataUrl: (layerMaskDataUrl: State['layerMaskDataUrl']) => void;
  resetDefault: () => void;
};

const DEFAULT_DATA: State = {
  imageFormSrc: null,
  layerImageObj: null,
  layerMaskDataUrl: null,
  imageObj: null,
  uploadImageObj: null,
};

const useImageFormStore = create<State & Actions>((set) => ({
  ...DEFAULT_DATA,
  updateImageObj: (imageObj) => set({ imageObj }),
  setImageFormSrc: (imageFormSrc) => set({ imageFormSrc }),
  setUploadImageObj: (uploadImageObj) => set({ uploadImageObj }),
  setLayerImageObj: (layerImageObj) => set({ layerImageObj }),
  setLayerMaskDataUrl: (layerMaskDataUrl) => set({ layerMaskDataUrl }),
  resetDefault: () => set({ ...DEFAULT_DATA }),
}));

export default useImageFormStore;
