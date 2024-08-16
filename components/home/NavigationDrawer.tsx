'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Fragment, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
// import { ExternalLink } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { NAV_LINKS, UTM_SOURCE } from '@/lib/constants';
import { cn } from '@/lib/utils';

import RenderIcon from './icon';

export function targetLink(href: string, locale: string): string {
  return `${process.env.NEXT_PUBLIC_TAP4_BLOG_SITE_URL}/${locale}${href}?utm_source=${UTM_SOURCE}`;
}

function NavDrawerItem({
  isActive,
  name,
  hasChild,
  // target
}: {
  isActive: boolean;
  name: string;
  hasChild?: boolean;
  // target?: string
}) {
  return (
    <li
      className={cn(
        'flex h-[28px] w-full items-center justify-between rounded-lg border border-transparent bg-[#2C2D36] pl-3.5 pr-2',
        isActive && 'border-white bg-[#15141A]',
      )}
    >
      <div className={cn('size-3 rounded-full bg-[#15141A]', isActive && 'bg-white')} />
      <div className={cn('flex items-center gap-2 text-sm text-white/40', isActive && 'text-white')}>
        {name}
        {hasChild && <ChevronDown className='size-4' />}
        {/* {target && <ExternalLink className='size-4' />} */}
      </div>
    </li>
  );
}

export default function NavigationDrawer({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(open);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

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

  const onClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const onRoute = (route: string, target?: string) => {
    if (target) {
      window.open(targetLink(route, locale), target, 'noopener,noreferrer');
      return;
    }

    router.push(route);
    onClose();
  };

  return (
    <>
      <div
        className={cn('fixed z-50 h-screen w-screen overflow-hidden bg-black/60', isOpen ? 'block' : 'hidden')}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed right-0 top-16 z-[99999] h-[calc(100%-64px)] w-[276px] transform bg-black shadow-lg transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className='flex size-full flex-col gap-3 px-3 py-6'>
          {NavLinks.map((item) => (
            <Fragment key={item.code}>
              <button type='button' onClick={item.href ? () => onRoute(item.href as string) : undefined}>
                <NavDrawerItem
                  name={item.label}
                  // target={item.target}
                  hasChild={!!item.children}
                  isActive={pathname === item.href || (pathname.includes(item.href as string) && item.href !== '/')}
                />
                <span className='sr-only'>{item.label}</span>
              </button>
              {item.children?.map((child) => (
                <button
                  key={child.code}
                  type='button'
                  onClick={() => onRoute(child.href as string)}
                  className='flex items-center gap-3 rounded-lg bg-card-black p-2'
                >
                  {RenderIcon(child.code)}
                  <div className='text-left'>
                    <div className='text-sm font-semibold'>{child.label}</div>
                    <p className='text-xs text-white/70'>{child.content}</p>
                  </div>
                </button>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
