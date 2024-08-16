import { Metadata } from 'next';
import { getExploreImages } from '@/network/prompt-market/server';
import { getTranslations } from 'next-intl/server';

import { PROMPT_MARKET_TAPS, RevalidateOneDay } from '@/lib/constants';

import ImageList, { PAGE_SIZE } from './components/ImageList';

export const revalidate = RevalidateOneDay / 2;

// import TabsList from './components/TabsList';
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.prompt-market');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page({
  searchParams: { prompt, style },
}: {
  searchParams: { prompt?: string; style?: string };
}) {
  const res = await getExploreImages({
    pageNum: 1,
    pageSize: PAGE_SIZE,
    prompt,
    categoryId: style ? PROMPT_MARKET_TAPS.find((item) => item.nameId === style)?.id : '',
  });

  return <ImageList currentPage={1} total={res.total} dataList={res.rows?.imageList} />;
}
