import { useTranslations } from 'next-intl';

import { numberList } from '@/lib/utils/arrayUtils';
import Faq from '@/components/Faq';

export default function FaqSection() {
  const t = useTranslations('Faq');

  const faqList = numberList(16).map((num) => ({
    question: t(`${num}.question`),
    answer: t(`${num}.answer`),
  }));

  return <Faq title={t('title')} faqList={faqList} />;
}
