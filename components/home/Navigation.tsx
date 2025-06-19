'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
// import useUserInfoStore from '@/store/useUserInfoStore';
import { useLocale, useTranslations } from 'next-intl';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
// import useInterval from '@/hooks/useInterval';
// import useUpdateUserInfo from '@/hooks/useUpdateUserInfo';

import LocaleSwitcher from '../LocaleSwitcher';
// import Credits from '../svg/Credits';
import MenuBtn from './MenuBtn';
import NavigationDrawer from './NavigationDrawer';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const locale = useLocale();

  // const userInfo = useUserInfoStore((state) => state.userInfo);

  const [open, setOpen] = useState(false);

  // const { updateUserInfo } = useUpdateUserInfo();

  // useInterval(() => {
  //   if (userInfo) {
  //     updateUserInfo();
  //   }
  // });

  const NavLinks = NAV_LINKS.map((item) => ({
    ...item,
    label: t(`${item.code}`),
    // children:
    //   item.children &&
    //   item.children
    //     ?.filter((el) => el.code !== 'dream-ai-video')
    //     .map((child) => ({
    //       ...child,
    //       label: t(`${child.code}`),
    //       content: t(`${child.code}-content`),
    //     })),
  }));

  return (
    <>
      <header
        className={cn('sticky top-0 left-0 z-50 flex h-[70px] w-full bg-transparent px-5 backdrop-blur-md lg:px-0')}
      >
        <nav className='max-w-pc relative mx-auto flex w-full flex-1 items-center justify-between gap-3'>
          <Link className='shrink-0 hover:opacity-80' href='/' title={t('title')}>
            <img src='/images/logo.svg' alt={t('title')} title={t('title')} className='size-16' />
          </Link>
          {/* pc */}
          <div className='ml-auto hidden h-10 items-center gap-3 lg:flex'>
            {NavLinks.map((item) => (
              <div key={item.code}>
                {/* {item.children ? (
                  <NavPopover label={item.label} isHighLight={!!item.isHighLight} navDataList={item.children} />
                ) : ( */}
                <Link
                  key={item.code}
                  href={item.href as string}
                  // target={item.target}
                  rel={item.href.startsWith('http') ? 'nofollow' : undefined}
                  className={cn(
                    'flex h-10 items-center justify-center rounded-lg px-3 font-semibold text-white/70 hover:bg-white/15',
                    pathname === item.href && 'text-color-main',
                    pathname.startsWith(item.href as string) && item.href !== '/' && 'text-color-main',
                    pathname.startsWith(`/${locale}${item.href}`) && item.href !== '/' && 'text-color-main',
                  )}
                >
                  {item.label}
                </Link>
                {/* )} */}
              </div>
            ))}
          </div>
          {/* login */}
          <div className='flex items-center lg:ml-8'>
            <div className='bg-color-5 flex items-center gap-x-3 rounded'>
              {/* {!!userInfo && (
                <>
                  <div className='flex h-8 items-center gap-2 px-3 text-sm text-white/40 lg:h-11'>
                    <Credits /> <span>{userInfo.credits}</span>
                  </div>
                  <div className='bg-color-10 h-6 w-px' />
                </>
              )} */}
              <LocaleSwitcher />
            </div>
            <MenuBtn onClick={() => setOpen(!open)} open={open} className='lg:hidden' />
          </div>
        </nav>
      </header>
      <NavigationDrawer open={open} setOpen={setOpen} />
    </>
  );
}
