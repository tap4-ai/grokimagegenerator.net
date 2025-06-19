import { create } from 'zustand';

import { hfLoraList } from '@/hooks/translation/useLoraModelsList';

type State = {
  selectedModalId: string;
};

type Actions = {
  setSelectedModalId: (selectedModalId: string) => void;
};

const useLoraModalStore = create<State & Actions>((set) => ({
  selectedModalId: hfLoraList[0].id,
  setSelectedModalId: (selectedModalId) => set({ selectedModalId }),
}));

export default useLoraModalStore;
