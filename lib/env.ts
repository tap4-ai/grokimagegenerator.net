export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  `https://${process.env.VERCEL_URL}` ||
  `http://localhost:${process.env.PORT || 3000}`;

export const BASE_API = process.env.NEXT_BASE_API as string;

export const {
  NEXT_PUBLIC_GOOGLE_TRACKING_ID,
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
  NEXT_PUBLIC_GOOGLE_ADSENSE_URL,
  NEXT_PUBLIC_CLARITY_ID,
  SITE_ID,
  CONTACT_US_EMAIL,
} = process.env as Record<string, string>;
