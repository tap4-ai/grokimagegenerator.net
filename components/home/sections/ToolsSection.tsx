import { useTranslations } from 'next-intl';

import { NAV_LINKS } from '@/lib/constants';

import ToolsItem from './ToolsItem';

export default function ToolsSection() {
  const t = useTranslations('Home.tools');
  const list = NAV_LINKS.find((nav) => nav.code === 'tools')?.children?.map((item) => ({
    ...item,
    title: t(`${item.code}.title`),
    content: t(`${item.code}.content`),
  }));

  return (
    <section className='mx-auto w-full bg-gradient-step-section px-3 py-10 lg:py-16'>
      <div className='mx-auto flex w-full max-w-pc flex-col gap-10 bg-gradient-step-section px-3 lg:gap-16 lg:px-0'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <h2 className='text-[32px] font-semibold'>{t('title')}</h2>
          <p>{t('content')}</p>
        </div>
        <ul className='flex flex-col gap-2 lg:gap-5'>
          {list?.map((item) => (
            <ToolsItem
              key={item.code}
              title={item.title}
              content={item.content}
              href={item.href}
              imgUrl={`/home/tools/${item.code}.jpg`}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
