import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import LinkBtn from './link-btn';

export default async function ManualSection({
  title,
  imgSrc = 'https://a.aishort.org/home/flux_pro_net/home/step.webp',
  href,
  hrefTitle,
  list,
}: {
  title: string;
  imgSrc?: string;
  href: string;
  hrefTitle: string;
  list: { id: string | number; title: string }[];
}) {
  const t = await getTranslations('Common');

  return (
    <div className='container-centered container-py'>
      <div className='flex flex-col items-center gap-8 lg:flex-row'>
        <div className='flex flex-1 flex-col justify-center'>
          <h2 className='mb-10 text-3xl font-semibold text-white md:text-5xl'>{title}</h2>
          <ul className='flex flex-col gap-5'>
            {list.map((item, idx) => (
              <li key={item.id} className='relative flex flex-1 flex-col gap-2'>
                <div className='flex items-baseline gap-2 text-lg font-bold'>
                  <span className='text-base text-white capitalize'>{t('step')}</span>
                  <span className='font-montserrat text-3xl font-semibold text-white capitalize'>{idx + 1}</span>
                </div>
                <h3 className='text-sm text-white/70'>{item.title}</h3>
              </li>
            ))}
          </ul>
          <LinkBtn href={href} className='mt-8 w-fit'>
            {hrefTitle}
          </LinkBtn>
        </div>
        <Image src={imgSrc} alt={title} width={638} height={450} className='h-auto flex-1 rounded-lg' loading='lazy' />
      </div>
    </div>
  );
}
