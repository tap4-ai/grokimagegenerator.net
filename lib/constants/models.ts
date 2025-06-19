export const FLUX_AI = {
  name: 'flux-schnell-best',
  platform: 31,
};

export const JANUS_PRO = {
  name: 'janus-pro-best',
  platform: 32,
};

export const AVAILABLE_MODELS = [FLUX_AI, JANUS_PRO];

export const FLUX_AI_ASPECT_RATIOS = [
  { value: '16:9', label: '16:9', iconWidth: '22px', iconHeight: '12px' },
  { value: '1:1', label: '1:1', iconWidth: '14px', iconHeight: '14px' },
  { value: '9:16', label: '9:16', iconWidth: '12px', iconHeight: '22px' },
  { value: '4:3', label: '4:3', iconWidth: '16px', iconHeight: '12px' },
  { value: '3:4', label: '3:4', iconWidth: '12px', iconHeight: '16px' },
];

export const JANUS_PRO_ASPECT_RATIOS = [{ value: '1:1', label: '1:1', iconWidth: '14px', iconHeight: '14px' }];
