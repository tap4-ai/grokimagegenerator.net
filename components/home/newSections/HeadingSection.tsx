import { useTranslations } from 'next-intl';

export default function HeadingSection() {
  const t = useTranslations('Home.heading');

  return (
    <section className='flex flex-col items-center text-center'>
      <h1 className='text-gradient-main text-2xl font-bold lg:text-5xl'>{t('title')}</h1>
      <h2 className='whitespace-pre-line text-base lg:text-lg'>{t('content')}</h2>
    </section>
  );
}
