'use client';

import { useState } from 'react';
import { getPriceOrder } from '@/network/pricing';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import useLocalRedirectUrlStore from '@/store/useLocalRedirectUrlStore';
import useloginExpireDialogStore from '@/store/useloginExpireDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { PAYMENT_INFO_KEY, PAYMENT_INFO_TYPE, PriceCard } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { subtractWithPrecision } from '@/lib/utils/numUtils';
import { useRouter } from '@/app/navigation';

export default function PricingCardNew({
  id,
  type,
  price,
  credits,
  content,
  discountRate,
  package_type,
  className,
}: PriceCard & { className?: string }) {
  const t = useTranslations('Pricing');

  const [loading, setLoading] = useState(false);
  const auth = useUserInfoStore((state) => state.auth);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);
  const setLocalRedirectUrl = useLocalRedirectUrlStore((state) => state.setLocalRedirectUrl);
  const setOpenLoginExpireDialog = useloginExpireDialogStore((state) => state.setOpen);
  const router = useRouter();

  const subscribed = userInfo?.isValidity && userInfo?.memeberCardId && id === userInfo?.memeberCardId.toString();

  const handlePay = async () => {
    if (auth && auth.expire_date < Date.now()) {
      setOpenLoginExpireDialog(true);
      return;
    }

    if (!userInfo) {
      openLoginDialog(true);
      setLocalRedirectUrl('/pricing');
      return;
    }

    try {
      setLoading(true);
      const res = await getPriceOrder({
        memberCardId: id as string,
        successUrl: `${window.location.origin}/payment?${PAYMENT_INFO_KEY}=${PAYMENT_INFO_TYPE}`,
        cancelUrl: `${window.location.origin}/pricing`,
      });
      if (res?.code === 401) {
        setOpenLoginExpireDialog(true);
        return;
      }
      if (res?.code !== 200) {
        throw new Error(res.msg);
      }
      router.replace(res.data);
    } catch (error: any) {
      toast.error(error || t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'relative h-[580px] w-full overflow-hidden rounded-lg bg-main-gray p-px lg:w-[364px]',
        package_type === 'POPULAR' ? 'bg-gradient-main' : '',
        className,
      )}
    >
      {discountRate < 1 && (
        <div className='absolute -right-3 top-0 flex h-7 w-[150px] items-center justify-center rounded-bl-lg bg-gradient-main text-sm font-medium text-black'>
          <span className='mr-[2px] mt-1 font-din'>{subtractWithPrecision(1, discountRate) * 100}% </span>{' '}
          {t('discount')}
        </div>
      )}
      <div className='flex size-full flex-col gap-5 overflow-hidden rounded-lg bg-[#0E0F10]'>
        <div className='flex flex-col items-center gap-3 bg-[#1C1C1C] pt-8'>
          <div className={cn('font-din', package_type === 'POPULAR' && 'text-gradient-main')}>
            $ <span className='font-din text-4xl'>{price}</span> / {credits} {t('tokens')}
          </div>
          <div className='trapezoidal mb-px h-8 w-[291px] bg-[#0E0F10] text-center uppercase leading-8 text-white/70'>
            {t(`type.${type}`)} - {t(`package_type.${package_type}`)}
          </div>
        </div>
        <div className='flex flex-col gap-5 px-5'>
          <button
            type='button'
            onClick={handlePay}
            disabled={loading}
            className={cn(
              'flex h-10 w-full items-center justify-center gap-1 rounded-full border border-white font-semibold hover:scale-105',
              package_type === 'POPULAR' && !subscribed && 'border-none bg-gradient-main text-black',
              subscribed && 'border border-[#51CEB0] bg-transparent text-[#51CEB0]',
            )}
          >
            {subscribed ? (
              <>
                <Check />
                {t('subscribed')}
              </>
            ) : (
              t('purchase')
            )}
          </button>
          <ul className='flex flex-col gap-2'>
            {content.split('\n').map((text) => (
              <li key={text} className='flex leading-5 tracking-widest before:mr-0.5 before:content-["·"]'>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
