import { Metadata } from 'next';
import { getBlogModulesAndList } from '@/network/blog';
import { getTranslations } from 'next-intl/server';

import { PAGE_SIZE } from '@/lib/constants';
import BasePagination from '@/components/page/BasePagination';
// import Link from 'next/link';
import { Link } from '@/app/navigation';

import BlogItem from '../../components/BlogItem';
import ModulesButtons from '../../components/ModulesButtons';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.blog',
  });

  return {
    title: `${t('title')} | ${t('titleSuffix')}`,
    description: `${t('title')} | ${t('titleSuffix')}`,
  };
}

export default async function Page({ params: { slug } }: { params: { slug: string[] | undefined } }) {
  const currentPage = Number(slug ? slug[0] : 1);

  const resData = await getBlogModulesAndList({
    pageNum: currentPage,
    pageSize: PAGE_SIZE,
    moduleNameId: slug?.join(''),
    userType: 1,
  });

  if (!resData) return null;
  const {
    rows: { blogDtoList },
    total,
  } = resData;

  return (
    <div className='mx-3 my-10 rounded-2xl bg-[#1B1B21] px-10 py-[42px] lg:mx-0'>
      <div className='mb-[18px]'>
        <ModulesButtons activeName='/' />
      </div>
      <div className='grid grid-cols-1 gap-3 lg:grid-cols-2'>
        {blogDtoList.map((item) => (
          <Link key={item.id} href={`/blog/detail/${item.nameId}`} title={item.title}>
            <BlogItem src={item.coverUrl} title={item.title} content={item.digest} />
          </Link>
        ))}
      </div>
      {total > 0 && (
        <BasePagination
          className='mt-9 justify-center'
          route='/blog'
          total={total}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
