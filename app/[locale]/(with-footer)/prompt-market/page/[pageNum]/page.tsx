import { Metadata } from 'next';
import { getExploreImages } from '@/network/prompt-market/server';
import { getTranslations } from 'next-intl/server';

import { PROMPT_MARKET_TAPS, RevalidateOneDay } from '@/lib/constants';

import ImageList, { PAGE_SIZE } from '../../components/ImageList';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.prompt-market');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export const revalidate = RevalidateOneDay / 2;

export default async function Page({
  params: { pageNum },
  searchParams: { prompt, style },
}: {
  params: { pageNum: string };
  searchParams: { prompt?: string; style?: string };
}) {
  const currentPage = Number(pageNum);
  const res = await getExploreImages({
    pageNum: currentPage,
    pageSize: PAGE_SIZE,
    prompt,
    categoryId: style ? PROMPT_MARKET_TAPS.find((item) => item.nameId === style)?.id : '',
  });

  return <ImageList currentPage={currentPage} total={res.total} dataList={res.rows?.imageList} />;
}
