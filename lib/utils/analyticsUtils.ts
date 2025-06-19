import { sendGAEvent } from '@next/third-parties/google';

export const sendGAEventBtnClicked = (value: string) => {
  sendGAEvent('event', value);
};

export const sendGAEmail = (email: string) => {
  sendGAEvent('set', 'user_data', { email });
};
