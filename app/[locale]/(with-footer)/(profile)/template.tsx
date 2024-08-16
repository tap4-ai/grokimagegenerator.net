'use client';

import { useEffect } from 'react';

import useUpdateUserInfo from '@/hooks/useUpdateUserInfo';

export default function Template({ children }: { children: React.ReactNode }) {
  const { updateUserInfo } = useUpdateUserInfo();

  useEffect(() => {
    updateUserInfo();
  }, []);

  return children;
}
