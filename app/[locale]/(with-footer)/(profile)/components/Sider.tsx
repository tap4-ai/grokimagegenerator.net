'use client';

// import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useLogoutDialogStore from '@/store/useLogoutDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { useTranslations } from 'next-intl';

import { PROFILE_NAV_LINKS_WITH_ICON } from '@/lib/constantsWithTsx';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import UserAvatar from '@/components/home/UserAvatar';
import Logout from '@/components/svg/profile/logout';
import { Link } from '@/app/navigation';

function SiderItem({ icon, title, isActive }: { icon: React.ReactNode; title: string; isActive: boolean }) {
  return (
    <div
      className={cn(
        'flex h-9 items-center gap-[6px] rounded-lg px-2 text-sm text-white/40 hover:bg-dark-gray',
        isActive && 'bg-dark-gray text-white/70',
      )}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
}

export default function Sider() {
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const t = useTranslations('Navigation.profile');
  const pathname = usePathname();

  const setOpenDialogStore = useLogoutDialogStore((state) => state.setOpen);

  const handleLogout = async () => {
    setOpenDialogStore(true);
  };

  return (
    <div className='sticky top-[82px] hidden max-h-[481px] w-[218px] flex-col rounded-xl bg-card-black p-2 lg:flex'>
      <div className='flex h-14 items-center gap-2 overflow-hidden rounded-lg bg-dark-gray p-2'>
        <UserAvatar name={userInfo?.nickName as string} className='size-10 shrink-0 rounded' />
        <div className='flex-1'>
          <div className='font-bold'>{userInfo?.nickName}</div>
          <div className='text-nowrap text-sm'>
            {t('credits')}: {userInfo?.credits}
          </div>
        </div>
        {/* <div className='text-sm'>{t('top-up')}</div> */}
      </div>
      <div className='mx-3'>
        <Separator className='my-5 h-px bg-[#40434D] px-5' />
      </div>
      <nav className='flex-1'>
        <ul className='flex flex-col gap-3'>
          {PROFILE_NAV_LINKS_WITH_ICON.map((item) => (
            <li key={item.code}>
              <Link href={item.href}>
                <SiderItem icon={item.icon} title={t(`${item.code}`)} isActive={pathname.includes(item.href)} />
              </Link>
            </li>
          ))}
          <li>
            <button type='button' onClick={handleLogout} className='w-full'>
              <SiderItem icon={<Logout />} title={t('logout')} isActive={false} />
              <span className='sr-only'>{t('logout')}</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
