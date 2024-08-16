'use client';

// import { useRouter } from 'next/navigation';
import useloginExpireDialogStore from '@/store/useloginExpireDialogStore';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/app/navigation';

import BaseDialog from './BaseDialog';

export default function LoginExpireDialog() {
  const t = useTranslations('Login.loginExpireDialog');
  const router = useRouter();

  const open = useloginExpireDialogStore((state) => state.open);
  const setOpen = useloginExpireDialogStore((state) => state.setOpen);

  const onClose = () => {
    setOpen(false);
  };

  const onOk = () => {
    onClose();
    router.push('/login');
  };

  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      title={t('loginExpireDialogTitle')}
      cancelText={t('loginExpireDialogDialogCancel')}
      onClose={onClose}
      okText={t('loginExpireDialogOk')}
      onOk={onOk}
    />
  );
}
