import { create } from 'zustand';

type State = {
  shareImageObj: {
    id: string;
    src: string;
    touchCount: number;
  } | null;
  setShareImageObj: (shareImageObj: State['shareImageObj']) => void;
};

const useShareFormStore = create<State>((set) => ({
  shareImageObj: null,
  setShareImageObj: (shareImageObj) => set({ shareImageObj }),
}));

export default useShareFormStore;
