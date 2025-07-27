import { cn } from '@/lib/utils';

interface IntroductionSectionProps {
  title: string;
  description: string;
  className?: string;
}

export default function IntroductionSection({ title, description, className }: IntroductionSectionProps) {
  return (
    <div className={cn('container-centered relative rounded-xl bg-[#141516]', className)}>
      <div className='pointer-events-none absolute inset-0 rounded-xl border border-solid border-[#2f2f2f]' />
      <div className='relative flex size-full flex-col items-center justify-center'>
        <div className='relative box-border flex size-full flex-col items-center justify-center gap-3 p-6 text-center md:p-10'>
          <h2 className='relative shrink-0 text-2xl font-semibold tracking-wide text-white md:text-3xl'>{title}</h2>
          <p className='relative max-w-5xl shrink-0 text-base leading-relaxed font-normal text-[rgba(255,255,255,0.7)] md:text-lg'>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
