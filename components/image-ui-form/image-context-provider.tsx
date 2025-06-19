'use client';

import { createContext } from 'react';

export type ImageFormType =
  | 'text2image'
  | 'medal'
  | 'anime'
  | 'lora'
  | 'recraft'
  | 'canny-depth'
  | 'redux'
  | 'flux-fill'
  | 'new-year-avatar'
  | 'new-year-image'
  | 'flux-realism'
  | 'flux-avatar';

export const ImageTypeContenxt = createContext<ImageFormType>('text2image');

export default function ImageContenxtProvider({
  imageFormType,
  children,
}: {
  imageFormType: ImageFormType;
  children: React.ReactNode;
}) {
  return <ImageTypeContenxt.Provider value={imageFormType}>{children}</ImageTypeContenxt.Provider>;
}
