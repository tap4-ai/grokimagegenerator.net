import { useTranslations } from 'next-intl';

// import { Vortex } from '@/components/ui/vortex';

import MarqueeList from './MarqueeList';

export default function VortexSection() {
  const t = useTranslations('Home.vortex');

  return (
    <section className='mx-auto flex w-full flex-col items-center gap-10 overflow-hidden rounded-md px-3 lg:px-0'>
      <div className=' flex h-full w-full flex-col items-center justify-center gap-5 lg:gap-16'>
        <div className='flex flex-col items-center text-balance text-center lg:gap-3'>
          <h1 className='text-2xl font-semibold lg:text-5xl'>{t('title')}</h1>
          <p className='lg:text-lg'>{t('content')}</p>
        </div>
      </div>
      <MarqueeList />
    </section>
  );
}
