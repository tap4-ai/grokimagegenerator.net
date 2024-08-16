import { useTranslations } from 'next-intl';

import CoreFeaturesCard from './CoreFeaturesCard';
import SectionHeader from './SectionHeader';

export default function CoreFeaturesSection() {
  const list = Array.from({ length: 5 }, (_, idx) => idx + 1);
  const t = useTranslations('Home.coreFeatures');

  return (
    <section className='mx-auto flex max-w-pc flex-col gap-3 px-3 lg:px-0'>
      <SectionHeader title={t('title')} content={t('subTitle')} />
      <ul className='flex flex-col justify-center gap-3 lg:flex-row'>
        {list.slice(0, 3).map((num) => (
          <CoreFeaturesCard
            key={num}
            src={`/images/home/core/${num}.png`}
            title={t(`${num}.title`)}
            content={t(`${num}.subTitle`)}
          />
        ))}
      </ul>
      <ul className='flex flex-col justify-center gap-3 lg:flex-row'>
        {list.slice(-2).map((num) => (
          <CoreFeaturesCard
            key={num}
            src={`/images/home/core/${num}.png`}
            title={t(`${num}.title`)}
            content={t(`${num}.subTitle`)}
          />
        ))}
      </ul>
    </section>
  );
}
