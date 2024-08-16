import { useTranslations } from 'next-intl';

import SearchForm from './components/SearchForm';
import TabsList from './components/TabsList';

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('prompt-market');

  return (
    <div className=' mx-auto flex w-full max-w-pc flex-col items-center gap-5'>
      <div className='flex flex-col items-center gap-3 text-balance text-center'>
        <h1 className='text-2xl font-semibold lg:text-5xl'>{t('title')}</h1>
        <p className='text-sm lg:text-lg'>{t('content')}</p>
      </div>
      <SearchForm />
      <TabsList />
      {children}
    </div>
  );
}
