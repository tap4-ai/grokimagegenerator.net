import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PROMPT_MARKET_TAPS, RevalidateOneDay } from '@/lib/constants';

import DiscoverList from '../components/DiscoverList';
import Form from './Form';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.flux-ai.anime');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export const revalidate = RevalidateOneDay / 2;

const pageItem = PROMPT_MARKET_TAPS.find((item) => item.nameId === 'Anime');

export default async function Page() {
  const t = await getTranslations('flux-ai.anime');

  return (
    <div className='flex w-full flex-col items-center gap-10'>
      <div className='flex flex-col items-center gap-1 text-balance text-center lg:gap-3'>
        <h1 className='text-gradient-main text-2xl font-semibold lg:text-5xl'>{t('title')}</h1>
        <h2 className='text-sm lg:text-lg'>{t('content')}</h2>
      </div>
      <Form styleName={pageItem?.nameId || ''} />
      <DiscoverList categoryId={pageItem?.id || ''} discoverMoreHref='/prompt-market?style=Anime' />
    </div>
  );
}
