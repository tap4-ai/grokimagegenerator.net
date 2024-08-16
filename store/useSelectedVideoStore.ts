import { create } from 'zustand';

type State = {
  videoUrl: string;
};

type Actions = {
  setVideoUrl: (videoUrl: string) => void;
};

const useSelectedVideoStore = create<State & Actions>((set) => ({
  videoUrl: '',
  setVideoUrl: (videoUrl) => set({ videoUrl }),
}));

export default useSelectedVideoStore;
