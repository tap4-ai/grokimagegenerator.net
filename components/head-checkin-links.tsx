import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import CheckIn from '@/components/check-in';
import LinkIcon from '@/components/svg/link-icon';
import { Link } from '@/i18n/navigation';

export default function HeadCheckinLinks({
  href,
  code,
  className,
}: {
  href?: string;
  code?: string;
  className?: string;
}) {
  const t = useTranslations();

  return (
    <div className={cn('flex w-full flex-col justify-center gap-3 lg:flex-row', className)}>
      <Link
        href={href || '/flux-ai-image-generator'}
        className='flex h-14 rounded-xl bg-color-main p-px hover:opacity-70'
      >
        <div className='rounded-inherit flex flex-1 items-center gap-5 text-nowrap px-5'>
          <div className='flex items-center gap-1 text-nowrap'>
            {t(`Navigation.${code || 'flux-ai-image-generator'}`)}
            <ChevronRight className='h-4 w-4' />
          </div>
          <LinkIcon className='ml-auto' />
        </div>
      </Link>
      <CheckIn />
    </div>
  );
}
