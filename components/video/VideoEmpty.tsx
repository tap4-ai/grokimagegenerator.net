import { useTranslations } from 'next-intl';

export default function VideoEmpty() {
  const t = useTranslations('video-generator');

  return (
    <>
      <img src='/images/creation/empty.png' className='size-[98px]' alt='empty' />
      <div className='text-sm text-white/40'>{t('idea')}</div>
    </>
  );
}
