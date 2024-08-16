'use client';

import { useState } from 'react';
import { unsubscribeApi } from '@/network/profile/orderClient';
import useUserInfoStore from '@/store/useUserInfoStore';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { formatTime } from '@/lib/utils/timeUtils';
import useUpdateUserInfo from '@/hooks/useUpdateUserInfo';
import BaseDialog from '@/components/dialog/BaseDialog';

export default function UnsubscribeBtn() {
  const t = useTranslations('Profile.order.unsubscribe');

  const userInfo = useUserInfoStore((state) => state.userInfo);
  const { updateUserInfo } = useUpdateUserInfo();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const unsubscribe = async () => {
    try {
      setLoading(true);
      const res = await unsubscribeApi(userInfo?.memeberCardId?.toString() || '');
      if (res.code === 200) {
        toast.success(res.msg);
        await updateUserInfo();
      }
      setOpenDialog(false);
    } catch (error) {
      toast.error(error as any);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center gap-2'>
      {userInfo?.subscribedExpireTime ? (
        <div className='flex flex-col text-right text-xs text-white/40'>
          <span>{t('subscribedExpireTime')}</span>
          <span>{formatTime(userInfo?.subscribedExpireTime, 'YYYY-MM-DD')}</span>
        </div>
      ) : null}
      <button
        type='button'
        disabled={loading}
        onClick={() => setOpenDialog(true)}
        className='flex h-9 items-center justify-center rounded-lg bg-dark-gray px-3 text-white/70 hover:opacity-70'
      >
        {t('btn')}
      </button>
      <BaseDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClose={() => setOpenDialog(false)}
        disabled={loading}
        onOk={unsubscribe}
        title={t('dialog-title')}
        cancelText={t('cancel')}
        okText={t('ok')}
      />
    </div>
  );
}
