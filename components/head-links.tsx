import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import CheckIn from '@/components/check-in';
import LinkIcon from '@/components/svg/link-icon';
import { Link } from '@/i18n/navigation';

export default function HeadLinks({ className, checkInClassName }: { className?: string; checkInClassName?: string }) {
  const t = useTranslations();

  return (
    <div className={cn('flex w-full flex-col justify-center gap-3 lg:flex-row lg:items-stretch', className)}>
      <Link
        href='/flux-ai-image-generator'
        className='bg-gradient-link-1 flex h-14 items-center justify-between gap-5 rounded-full px-5 text-white hover:opacity-70'
      >
        <div className='flex items-center gap-1'>
          {t('Navigation.flux-ai-image-generator')}
          <ChevronRight className='ml-auto h-4 w-4' />
        </div>
        <LinkIcon />
      </Link>
      <CheckIn className={checkInClassName} />
    </div>
  );
}
