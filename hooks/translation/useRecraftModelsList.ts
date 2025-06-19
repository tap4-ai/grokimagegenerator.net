import { useTranslations } from 'next-intl';

export const recraftModelsList = [
  { name: 'Recraft V3 Raw', id: 'any' },
  { name: 'Photorealism', id: 'realistic_image' },
  { name: 'Illustration', id: 'digital_illustration' },
  { name: 'Black & white', id: 'realistic_image/b_and_w' },
  { name: 'Hard flash', id: 'realistic_image/hard_flash' },
  { name: 'HDR', id: 'realistic_image/hdr' },
  { name: 'Natural light', id: 'realistic_image/natural_light' },
  { name: 'Studio photo', id: 'realistic_image/studio_portrait' },
  { name: 'Enterprise', id: 'realistic_image/enterprise' },
  { name: 'Motion blur', id: 'realistic_image/motion_blur' },
  { name: 'Pixel art', id: 'digital_illustration/pixel_art' },
  { name: 'Hand drawn', id: 'digital_illustration/hand_drawn' },
  { name: 'Grain', id: 'digital_illustration/grain' },
  { name: 'Infantile sketch', id: 'digital_illustration/infantile_sketch' },
  { name: '2D art 1', id: 'digital_illustration/2d_art_poster' },
  { name: 'Handmade 3d', id: 'digital_illustration/handmade_3d' },
  { name: 'Outline', id: 'digital_illustration/hand_drawn_outline' },
  // { name: 'Carvings', id: 'digital_illustration/carvings' },
  { name: 'Carvings', id: 'digital_illustration/engraving_color' },
  { name: '2D art 2', id: 'digital_illustration/2d_art_poster_2' },
];

const useRecraftModelsList = () => {
  const t = useTranslations('recraft-models');

  return recraftModelsList.map((el, idx) => ({
    id: el.id,
    name: t(`${el.name}.name`),
    // description: t(`${el.name}.description`),
    imageSrc: `https://c.topshort.org/fluxai/recraft_ai/style/${idx + 1}.webp`,
  }));
};

export default useRecraftModelsList;
