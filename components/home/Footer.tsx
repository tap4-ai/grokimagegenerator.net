import { HTMLAttributeAnchorTarget } from 'react';
import { useTranslations } from 'next-intl';

import { CONTACT_US_EMAIL } from '@/lib/env';
// import Link from 'next/link';
import { Link } from '@/app/navigation';

// import BaseImage from '../image/BaseImage';

// const LOGO_LIST = [
//   {
//     title: 'twitter',
//     href: TWITTER_LINK,
//   },
//   {
//     title: 'youtube',
//     href: YOUTUBE_LINK,
//   },
//   {
//     title: 'ins',
//     href: INS_LINK,
//   },
// ];

function InfoLink({
  href,
  title,
  target,
  type,
}: {
  href: string;
  title: string;
  target?: HTMLAttributeAnchorTarget;
  type?: string;
}) {
  return (
    <Link
      href={href}
      title={title}
      className='text-nowrap text-xs hover:opacity-70 lg:text-sm'
      target={target}
      type={type}
    >
      {title}
    </Link>
  );
}

// function Logo({ src, title }: { src: string; title: string }) {
//   return (
//     <BaseImage
//       src={src}
//       title={title}
//       alt={title}
//       width={52}
//       height={52}
//       className='h-[32px] w-[32px] hover:cursor-pointer hover:opacity-70 lg:h-[42px] lg:w-[42px]'
//     />
//   );
// }

export default function Footer() {
  const t = useTranslations('Footer');

  // const WebsiteLinkList = [
  //   // {
  //   //   title: t('artiverseHub'),
  //   //   href: 'https://artiversehub.ai',
  //   //   target: '_blank',
  //   // },
  //   // {
  //   //   title: t('animegirl'),
  //   //   href: 'https://www.tattooai.design/',
  //   //   target: '_blank',
  //   // },
  //   {
  //     title: t('tattooai'),
  //     href: 'https://www.tattooai.design/',
  //     target: '_blank',
  //   },
  // ];

  const FEATURE_LINK = [
    {
      title: t('feature.blog'),
      href: '/blog',
    },
    // {
    //   title: t('feature.flux-ai-image-generator'),
    //   href: '/flux-ai-image-generator',
    // },
  ];

  const INFO_LIST = [
    {
      title: t('privacy'),
      href: '/privacy-policy',
    },
    {
      title: t('termsConditions'),
      href: '/terms-of-service',
    },
  ];

  return (
    // <footer className='w-full bg-[#15141A]'>
    <footer className='w-full bg-black'>
      <div className='mx-auto flex min-h-[251px] max-w-pc flex-col items-center justify-between p-10 pb-5 lg:h-[180px] lg:flex-row lg:px-0 lg:pb-10'>
        <div className='flex flex-col items-center lg:items-stretch'>
          <p className='text-xl font-bold text-white lg:h-8 lg:text-[32px]'>{t('title')}</p>
          <p className='text-xs'>{t('subTitle')}</p>
          {/* <div className='mt-5 flex gap-6'>
            {LOGO_LIST.map((item) => (
              <Link key={item.title} href={item.href} target='_blank'>
                <Logo src={`/images/home/${item.title}.png`} title={item.title} />
              </Link>
            ))}
          </div> */}
        </div>
        <div className='mt-5 flex flex-col items-center gap-y-5 lg:mt-0 lg:flex-row lg:items-stretch lg:gap-x-10'>
          {/* <div className='flex flex-col items-center gap-3 lg:items-start'>
            <h2 className='text-white/40'>{t('support')}</h2>
            <ul className='flex flex-col items-center gap-5 lg:items-start'>
              {WebsiteLinkList.map((item) => (
                <li key={item.href}>
                  <InfoLink href={item.href} title={item.title} target={item.target} />
                </li>
              ))}
            </ul>
          </div> */}
          <div className='flex flex-col items-center gap-3 lg:items-start'>
            <p className='text-white/40'>{t('feature-link')}</p>
            {FEATURE_LINK.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={item.title}
                className='flex items-center gap-1.5 text-xs hover:opacity-70 lg:text-sm'
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className='flex flex-col items-center gap-3 lg:items-start'>
            <p className='text-white/40'>{t('support')}</p>
            <ul className='flex flex-col items-center gap-5 lg:items-start'>
              {INFO_LIST.map((item) => (
                <li key={item.href}>
                  <InfoLink href={item.href} title={item.title} />
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${CONTACT_US_EMAIL}`}
                  className='hover:opacity-70e text-nowrap text-sm'
                  title={t('contactUs')}
                  type='email'
                >
                  {t('contactUs')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
