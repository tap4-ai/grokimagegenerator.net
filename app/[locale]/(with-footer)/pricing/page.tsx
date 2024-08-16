import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Faq from '@/components/Faq';
import PricingCardList from '@/components/pricing/PricingCardList';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.pricing',
  });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page() {
  const t = await getTranslations('Pricing');
  return (
    <div className=' w-full px-3 lg:px-0'>
      <div className='flex w-full flex-col items-center bg-cover bg-center bg-no-repeat'>
        <h1 className='text-gradient-main mt-5 text-wrap text-center text-4xl font-medium'>{t('title')}</h1>
        <h2 className='my-4 text-lg'>{t('subTitle')}</h2>
        <PricingCardList />
      </div>
      <Faq />
    </div>
  );
}
