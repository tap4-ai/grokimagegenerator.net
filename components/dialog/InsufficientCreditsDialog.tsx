'use client';

/* eslint-disable @next/next/no-img-element */
// import { useRouter } from 'next/navigation';
import useInsufficientCreditsStore from '@/store/useInsufficientCreditsStore';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/app/navigation';

import BaseDialog from './BaseDialog';

export default function InsufficientCreditsDialog() {
  const t = useTranslations('Pricing.insufficientDialog');
  const router = useRouter();

  const open = useInsufficientCreditsStore((state) => state.open);
  const setOpen = useInsufficientCreditsStore((state) => state.setOpen);

  const onClose = () => {
    setOpen(false);
  };

  const onOk = async () => {
    onClose();
    router.push('/pricing');
  };

  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      cancelText={t('cancel')}
      onClose={onClose}
      okText={t('pricing')}
      onOk={onOk}
      className='!h-[203px] !w-[328px] bg-[#1D1D27] !p-3'
    >
      <div className='flex size-full items-center justify-center'>
        <div className='absolute left-1/2 top-0 flex h-9 -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-b-full bg-[#1D1D27] px-8 text-sm lg:text-base'>
          {t('title')}
        </div>
        <img src='/images/not-onough-credits.png' alt='pricing' className='h-[82px] w-[142px] translate-y-4' />
      </div>
    </BaseDialog>
  );
}
