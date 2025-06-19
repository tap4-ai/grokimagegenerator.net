import { Metadata } from 'next';
import { getBlogModulesAndList } from '@/network/blog';
import { getTranslations } from 'next-intl/server';

import { PAGE_SIZE } from '@/lib/constants';
import SectionWrapper from '@/components/home/section-wrapper';
import Heading from '@/components/internal-page/heading';
import BasePagination from '@/components/page/BasePagination';

import BlogCard from '../../../components/blog-card';
import ModulesButtons from '../../../components/ModulesButtons';

export async function generateMetadata(props: {
  params: Promise<{ locale: string; module: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { locale, module } = params;

  const t = await getTranslations({
    locale,
    namespace: 'Metadata.blog',
  });

  const resData = await getBlogModulesAndList({
    pageNum: 1,
    pageSize: PAGE_SIZE,
    moduleNameId: module,
    userType: 1,
  });

  const {
    rows: { blogModuleDtoList },
  } = resData;

  return {
    title: `${blogModuleDtoList.find((item) => item.nameId === module)?.name} | ${t('titleSuffix')}`,
    description: `${blogModuleDtoList.find((item) => item.nameId === module)?.name} | ${t('titleSuffix')}`,
  };
}

export default async function Page(props: {
  params: Promise<{
    module: string;
    slug: string | undefined[];
  }>;
}) {
  const params = await props.params;

  const { module, slug } = params;

  const t = await getTranslations('blog');
  const currentPage = Number(slug ? slug[0] : 1);

  const resData = await getBlogModulesAndList({
    pageNum: currentPage,
    pageSize: PAGE_SIZE,
    moduleNameId: module,
    userType: 1,
  });

  const {
    rows: { blogDtoList },
    total,
  } = resData;

  return (
    <div className='mx-auto flex w-full flex-col'>
      <SectionWrapper>
        <Heading title={t('heading.title')} description={t('heading.description')} />
      </SectionWrapper>
      <div className='flex flex-col bg-[#1B1B21] px-3 py-10 lg:px-0 lg:pb-[120px]'>
        <div className='mx-auto w-full max-w-pc'>
          <div className='mb-[18px]'>
            <ModulesButtons activeName={module} />
          </div>
          <div className='grid grid-cols-1 gap-3 lg:grid-cols-3'>
            {/* {blogDtoList.map((item) => (
            <Link key={item.id} href={`/blog/detail/${item.nameId}`} title={item.title}>
              <BlogItem src={item.coverUrl} title={item.title} content={item.digest} />
            </Link>
          ))} */}
            {blogDtoList.map((item) => (
              <BlogCard
                key={item.id}
                nameId={item.nameId}
                href={`/blog/detail/${item.nameId}`}
                imgSrc={item.coverUrl}
                title={item.title}
                description={item.digest}
                time={item.createTime}
                likeCount={item.up}
              />
            ))}
          </div>
        </div>
        {total > 0 && (
          <BasePagination
            className='mt-9 justify-center'
            route={`/category/${module}`}
            total={total}
            pageSize={PAGE_SIZE}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
}
