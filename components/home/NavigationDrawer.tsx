'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Fragment, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
// import { ExternalLink } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { NAV_LINKS, UTM_SOURCE } from '@/lib/constants';
import { cn } from '@/lib/utils';

// import RenderIcon from './icon';

export function targetLink(href: string, locale: string): string {
  return `${process.env.NEXT_PUBLIC_TAP4_BLOG_SITE_URL}/${locale}${href}?utm_source=${UTM_SOURCE}`;
}

function NavDrawerItem({
  isActive,
  name,
  hasChild,
  isExpanded,
  // target
}: {
  isActive: boolean;
  name: string;
  hasChild?: boolean;
  isExpanded?: boolean;
  // target?: string
}) {
  return (
    <li
      className={cn(
        'flex h-[28px] w-full items-center justify-between rounded-lg border border-transparent bg-[#2C2D36] pr-2 pl-3.5',
        isActive && 'border-white bg-[#15141A]',
      )}
    >
      <div className={cn('size-3 rounded-full bg-[#15141A]', isActive && 'bg-white')} />
      <div className={cn('flex items-center gap-2 text-sm text-white/40', isActive && 'text-white')}>
        {name}
        {hasChild && (isExpanded ? <ChevronDown className='size-4' /> : <ChevronRight className='size-4' />)}
        {/* {target && <ExternalLink className='size-4' />} */}
      </div>
    </li>
  );
}

export default function NavigationDrawer({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(open);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
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

  const toggleExpanded = (code: string) => {
    setExpandedItems((prev) => (prev.includes(code) ? prev.filter((item) => item !== code) : [...prev, code]));
  };

  return (
    <>
      <div
        className={cn('fixed z-50 h-screen w-screen overflow-hidden bg-black/60', isOpen ? 'block' : 'hidden')}
        onClick={onClose}
      />
      <div
        className={cn(
          'fixed top-16 right-0 z-99999 h-[calc(100%-64px)] w-[276px] transform bg-black shadow-lg transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className='flex size-full flex-col gap-3 px-3 py-6'>
          {NavLinks.map((item) => (
            <Fragment key={item.code}>
              <button
                type='button'
                onClick={
                  item.children
                    ? () => toggleExpanded(item.code)
                    : item.href
                      ? () => onRoute(item.href as string)
                      : undefined
                }
              >
                <NavDrawerItem
                  name={item.label}
                  // target={item.target}
                  hasChild={!!item.children}
                  isExpanded={expandedItems.includes(item.code)}
                  isActive={pathname === item.href || (pathname.includes(item.href as string) && item.href !== '/')}
                />
                <span className='sr-only'>{item.label}</span>
              </button>
              {item.children && expandedItems.includes(item.code) && (
                <div className='ml-4 flex flex-col gap-2'>
                  {item.children.map((child) => (
                    <button
                      key={child.code}
                      type='button'
                      onClick={() => onRoute(child.href as string)}
                      className='flex items-center gap-3 rounded-lg bg-[#1A1B23] p-3 transition-colors hover:bg-[#2C2D36]'
                    >
                      <div className='flex-1 text-left'>
                        <div className='text-sm font-semibold text-white/90'>{child.label}</div>
                        <p className='mt-1 text-xs text-white/60'>{child.content}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
