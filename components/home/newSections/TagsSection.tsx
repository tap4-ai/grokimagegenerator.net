import { getTranslations } from 'next-intl/server';

import { PROMPT_MARKET_TAPS } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/navigation';

export default async function TagsSection() {
  const t = await getTranslations();

  return (
    <section className='flex max-w-full flex-col items-center gap-5'>
      <div className='space-y-1 text-center'>
        <h2 className='text-2xl font-semibold lg:text-32'>{t('Home.tags.title')}</h2>
        <p className='text-lg'>{t('Home.tags.content')}</p>
      </div>
      <Separator className='h-px w-full bg-main-gray' />
      <div className='no-scrollbar flex max-w-full items-center gap-3 overflow-x-auto px-5'>
        {PROMPT_MARKET_TAPS.slice(1).map((item) => (
          <Link
            key={item.id}
            href={`/flux-prompt-explore?style=${item.nameId}`}
            className='flex-center h-9 text-nowrap rounded-lg border border-main-gray bg-card-black px-3'
          >
            {t(`flux-prompt-explore.tabs.${item.name}`)}
          </Link>
        ))}
      </div>
      <Separator className='h-px w-full bg-main-gray' />
    </section>
  );
}
