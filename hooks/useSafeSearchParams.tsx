import { ReadonlyURLSearchParams, useSearchParams as useNextSearchParams } from 'next/navigation';

export const isBrowser = typeof window === 'object' && typeof document === 'object' && document.nodeType === 9;

export const useSafeSearchParams = isBrowser ? useNextSearchParams : () => new ReadonlyURLSearchParams();
