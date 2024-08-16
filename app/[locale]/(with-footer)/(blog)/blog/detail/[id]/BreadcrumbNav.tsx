import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type Props = {
  prevList: { name: string; href: string }[];
  currentTitle: string;
};

export default function BreadcrumbNav({ prevList, currentTitle }: Props) {
  return (
    <Breadcrumb className='flex-center w-full'>
      <BreadcrumbList className='flex flex-nowrap items-center gap-2 overflow-hidden lg:gap-5'>
        {prevList.map((item) => (
          <Fragment key={item.href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href} title={item.name} className='text-[#FFFFFF66] hover:text-white'>
                {item.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator iconClassName='text-[#FFFFFF66]' />
          </Fragment>
        ))}
        <BreadcrumbItem className='overflow-hidden'>
          <BreadcrumbPage className='truncate'>{currentTitle}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
