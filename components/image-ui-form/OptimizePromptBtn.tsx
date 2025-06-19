'use client';

import { useEffect, useState } from 'react';
import { optimizeImageForVideoPromptApi } from '@/network/video/client';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import useLocalRedirectUrlStore from '@/store/useLocalRedirectUrlStore';
import usePricingDialogStore from '@/store/usePricingDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import Star from '@/components/svg/video/Star';
import { usePathname } from '@/i18n/navigation';

import Box from './Box';

export default function OptimizePromptBtn({
  prompt,
  successCb,
  imageId,
  className,
  duration = 30,
}: {
  prompt: string;
  successCb: (val: string) => void;
  imageId?: string;
  className?: string;
  duration?: number;
}) {
  const t = useTranslations('components.form-EnhanceBtn');
  const pathname = usePathname();

  const openPricingDialog = usePricingDialogStore((state) => state.setOpen);
  const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);
  const setLocalRedirectUrl = useLocalRedirectUrlStore((state) => state.setLocalRedirectUrl);
  const userInfo = useUserInfoStore((state) => state.userInfo);

  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const isPaidUser = !!userInfo?.isValidity;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsDisabled(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const handleClick = async () => {
    if (!userInfo) {
      setLocalRedirectUrl(pathname);
      openLoginDialog(true);
      return;
    }

    if (!isPaidUser) {
      openPricingDialog(true);
      return;
    }

    if (!prompt.trim()) {
      return;
    }

    setIsDisabled(true);
    setCountdown(duration);
    const data: Parameters<typeof optimizeImageForVideoPromptApi>[0] = { prompt };
    if (imageId) {
      data.imageId = imageId;
    }

    const res = await optimizeImageForVideoPromptApi(data);
    successCb(res.data.newPrompt);

    setIsDisabled(false);
  };

  return (
    <Box>
      <button
        type='button'
        onClick={handleClick}
        disabled={isDisabled || !prompt.trim()}
        className={cn(
          'mx-auto flex flex-1 flex-nowrap items-center justify-center gap-1 text-sm',
          (isDisabled || !prompt.trim()) && 'cursor-not-allowed opacity-40',
          className,
        )}
      >
        <Star />
        <span className='text-color-main'>
          {t('optimizePrompt')}
          {countdown > 0 && ` (${countdown})s`}
        </span>
      </button>
    </Box>
  );
}
