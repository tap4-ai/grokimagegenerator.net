import { Metadata } from 'next';
import { getBlogById } from '@/network/blog';
import * as cheerio from 'cheerio';
import DOMPurify from 'isomorphic-dompurify';
import { getTranslations } from 'next-intl/server';

import { BASE_URL } from '@/lib/env';
import { formatDate } from '@/lib/utils/timeUtils';
import SubHeading from '@/components/internal-page/sub-heading';
import MarkdownProse from '@/components/MarkdownProse';

import BlogCard from '../../../components/blog-card';
import LikeButton from '../../../components/like-button';
import Share from '../../../components/Share';
import BreadcrumbNav from './BreadcrumbNav';

function parseAndStyleHTML(htmlString: string): string {
  const $ = cheerio.load(htmlString);
  $('li').each((_, el) => {
    $(el).addClass('text-white my-2 list-decimal');
  });
  $('p').each((_, el) => {
    $(el).addClass('font-roboto text-sm w-full text-white mt-6'); // 添加类名
    // $(element).css('color', 'blue'); // 添加样式，这里示例为设置文字颜色为蓝色
  });
  $('span').each((_, el) => {
    $(el).addClass('font-roboto text-sm w-full text-white mt-6'); // 添加类名
    // $(element).css('color', 'blue'); // 添加样式，这里示例为设置文字颜色为蓝色
  });
  $('img').each((_, el) => {
    $(el).addClass('h-80 w-full object-contain');
  });
  $('a').each((_, el) => {
    $(el).addClass('text-button');
  });
  // 返回处理后的 HTML 字符串
  return DOMPurify.sanitize($.html());
}

export async function generateMetadata(props: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const params = await props.params;

  const { locale, id } = params;

  const t = await getTranslations({
    locale,
    namespace: 'Metadata.blog',
  });

  const blogData = await getBlogById(decodeURIComponent(id));

  if (!blogData) return {};

  return {
    title: `${blogData.title} | ${t('titleSuffix')}`,
    description: blogData.digest,
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { id } = params;

  const t = await getTranslations('blog');
  const blogData = await getBlogById(decodeURIComponent(id));
  const prevList = [
    {
      name: 'blog',
      href: '/blog',
    },
  ];

  let articleNode: React.ReactNode = null;

  if (blogData?.detail) {
    articleNode = <MarkdownProse markdown={blogData.detail} />;
  } else {
    articleNode = blogData.content ? (
      <div dangerouslySetInnerHTML={{ __html: parseAndStyleHTML(blogData.content) }} />
    ) : null;
  }

  return (
    <div className='flex w-full flex-col'>
      <div className='mx-auto flex w-full max-w-pc flex-col px-3 py-10 lg:my-10 lg:pt-[120px]'>
        <BreadcrumbNav prevList={prevList} currentTitle={blogData.title} className='justify-center' />
        <div className='flex flex-col items-center gap-10 py-10'>
          <div className='space-y-2 text-left'>
            <h1 className='text-gradient-main text-[32px] font-bold'>{blogData.title}</h1>
            <p className='opacity-70'>{blogData.digest}</p>
          </div>
          <img
            src={blogData.coverUrl}
            alt={blogData.title}
            loading='eager'
            decoding='async'
            className='mt-3 w-full max-w-[720px] rounded-2xl bg-black'
          />
        </div>
        <div className='h-px w-full bg-[#1A1A1A]' />
        <div className='flex flex-col justify-between gap-3 py-5 lg:flex-row'>
          <div className='flex flex-col gap-1'>
            <div className='opacity-70'>
              {t('card.time')}: {formatDate(blogData.createTime)}
            </div>
            <div className='mt-3'>
              <LikeButton nameId={blogData.nameId} likeCount={blogData.up || 0} />
            </div>
          </div>
          <Share shareUrl={`${BASE_URL}/blog/detail/${id}`} className='lg:ml-auto lg:mt-auto' />
        </div>
        <div className='h-px w-full bg-[#1A1A1A]' />
        {articleNode}
      </div>
      <div className='flex w-full flex-col items-center gap-10 bg-[#1B1B21] px-3 py-10 lg:px-0 lg:py-[120px]'>
        <SubHeading title={t('recommend.title')} description={t('recommend.description')} />
        <div className='mx-auto grid max-w-pc grid-cols-1 gap-3 lg:grid-cols-3'>
          {blogData?.recommendBlogList?.map((item) => (
            <BlogCard
              key={item.id}
              title={item.title}
              description={item.digest}
              imgSrc={item.coverUrl}
              href={`/blog/detail/${item.nameId}`}
              time={item.createTime}
              likeCount={item.up || 0}
              nameId={item.nameId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
