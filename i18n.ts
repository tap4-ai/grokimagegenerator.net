import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const languages = [
  {
    code: 'en-US',
    lang: 'en',
    backendValue: 'en',
    label: 'English',
  },
  {
    code: 'ja-JP',
    lang: 'ja',
    backendValue: 'jp',
    label: '日本語',
  },
  {
    code: 'pt-BR',
    lang: 'pt',
    backendValue: 'pt',
    label: 'Português',
  },
  {
    code: 'es-ES',
    lang: 'es',
    backendValue: 'es',
    label: 'Español',
  },
  {
    code: 'de-DE',
    lang: 'de',
    backendValue: 'de',
    label: 'Deutsch',
  },
  {
    code: 'ru-RU',
    lang: 'ru',
    backendValue: 'ru',
    label: 'Русский',
  },
  {
    code: 'fr-FR',
    lang: 'fr',
    backendValue: 'fr',
    label: 'Français',
  },
  {
    code: 'zh-CN',
    lang: 'cn',
    backendValue: 'zh',
    label: '简体中文',
  },
  {
    code: 'zh-TW',
    lang: 'tw',
    backendValue: 'tw',
    label: '繁體中文',
  },
  {
    code: 'ko-KR',
    lang: 'ko',
    backendValue: 'ko',
    label: '한국어',
  },
  {
    code: 'th-TH',
    lang: 'th',
    backendValue: 'th',
    label: 'ไทย',
  },
  {
    code: 'vi-VN',
    lang: 'vi',
    backendValue: 'vi',
    label: 'Tiếng Việt',
  },
  {
    code: 'ar-SA',
    lang: 'ar',
    backendValue: 'ar',
    label: 'العربية',
  },
];

export const generateLanguagePaths = (baseRoute: string, route: string) =>
  languages.reduce(
    (paths, { code, lang }) => ({
      ...paths,
      [lang === 'en' ? 'x-default' : code]: lang === 'en' ? `${baseRoute}/${route}` : `${baseRoute}/${lang}/${route}`,
    }),
    {},
  );

export const locales = languages.map((lang) => lang.lang);

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
