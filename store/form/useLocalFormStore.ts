import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORE_FREFIX } from '@/lib/constants';

type State = {
  localIsPublic: boolean;
};

type Actions = {
  setLocalIsPublic: (isPublic: boolean) => void;
};

export const useLocalFormStoreKey = `${STORE_FREFIX}-local-form-store`;

const useLocalFormStore = create(
  persist<State & Actions>(
    (set, get) => ({
      localIsPublic: get()?.localIsPublic || true,
      setLocalIsPublic: (localIsPublic) => set({ localIsPublic }),
    }),
    {
      name: useLocalFormStoreKey,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useLocalFormStore;
