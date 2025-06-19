/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-template */
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

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
};

export const rgbToHex = (r: number, g: number, b: number): string =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

export const hexToRgb = (hex: string): number[] => {
  const result = hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1)
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16));
  return result ? result : [0, 0, 0];
};

// Add these helper functions above the randomColorList constant
export function generateRandomHexColor(): string {
  // Using HSL for more controlled, design-friendly colors
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 30) + 60; // 60-90%
  const lightness = Math.floor(Math.random() * 30) + 35; // 35-65%

  // Convert HSL to Hex
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  let r;
  let g;
  let b;
  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      // eslint-disable-next-line no-param-reassign
      if (t < 0) t += 1;
      // eslint-disable-next-line no-param-reassign
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export const clientSideGetCookie = (name: string): string => {
  if (!document) return '';

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }
  return '';
};
