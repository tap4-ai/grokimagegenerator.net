export const NAV_LINKS = [
  {
    code: 'tools',
    children: [
      {
        code: 'flux-ai-image-generator',
        href: 'https://flux-ai.io/flux-ai-image-generator/',
      },
      // {
      //   code: 'flux-ai-sticker-generator',
      //   href: '/flux-ai-sticker-generator',
      // },
      // {
      //   code: 'flux-ai-medal-generator',
      //   href: 'https://flux-ai.io/flux-ai-medal-generator/',
      // },
      // {
      //   code: 'flux-ai-anime-generator',
      //   href: 'https://flux-ai.io/flux-ai-anime-generator/',
      // },
      // {
      //   code: 'flux-ai-image-generator',
      //   href: '/flux-ai-image-generator',
      // },
      // {
      //   code: 'flux-ai-image-generator',
      //   href: '/flux-ai-image-generator',
      // },
    ],
  },
  {
    code: 'dream-ai-video',
    href: 'https://dreammachineai.online/',
    target: '_blank',
  },
  {
    code: 'prompt-market',
    href: 'https://flux-ai.io/prompt-market/',
  },
  {
    code: 'pricing',
    href: 'https://flux-ai.io/pricing/',
  },
  {
    code: 'blog',
    href: '/blog',
  },
];

export const UTM_SOURCE = 'flux-ai';

export const PROFILE_NAV_LINKS = [
  {
    code: 'user-info',
    href: '/profile/user-info',
  },
  {
    code: 'history',
    href: '/profile/history',
  },
  {
    code: 'order',
    href: '/profile/order-records',
  },
];

export const SecondsPerMin = 60 * 1000;
export const SecondsPerHour = SecondsPerMin * 60;
export const SecondsPerDay = SecondsPerHour * 24;
export const SecondsPerWeek = 7 * SecondsPerDay;
export const SecondsPerMonth = 30 * SecondsPerDay;

export const RevalidateOneHour = 3600;
export const RevalidateOneDay = 3600 * 24;
export const RevalidateOneWeek = 3600 * 24 * 7;
export const RevalidateOneMonth = 3600 * 24 * 30;

export const METADATA_TITLE_SUBFIX = 'grokimagegenerator.net';
export const PAGE_SIZE = 20;
export const ALL_TAG = 'all';

export const TwitterLink = 'https://x.com/tap4ai';

export const GA_CODE = 'ga-code';
export const VIP_CREDITS = 8000;
export const HEADER_IP_KEY = 'x-client-ip';

export const PROMPT_MARKET_TAPS = [
  {
    id: 'all',
    nameId: '',
    name: 'all',
  },
  {
    id: '1821564383445254146',
    nameId: 'Wallpaper',
    name: 'Wallpaper',
  },
  {
    id: '1821564438273196033',
    nameId: 'Anime',
    name: 'Anime',
  },
  {
    id: '1821564498067193857',
    nameId: 'Medal',
    name: 'Medal',
  },
  {
    id: '1821564562948882433',
    nameId: 'DailyBible',
    name: 'DailyBible',
  },
];

export const IMAGE_RESOLUTION_LIST = [
  {
    name: '1:1',
    value: '1:1',
    iconWidth: '14px',
    iconHeight: '14px',
  },
  {
    name: '16:9',
    value: '16:9',
    iconWidth: '22px',
    iconHeight: '12px',
  },
  {
    name: '9:16',
    value: '9:16',
    iconWidth: '12px',
    iconHeight: '22px',
  },
  {
    name: '3:2',
    value: '3:2',
    iconWidth: '16px',
    iconHeight: '13px',
  },
  {
    name: '2:3',
    value: '2:3',
    iconWidth: '13px',
    iconHeight: '16px',
  },
  // {
  //   name: '21:9',
  //   value: '21:9',
  // },
  // {
  //   name: '4:5',
  //   value: '4:5',
  // },
  // {
  //   name: '5:4',
  //   value: '5:4',
  // },
  // {
  //   name: '9:21',
  //   value: '9:21',
  // },
];

export const IMAGE_STYLE_LIST = [
  {
    name: 'flux.1 schnell',
    value: 'flux-schnell',
    credit: 10,
  },
  {
    name: 'flux.1 pro',
    value: 'flux-pro',
    credit: 100,
  },
];

export const RESOLUTION_LIST = [
  {
    value: '776x998',
    name: '776*998',
    size: 15,
  },
  {
    value: '682x998',
    name: '682*998',
    size: 15,
  },
  {
    value: '1024x1024',
    name: '1024*1024',
    size: 12,
  },
  {
    value: '998x682',
    name: '998*682',
    size: 15,
  },
  {
    value: '998x776',
    name: '998*776',
    size: 15,
  },
];

export const TATTOO_MODAL = { modelName: 'sdxl-fresh-ink', platformType: 23, icon: '', credit: 20 };

export type PriceCard = {
  name: string;
  type: string;
  package_type: string;
  price: number;
  currency: string;
  credits: number;
  discountRate: number;
  content: string;
  id: string;
  gaCode: string;
};

export const PricingList: PriceCard[] = [
  {
    name: 'PopularPackage',
    package_type: 'POPULAR',
    type: 'monthly',
    price: 14.99,
    currency: 'USD',
    credits: 8000,
    discountRate: 0.75,
    content:
      '25% off \nUnlimited models\n Max 80 Flux.1 Pro ImagesMax 800 Flux.1 Schnell Images\nChoose for non-public\nCommercial license\nCancel anytime',
    id: '1821563767004200962',
    gaCode: 'monthly_14d99',
  },
  {
    name: 'CommonPackage',
    package_type: 'COMMON',
    type: 'monthly',
    price: 9.99,
    currency: 'USD',
    credits: 5000,
    discountRate: 0.8,
    content:
      '20% off \nUnlimited models\n Max 50 Flux.1 Pro ImagesMax 500 Flux.1 Schnell Images\nChoose for non-public\nCommercial license\nCancel anytime',
    id: '1821563570127765505',
    gaCode: 'month_9d99',
  },
  {
    name: 'BasicPackage',
    package_type: 'BASIC',
    type: 'one-time',
    price: 9.99,
    currency: 'USD',
    credits: 4000,
    discountRate: 1,
    content:
      'Unlimited models\n Max 40 Flux.1 Pro ImagesMax 400 Flux.1 Schnell Images\nChoose for non-public\nCommercial license',
    id: '1821563279542190082',
    gaCode: 'month_9d9',
  },
];

export const STORE_FREFIX = 'Flux-ai';
export const AUTHORIZATION = 'Authorization';

export const LOGIN_CALLBACK_URL = 'cbUrl';
export const SOCIAL_SOURCE_GITHUB = 'github';
export const SOCIAL_SOURCE_GOOGLE = 'google';
export const SOCIAL_SOURCE_APPLE = 'apple';

export const PAYMENT_INFO_KEY = 'payment';
export const PAYMENT_INFO_TYPE = 'success';
export const SHARED_CONTENT_SUBFIX = 'via grokimagegenerator.net';

export const HOME_OUTER_LINKS = [
  { name: 'Woy AI', href: 'https://woy.ai/' },
  { name: 'Tap4 AI', href: 'https://tap4.ai/' },
  { name: 'AI WITH.Me', href: 'https://aiwith.me/' },
  { name: 'BAI.tools', href: 'https://bai.tools/' },
  { name: 'Dokey AI', href: 'https://dokeyai.com/' },
];
