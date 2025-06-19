import { useTranslations } from 'next-intl';

import ContentInfo from './content-info';

export default function FYIItem({ mediaType = 'image' }: { mediaType: 'image' | 'video' }) {
  const t = useTranslations(`fyi.${mediaType}`);

  return <ContentInfo title={t('title')} content={t('content')} />;
}
