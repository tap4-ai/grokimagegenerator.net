import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { PROMPT_MARKET_TAPS, RevalidateOneDay } from '@/lib/constants';

import DiscoverList from '../components/DiscoverList';
import GenerateForm from '../components/GenerateForm';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.flux-ai.image');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export const revalidate = RevalidateOneDay / 2;

const pageItem = PROMPT_MARKET_TAPS.find((item) => item.nameId === 'Wallpaper');

export default async function Page() {
  const t = await getTranslations('flux-ai.image');

  return (
    <div className='flex w-full flex-col items-center gap-10'>
      <div className='flex flex-col items-center gap-1 text-balance text-center lg:gap-3'>
        <h1 className='text-gradient-main text-2xl font-semibold lg:text-5xl'>{t('title')}</h1>
        <h2 className='text-sm lg:text-lg'>{t('content')}</h2>
      </div>
      <GenerateForm showEnhanceBtn formType='text2image' styleName={pageItem?.nameId || ''} />
      <DiscoverList categoryId={pageItem?.id || ''} />
    </div>
  );
}
