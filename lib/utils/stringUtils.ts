import queryString from 'query-string';

import { removeEmptyProperties } from './objectUtils';

export function objToQueryStr(path: string, obj: Record<keyof any, any>): string {
  const qStr = queryString.stringify(removeEmptyProperties(obj));
  return `${path}${qStr && '?'}${qStr}`;
}

export function generateBearerToken(token: string) {
  return `Bearer ${token}`;
}

export function spaceToDash(text: string) {
  return text.replace(/\s/g, '-');
}

export function dashToSpace(text: string) {
  return text.replace(/-/g, ' ');
}

export function filterString(originalString: string, filterStr: string): string {
  return originalString.replace(new RegExp(filterStr, 'g'), '');
}

export function bignumberString(
  num: number,
  options: { thousand?: string; million?: string; billion?: string } = { thousand: 'K', million: 'M', billion: 'B' },
): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)} ${options.billion}`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)} ${options.million}`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)} ${options.thousand}`;
  }
  return `${num}`;
}

export function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
