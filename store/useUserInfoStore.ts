import type { LoginVo, UserInfo } from '@/network/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORE_FREFIX } from '@/lib/constants';

export type UserInfoState = {
  auth: LoginVo | null;
  userInfo: UserInfo | null;
  hasHydrated: boolean;
};

type Actions = {
  setAuth: (auth: LoginVo) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  resetAll: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const USER_INFO_KEY = `${STORE_FREFIX}-local-userInfo`;

const useUserInfoStore = create(
  persist<UserInfoState & Actions>(
    (set, get) => ({
      auth: get()?.auth || null,
      userInfo: get()?.userInfo || null,
      hasHydrated: false,
      setAuth: (auth) => set({ auth }),
      setUserInfo: (userInfo) => set({ userInfo }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      resetAll: () => {
        set({ auth: null, userInfo: null });
        localStorage.removeItem(USER_INFO_KEY);
      },
    }),
    {
      name: USER_INFO_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserInfoStore;
