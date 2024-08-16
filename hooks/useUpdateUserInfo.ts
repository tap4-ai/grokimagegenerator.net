'use client';

import { useState } from 'react';
import { getUserInfo } from '@/network/auth';
import useUserInfoStore from '@/store/useUserInfoStore';

import { generateBearerToken } from '@/lib/utils/stringUtils';

const useUpdateUserInfo = () => {
  const [loading, setLoading] = useState(false);
  const auth = useUserInfoStore((state) => state.auth);
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  const updateUserInfo = async () => {
    try {
      setLoading(true);
      const res = await getUserInfo(generateBearerToken(auth!.access_token));
      if (res?.code === 200) {
        setUserInfo(res?.data);
        return res?.data;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  return { updateUserInfo, loading };
};

export default useUpdateUserInfo;
