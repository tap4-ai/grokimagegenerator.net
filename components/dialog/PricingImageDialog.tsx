'use client';

import { useState } from 'react';
import { getPriceOrder } from '@/network/pricing';
import usePricingDialogStore from '@/store/usePricingDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { CircleArrowRight, CircleX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { GA_CODE, PAYMENT_INFO_KEY, PAYMENT_INFO_TYPE, PricingList } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
// import { useRouter } from 'next/navigation';
import { useRouter } from '@/app/navigation';

const packgeType = 'COMMON';
const pricingItem = PricingList.find((item) => item.package_type === 'COMMON')!;

export default function PricingImageDialog({ className, buttonId }: { className?: string; buttonId?: string }) {
  const t = useTranslations('Pricing');
  const router = useRouter();

  const userInfo = useUserInfoStore((state) => state.userInfo);

  const [loading, setLoading] = useState(false);

  const open = usePricingDialogStore((state) => state.open);
  const imageUrl = usePricingDialogStore((state) => state.imageUrl);
  const imageName = usePricingDialogStore((state) => state.imageName);
  const setOpen = usePricingDialogStore((state) => state.setOpen);
  const setCloseAndResetImage = usePricingDialogStore((state) => state.setCloseAndResetImage);

  const onClose = () => {
    setCloseAndResetImage();
  };

  const handlePay = async () => {
    if (!userInfo) return;
    try {
      setLoading(true);
      const res = await getPriceOrder({
        memberCardId: pricingItem.id,
        successUrl: `${window.location.origin}?${PAYMENT_INFO_KEY}=${PAYMENT_INFO_TYPE}&${GA_CODE}=${pricingItem.gaCode}`,
        cancelUrl: `${window.location.origin}/pricing`,
      });
      if (res?.code !== 200) {
        throw new Error(res.msg);
      }
      router.replace(res.data);
      setCloseAndResetImage();
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const goToPricing = () => {
    router.push('/pricing');
    setCloseAndResetImage();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        closeBtnClassName='hidden'
        className={cn(
          'flex min-h-[413px] w-[311px] !rounded-2xl border-none bg-card-black p-2 lg:h-[520px] lg:min-w-[741px] lg:p-4',
          className,
        )}
      >
        <div className='relative flex flex-1 gap-4'>
          <img
            className='hidden h-[488px] w-[334px] rounded-xl bg-black lg:block'
            src={imageUrl || '/images/auth/auth.jpg'}
            alt={imageName || 'priceModal'}
            title={imageName || 'priceModal'}
          />
          <div className='flex flex-1 shrink-0 flex-col rounded-xl border border-main-green bg-black py-5 pl-3 lg:w-[359px]'>
            <DialogClose asChild>
              <button
                type='button'
                className='absolute right-0 top-0 -translate-y-1/3 translate-x-1/3'
                onClick={onClose}
              >
                <CircleX className='rounded-full bg-[#1D1D27] text-main-green' />
                <span className='sr-only'>{t('pricingImageDialog.close')}</span>
              </button>
            </DialogClose>
            <h2 className='text-gradient-price-dialog-title text-[20px] font-bold lg:text-2xl'>
              {t('pricingImageDialog.title')}
            </h2>
            <div className='text-gradient-price-dialog-title mt-3 text-sm lg:text-[18px]'>{pricingItem.type}</div>
            <div>
              $ <span className='font-din text-[40px]'>{pricingItem.price}</span> /{' '}
              {`${pricingItem.credits} ${t('pricingImageDialog.tokens')}`}
            </div>
            <ul className='w-full space-y-3 px-3 text-sm font-normal leading-4 lg:mt-2'>
              {t(`content.${packgeType}`)
                .split('\n')
                .map((text, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={idx} className='flex font-normal leading-4'>
                    <span className='mr-1'>·</span>
                    <span>{text}</span>
                  </li>
                ))}
            </ul>
            <div className='mt-auto flex items-center gap-2 lg:gap-4'>
              <button
                id={buttonId}
                type='button'
                disabled={loading}
                onClick={handlePay}
                className={cn(
                  'flex-center h-9 flex-1 rounded-full bg-gradient-main text-sm font-bold text-black',
                  loading && 'opacity-70',
                )}
              >
                {t('pricingImageDialog.upgrade')}
              </button>
              <button
                type='button'
                onClick={goToPricing}
                className='flex-center h-9 rounded-l-full border border-white border-r-transparent px-[10px] text-sm'
              >
                {t('pricingImageDialog.more')}
                <CircleArrowRight className='ml-[2px] size-[14px]' />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
