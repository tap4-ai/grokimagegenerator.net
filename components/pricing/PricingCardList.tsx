/* eslint-disable react/jsx-props-no-spreading */
import { useTranslations } from 'next-intl';

import { PricingList } from '@/lib/constants';
import { cn } from '@/lib/utils';

import PricingCard from './PricingCard';

export default function PricingCardList({ className }: { className?: string }) {
  const t = useTranslations('Pricing');

  return (
    <div
      className={cn('my-10 flex flex-col items-center justify-center gap-10 lg:mb-5 lg:mt-2 lg:flex-row', className)}
    >
      {PricingList.map(({ content, ...rest }) => (
        <PricingCard
          key={rest.id}
          content={t(`content.${rest.package_type}`)}
          {...rest}
          className={cn(
            rest.package_type === 'COMMON' && 'order-2 lg:order-1',
            rest.package_type === 'POPULAR' && 'order-1 lg:order-2',
            rest.package_type === 'BASIC' && 'order-3 lg:order-3',
          )}
        />
      ))}
    </div>
  );
}
