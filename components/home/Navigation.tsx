'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
// import useGlobalLoginStore from '@/store/useGlobalLoginStore';
// import useLocalRedirectUrlStore from '@/store/useLocalRedirectUrlStore';
// import useLogoutDialogStore from '@/store/useLogoutDialogStore';
// import useUserInfoStore from '@/store/useUserInfoStore';
import { ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { NAV_LINKS } from '@/lib/constants';
// import { PROFILE_NAV_LINKS_WITH_ICON } from '@/lib/constantsWithTsx';
import { cn } from '@/lib/utils';
// import Logout from '@/components/svg/profile/logout';
// // import Link from 'next/link';
import { Link } from '@/app/navigation';

import LocaleSwitcher from '../LocaleSwitcher';
// import Credits from '../svg/Credits';
import { Popover, PopoverContent, PopoverPrimitive, PopoverTrigger } from '../ui/popover';
import RenderIcon from './icon';
import MenuBtn from './MenuBtn';
import NavigationDrawer from './NavigationDrawer';

// import UserAvatar from './UserAvatar';

// function ProfileItem({ icon, title, isActive }: { icon: React.ReactNode; title: string; isActive: boolean }) {
//   return (
//     <div
//       className={cn(
//         'flex h-9 w-full items-center justify-between gap-1.5 rounded-lg px-2 text-sm text-white/70 hover:bg-[#1B1B1C]',
//         isActive && 'bg-[#40434D66] text-white/70',
//       )}
//     >
//       {icon}
//       <span>{title}</span>
//     </div>
//   );
// }

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const locale = useLocale();

  // const userInfo = useUserInfoStore((state) => state.userInfo);
  // const setOpenDialogStore = useLogoutDialogStore((state) => state.setOpen);
  // const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);
  // const setLocalRedirectUrl = useLocalRedirectUrlStore((state) => state.setLocalRedirectUrl);

  const [open, setOpen] = useState(false);
  // const [openUserinfoNav, setOpenUserinfoNav] = useState(false);
  const [openToolsNav, setOpenToolsNav] = useState(false);

  const NavLinks = NAV_LINKS.map((item) => ({
    ...item,
    label: t(`${item.code}`),
    children:
      item.children &&
      item.children?.map((child) => ({
        ...child,
        label: t(`${child.code}`),
        content: t(`${child.code}-content`),
      })),
  }));

  // const openLogin = () => {
  //   setOpen(false);
  //   setLocalRedirectUrl(pathname);
  //   openLoginDialog(true);
  // };

  // const handleLogout = async () => {
  //   setOpenDialogStore(true);
  // };

  return (
    <>
      <header
        className={cn(
          'sticky left-0 top-0 z-50 flex h-[64px] w-full bg-black/40 px-5 backdrop-blur-[6px] lg:px-0',
          pathname === '/' && 'fixed',
        )}
      >
        <nav className='relative mx-auto flex w-full max-w-pc-head flex-1 items-center justify-center'>
          <div className='absolute left-0'>
            <Link className='hover:opacity-80' href='/' title={t('title')}>
              <img
                src='/images/logo.png'
                alt={t('title')}
                title={t('title')}
                width={64}
                height={64}
                className='size-16'
              />
            </Link>
          </div>
          {/* pc */}
          <div className='hidden items-center gap-5 lg:flex'>
            {NavLinks.map((item) => (
              <div key={item.code}>
                {item.children ? (
                  <Popover open={openToolsNav} onOpenChange={setOpenToolsNav}>
                    <PopoverTrigger asChild>
                      <button type='button' className='flex items-center gap-1'>
                        {item.label}
                        <ChevronDown className='size-5 text-white/40' />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className='z-50 flex w-[750px] flex-col gap-3 rounded-lg border-none bg-[#0E0E0F] p-5 text-center text-base font-normal leading-4'>
                      <PopoverPrimitive.Arrow className='fill-card-black' />
                      <ul className='grid grid-cols-2 gap-5'>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              key={child.code}
                              href={child.href as string}
                              onClick={() => setOpenToolsNav(false)}
                              className='flex h-[60px] w-full items-center gap-3 rounded-lg p-2 hover:bg-[#1B1B1C]'
                            >
                              {RenderIcon(child.code)}
                              <div>
                                <div className='text-left font-semibold'>{child.label}</div>
                                <p className='text-left text-sm text-white/70'>{child.content}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Link
                    key={item.code}
                    href={item.href as string}
                    target={item.target}
                    className={cn(
                      'font-semibold text-white/70 hover:text-white',
                      pathname === item.href && 'text-white',
                      pathname.startsWith(item.href as string) && item.href !== '/' && 'text-white',
                      pathname.startsWith(`/${locale}${item.href}`) && item.href !== '/' && 'text-white',
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {/* login */}
          <div className='absolute right-0 flex items-center gap-x-3 lg:ml-0'>
            <LocaleSwitcher />
            {/* mobile */}
            <div className='mx-2 flex items-center gap-x-4 lg:hidden'>
              <MenuBtn open={open} onClick={() => setOpen(!open)} />
            </div>
          </div>
        </nav>
      </header>
      <NavigationDrawer open={open} setOpen={setOpen} />
    </>
  );
}
