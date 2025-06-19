import { useTranslations } from 'next-intl';

export const hfLoraList = [
  { name: 'frosting_lane', id: 'lucataco/flux-dev-lora' },
  { name: 'half_illustration', id: 'davisbro/half_illustration' },
  { name: 'dreambooth', id: 'ptx0/flux-dreambooth-lora-r16-dev' },
  { name: 'photoshoot', id: 'lucataco/flux-queso' },
  { name: 'panorama', id: 'jbilcke-hf/flux-dev-panorama-lora-2' },
  { name: 'frosting', id: 'alvdansen/frosting_lane_flux' },
  {
    name: 'feeling tipsy',
    id: 'https://replicate.delivery/yhqm/Fy4oiamXzN4UJNmEpVS4qyUfSDhUZNC0fRhzHOBud6EYCAWTA/trained_model.tar',
  },
  {
    name: 'high contrast',
    id: 'https://replicate.delivery/yhqm/9vSmRCa8Vv7bFtKfCfXTRzTq4X71tZW0LtLCb1l49bTSo8TTA/trained_model.tar',
  },
];

const useLoraModelsList = () => {
  const t = useTranslations('lora-models');

  return hfLoraList.map((el, idx) => ({
    id: el.id,
    name: t(`${el.name}.name`),
    description: t(`${el.name}.description`),
    imageSrc: `/images/lora-model/${idx + 1}.webp`,
  }));
};

export default useLoraModelsList;
