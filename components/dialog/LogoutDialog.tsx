'use client';

// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { logout } from '@/network/auth';
import useLogoutDialogStore from '@/store/useLogoutDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useRouter } from '@/app/navigation';

import BaseDialog from './BaseDialog';

export default function LogoutDialog() {
  const t = useTranslations('Logout');
  const router = useRouter();

  const open = useLogoutDialogStore((state) => state.open);
  const setOpen = useLogoutDialogStore((state) => state.setOpen);
  const resetAll = useUserInfoStore((state) => state.resetAll);
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onOk = async () => {
    setLoading(true);
    try {
      await logout();
      toast.success(t('logoutSuccessful'));
      router.refresh();
      resetAll();
      setOpen(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      disabled={loading}
      title={t('title')}
      cancelText={t('cancel')}
      onClose={onClose}
      okText={t('logout')}
      onOk={onOk}
    />
  );
}
