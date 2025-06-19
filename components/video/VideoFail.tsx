import { useTranslations } from 'next-intl';

export default function VideoFail() {
  const t = useTranslations('flux-video-ai.creation-list');

  return (
    <div className='flex h-[180px] w-full shrink-0 flex-col items-center justify-center rounded-lg bg-black text-center text-sm text-white/40'>
      {t('VideoFail')}
    </div>
  );
}
