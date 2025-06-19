// import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import Footer from '@/components/home/Footer';

// export async function generateMetadata(): Promise<Metadata> {
//   const t = await getTranslations('Metadata.home');

//   return {
//     title: t('title'),
//     description: t('description'),
//   };
// }

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <main className='mx-auto flex w-full flex-1'>{children}</main>
      <Footer />
    </>
  );
}
