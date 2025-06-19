import { create } from 'zustand';

import { recraftModelsList } from '@/hooks/translation/useRecraftModelsList';

type State = {
  selectedModalId: string;
};

type Actions = {
  setSelectedModalId: (selectedModalId: string) => void;
};

const useRecraftModalStore = create<State & Actions>((set) => ({
  selectedModalId: recraftModelsList[0].id,
  setSelectedModalId: (selectedModalId) => set({ selectedModalId }),
}));

export default useRecraftModalStore;
