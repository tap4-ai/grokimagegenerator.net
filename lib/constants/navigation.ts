export const FREE_IMAGE_FORMAT_CONVERTER_LINKS = [
  { href: '/free-image-format-converter/webp-to-jpg', code: 'webp-to-jpg' },
  { href: '/free-image-format-converter/jpg-to-webp', code: 'jpg-to-webp' },
  { href: '/free-image-format-converter/webp-to-png', code: 'webp-to-png' },
  { href: '/free-image-format-converter/png-to-webp', code: 'png-to-webp' },
  { href: '/free-image-format-converter/jpg-to-png', code: 'jpg-to-png' },
  { href: '/free-image-format-converter/png-to-jpg', code: 'png-to-jpg' },
];

export const NAV_LINKS = [
  {
    code: 'grok4-ai-image-generator',
    href: '/grok4-ai-image-generator',
  },
  {
    code: 'free-tools',
    children: [
      {
        code: 'free-image-upscaler',
        href: '/free-image-upscaler',
      },
      ...FREE_IMAGE_FORMAT_CONVERTER_LINKS,
    ],
  },
  {
    code: 'blog',
    href: '/blog',
  },
  // {
  //   code: 'dream-ai-video',
  //   href: 'https://videoweb.ai/image-to-video/',
  //   target: '_blank',
  // },
];
