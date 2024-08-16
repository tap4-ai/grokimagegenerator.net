import { useTranslations } from 'next-intl';

import StepOne from '@/components/svg/home/StepOne';
import StepThree from '@/components/svg/home/StepThree';
import StepTwo from '@/components/svg/home/StepTwo';

import SectionHeader from './SectionHeader';

function StepCard({ title, content, src, step }: { title: string; content: string; src: string; step: number }) {
  return (
    <li className='relative flex h-[429px] flex-col overflow-hidden rounded-xl bg-card-black p-8'>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p className='text-sm text-white/70'>{content}</p>
      <img
        src={src}
        alt={title}
        title={title}
        className='z-10 mt-auto h-[148px] w-[264px] rounded-md border-2 border-card-black bg-black shadow-[0px_0px_32.6px_0px_rgba(0,0,0,0.60)] lg:h-[236px] lg:w-[420px]'
      />
      <div className='absolute bottom-0 right-0 translate-y-1'>
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
      </div>
    </li>
  );
}

export default function StepSection() {
  const list = Array.from({ length: 3 }, (_, idx) => idx + 1);
  const t = useTranslations('Home.steps');

  return (
    <section className='w-full bg-gradient-step-section py-16'>
      <div className='mx-auto max-w-pc'>
        <SectionHeader title={t('title')} content={t('subTitle')} />
        <ol className='grid grid-cols-1 gap-2 px-3 lg:grid-cols-3 lg:px-0'>
          {list.map((num) => (
            <StepCard
              key={num}
              title={t(`${num}.title`)}
              content={t(`${num}.subTitle`)}
              src={`/images/home/steps/${num}.jpg`}
              step={num}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
