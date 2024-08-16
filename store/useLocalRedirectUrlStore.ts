import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORE_FREFIX } from '@/lib/constants';

type State = {
  localRedirectUrl: string;
};

type Actions = {
  setLocalRedirectUrl: (url: string) => void;
};

export const localRedirectUrlStoreKey = `${STORE_FREFIX}-local-redirectUrl`;

const useLocalRedirectUrlStore = create(
  persist<State & Actions>(
    (set, get) => ({
      localRedirectUrl: get()?.localRedirectUrl || '',
      setLocalRedirectUrl: (url) => set({ localRedirectUrl: url }),
    }),
    {
      name: localRedirectUrlStoreKey,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useLocalRedirectUrlStore;
