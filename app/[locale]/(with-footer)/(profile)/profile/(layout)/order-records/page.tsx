'use client';

import { useState } from 'react';
import useOrderRecords from '@/network/profile/useOrderRecords';
import useUserInfoStore from '@/store/useUserInfoStore';
import { useTranslations } from 'next-intl';

import { PricingList } from '@/lib/constants';
import StatePagination from '@/components/page/StatePagination';

import { OrderRecordsPageSize, TimeList } from '../../../components/constants';
import LoadingList from '../../../components/LoadingList';
import TimeItem from '../../../components/TimeItem';
import TimeOrderSelect from '../../../components/TimeOrderSelect';
import UrlItem from '../../../components/UrlItem';
import Empty from './empty';
import UnsubscribeBtn from './UnsubscribeBtn';

export default function Page({ searchParams: { search, sort } }: { searchParams: { search?: string; sort?: string } }) {
  const t = useTranslations('Profile.order');
  const [pageNum, setPageNum] = useState(1);
  const userInfo = useUserInfoStore((state) => state.userInfo);

  const { isLoading, data, total } = useOrderRecords({
    pageNum,
    pageSize: OrderRecordsPageSize,
    search,
    earliest: !!(sort && sort === TimeList[1].value),
  });

  if (isLoading) {
    return <LoadingList num={OrderRecordsPageSize} />;
  }

  if (!data || total === 0) {
    return <Empty />;
  }

  return (
    <>
      <div className='mb-2 flex items-center justify-between'>
        <TimeOrderSelect />
        {userInfo?.isSubscribed && <UnsubscribeBtn />}
      </div>
      <ul className='flex w-full flex-col gap-2'>
        {data.map((item) => {
          const pricingCard = PricingList.find((p) => p.id === item.memberCardId)!;
          return (
            <li key={item.id} className='w-full'>
              <TimeItem time={item.time} type={`${t('number')}: ${item.id}`} />
              <UrlItem
                dataList={[
                  {
                    title: t('packageType'),
                    value: pricingCard?.type ? t(`type.${pricingCard?.type}`) : '',
                  },
                  {
                    title: t('tokens'),
                    value: String(item.credits),
                  },
                  {
                    title: t('amount'),
                    value: `$ ${Number(item.amount).toFixed(2)}`,
                  },
                ]}
              />
            </li>
          );
        })}
      </ul>
      {!!total && total > 0 && (
        <StatePagination
          currentPage={pageNum}
          pageSize={OrderRecordsPageSize}
          onChange={setPageNum}
          total={total}
          className='mt-2 justify-center'
        />
      )}
    </>
  );
}
