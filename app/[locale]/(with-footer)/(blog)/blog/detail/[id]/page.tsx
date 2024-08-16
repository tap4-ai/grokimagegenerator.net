import { Metadata } from 'next';
import { getBlogById } from '@/network/blog';
import * as cheerio from 'cheerio';
import DOMPurify from 'isomorphic-dompurify';
import { getTranslations } from 'next-intl/server';

import { Separator } from '@/components/ui/separator';
import MarkdownProse from '@/components/MarkdownProse';

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

export async function generateMetadata({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}): Promise<Metadata> {
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

export default async function Page({ params: { id } }: { params: { id: string } }) {
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
    <div className='flex flex-col items-center bg-[#1B1B21] px-3 py-10 lg:mx-0 lg:my-10 lg:rounded-[32px] lg:p-10'>
      <BreadcrumbNav prevList={prevList} currentTitle={blogData.title} />
      <h1 className='mt-5 text-center text-sm font-bold lg:mt-10 lg:text-2xl'>{blogData.title}</h1>
      <h2 className='mt-3 text-xs font-normal text-[#E8E8EA] lg:text-center lg:text-sm'>{blogData.digest}</h2>
      <img
        src={blogData.coverUrl}
        alt={blogData.title}
        className='mt-3 aspect-auto w-full rounded-2xl bg-black lg:w-[723px]'
      />
      <Separator className='mb-1 mt-5 h-[1px] bg-[#4B4759] lg:mx-5 lg:mb-5 lg:mt-10' />
      {articleNode}
    </div>
  );
}
