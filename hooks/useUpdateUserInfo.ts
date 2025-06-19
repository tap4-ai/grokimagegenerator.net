import { useEffect, useRef, useState } from 'react';
import { getUserInfo } from '@/network/auth';
import useUserInfoStore from '@/store/useUserInfoStore';

import { generateBearerToken } from '@/lib/utils/stringUtils';

const useUpdateUserInfo = (shouldUpdateUserInfoOnMount = true) => {
  const [loading, setLoading] = useState(false);
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const onceRef = useRef(true);

  const updateUserInfo = async () => {
    try {
      setLoading(true);
      const res = await getUserInfo(generateBearerToken(useUserInfoStore.getState().auth?.access_token || ''));
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

  const updateUserInfoWithDelay = (delay = 2000) => {
    setTimeout(async () => {
      await updateUserInfo();
    }, delay);
  };

  useEffect(() => {
    if (onceRef.current && shouldUpdateUserInfoOnMount) {
      onceRef.current = false;
      updateUserInfo();
    }
  }, []);

  return { updateUserInfo, updateUserInfoWithDelay, loading };
};

export default useUpdateUserInfo;
