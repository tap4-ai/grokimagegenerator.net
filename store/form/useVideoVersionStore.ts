import { create } from 'zustand';

export type State = {
  videoVersion: 'normal' | 'pro';
};

type Actions = {
  setVideoVersion: (videoVersion: 'normal' | 'pro') => void;
};

const useVideoVersionStore = create<State & Actions>((set) => ({
  videoVersion: 'normal',
  setVideoVersion: (videoVersion) => set({ videoVersion }),
}));

export default useVideoVersionStore;
