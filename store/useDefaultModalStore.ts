import { create } from 'zustand';

import { RESOLUTION_LIST } from '@/lib/constants';

type State = {
  prompt?: string;
  modal?: string;
  style?: string;
  nagativePrompt?: string;
  resolution?: string;
};

type Actions = {
  updateDefaultStore: (obj: State) => void;
  resetDefault: () => void;
};

const DEFAULT_DATA: State = {
  prompt: '',
  style: '',
  nagativePrompt: '',
  resolution: RESOLUTION_LIST[0].value,
  modal: '',
};

const useDefaultModalStore = create<State & Actions>((set) => ({
  ...DEFAULT_DATA,
  updateDefaultStore: (modalObj) => set(modalObj),
  resetDefault: () => set(DEFAULT_DATA),
}));

export default useDefaultModalStore;
