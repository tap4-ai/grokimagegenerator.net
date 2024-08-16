'use client';

import useUserInfoStore from '@/store/useUserInfoStore';
import { useTranslations } from 'next-intl';

import Box from '@/components/Box';
import CopyBtn from '@/components/CopyBtn';

import UrlContentItem from '../../../components/UrlContentItem';

export default function Page() {
  const t = useTranslations('Profile.user-info');
  const userInfo = useUserInfoStore((state) => state.userInfo);

  const emailNode = (
    <div className='flex w-full items-center justify-between'>
      <span>{userInfo?.email}</span>
      <CopyBtn content={userInfo?.email || ''} />
    </div>
  );

  return (
    <div>
      <Box className='mt-px flex flex-col rounded-t-xl bg-dark-gray pt-2'>
        <UrlContentItem title={t('email')} content={emailNode} />
      </Box>
      <Box className='mt-px flex flex-col rounded-b-xl bg-dark-gray pt-2'>
        <div className='flex w-fit flex-col text-sm text-white/40'>
          <h3>{t('creditExplanation')} :</h3>
          <p className='capitalize'>{t('support')}</p>
          <div className='flex items-center gap-3'>
            <a
              href={`mailto:${process.env.CONTACT_US_EMAIL}`}
              className='hover:opacity-70e text-nowrap text-sm hover:underline'
              type='email'
            >
              {process.env.CONTACT_US_EMAIL}
            </a>
            <CopyBtn content={process.env.CONTACT_US_EMAIL as string} />
          </div>
        </div>
      </Box>
    </div>
  );
}
