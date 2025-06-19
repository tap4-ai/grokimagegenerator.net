import useUserInfoStore from '@/store/useUserInfoStore';
import { useTranslations } from 'next-intl';

import Spinning from '@/components/Spinning';
import { Link } from '@/i18n/navigation';

export default function VideoCreating() {
  const t = useTranslations('video-generator');
  const userInfo = useUserInfoStore((state) => state.userInfo);

  const isProUser = !!userInfo?.isValidity;

  return (
    <div>
      <Spinning className='size-5' />
      <div className='text-sm text-white/40'>{t('wait')}</div>
      {!isProUser && (
        <Link href='/pricing'>
          <div className='h-9 rounded bg-gradient-main p-px'>
            <div className='size-full rounded bg-black'>
              <div className='text-gradient-main flex size-full items-center justify-center rounded px-3'>
                {t('priority')}
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
