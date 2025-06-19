import { Link } from '@/i18n/navigation';
import { languages } from '@/i18n/routing';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SITE_ID } from '@/lib/env';

import FacebookIcon from '../svg/footer/facebook-icon';
import Linkedin from '../svg/footer/Linkedin';
import Reddit from '../svg/footer/Reddit';
import Twitter from '../svg/footer/Twitter';

const LOGO_LIST = [
  {
    title: 'facebook',
    href: process.env.NEXT_PUBLIC_FACEBOOK_LINK || '',
    icon: <FacebookIcon />,
  },
  {
    title: 'twitter',
    href: process.env.NEXT_PUBLIC_TWITTER_LINK || '',
    icon: <Twitter />,
  },
  {
    title: 'linkedin',
    href: process.env.NEXT_PUBLIC_LINKEDIN_LINK || '',
    icon: <Linkedin />,
  },
  {
    title: 'reddit',
    href: process.env.NEXT_PUBLIC_REDDIT_LINK || '',
    icon: <Reddit />,
  },
];

function InfoList({
  title,
  dataList,
  prefetch = true,
}: {
  title: string;
  dataList: { title: string; href: string; target?: React.HTMLAttributeAnchorTarget; type?: string }[];
  prefetch?: boolean;
}) {
  return (
    <div className='flex flex-col items-center gap-3 lg:items-start'>
      <p className='text-white/40'>{title}</p>
      <ul className='flex flex-col items-center gap-3 lg:items-start'>
        {dataList.map((el) => (
          <li key={el.href}>
            <Link
              href={el.href}
              title={el.title}
              className='flex items-center gap-1 text-xs text-nowrap hover:underline lg:text-sm'
              target={el.target}
              type={el.type}
              prefetch={prefetch}
            >
              {el.title}
              {el.target === '_blank' && <SquareArrowOutUpRight className='size-4' />}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations('Footer');

  const FEATURE_LINK = [
    {
      title: t('feature.blog'),
      href: '/blog',
    },
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
      <div className='max-w-pc mx-auto flex min-h-[252px] flex-col items-center justify-between p-10 pb-5 lg:flex-row lg:px-0 lg:pb-10'>
        <div className='flex flex-col items-center gap-2 lg:items-start'>
          <p className='text-[24px] font-bold text-white lg:text-[32px]'>{t('title')}</p>
          <p className='text-sm lg:text-base'>{t('subTitle')}</p>
        </div>
        <div className='mt-5 flex flex-col items-center gap-y-5 lg:mt-0 lg:flex-row lg:items-stretch lg:gap-x-10'>
          {/* <InfoList
            title={t('models')}
            dataList={LANDING_PAGE_MODELS.map((model) => ({
              title: model.name,
              href: model.href,
            }))}
          /> */}
          <InfoList title={t('feature-link')} dataList={FEATURE_LINK} />
          <InfoList
            title={t('support')}
            dataList={[
              ...INFO_LIST,
              {
                title: t('contactUs'),
                href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_US_EMAIL}`,
                type: 'email',
              },
            ]}
          />
        </div>
      </div>
      <div className='h-px w-full bg-white/20' />
      <div className='max-w-pc mx-auto flex w-full flex-col items-center justify-between gap-5 py-10 lg:h-16 lg:flex-row lg:py-0'>
        <div className='flex flex-col items-center gap-3 lg:flex-row'>
          <img
            src='/images/logo.svg'
            alt='logo'
            className='size-10'
            fetchPriority='low'
            loading='lazy'
            decoding='async'
          />
          <div className='flex flex-col items-center lg:flex-row'>
            ©️ 2024 {SITE_ID}
          </div>
        </div>
        {/* <div className='flex items-center gap-3'>
          {LOGO_LIST.map((item) => (
            <Link key={item.title} title={item.title} href={item.href} target='_blank' className='hover:opacity-70'>
              {item.icon}
            </Link>
          ))}
        </div> */}
      </div>
      <div className='h-px w-full bg-white/20' />
      <div className='max-w-pc mx-auto grid w-full grid-cols-3 items-center justify-center gap-5 p-5 lg:flex lg:h-16 lg:p-0'>
        {languages.map((language) => (
          <Link
            href={`${process.env.NEXT_PUBLIC_SITE_URL}/${language.lang}/`}
            key={language.code}
            className='hover:underline'
            prefetch={false}
          >
            {language.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
