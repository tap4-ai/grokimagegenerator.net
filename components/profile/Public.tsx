import { useTranslations } from 'next-intl';

import EyeClose from '../svg/profile/eye-close';
import EyeOpen from '../svg/profile/eye-open';

export default function Public({ isPublic }: { isPublic: boolean }) {
  const t = useTranslations('Profile.api-call');

  return (
    <div className='flex items-center gap-1'>
      {isPublic ? <EyeOpen /> : <EyeClose />}
      {isPublic ? t('public') : t('private')}
    </div>
  );
}
