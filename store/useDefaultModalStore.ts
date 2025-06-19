import { create } from 'zustand';

type State = {
  prompt?: string;
};

type Actions = {
  updateDefaultStore: (obj: State) => void;
  reset: () => void;
};

const DEFAULT_DATA: State = {
  prompt: '',
};

const useDefaultModalStore = create<State & Actions>((set) => ({
  ...DEFAULT_DATA,
  updateDefaultStore: (modalObj) => set((state) => ({ ...state, ...modalObj })),
  reset: () => set(DEFAULT_DATA),
}));

export default useDefaultModalStore;
