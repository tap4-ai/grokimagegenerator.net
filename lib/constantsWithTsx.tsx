/* eslint-disable import/prefer-default-export */
import Api from '@/components/svg/profile/api';
import Image from '@/components/svg/profile/image';
import Order from '@/components/svg/profile/order';
import Submit from '@/components/svg/profile/submit';
import UserInfo from '@/components/svg/profile/userinfo';

import { PROFILE_NAV_LINKS } from './constants';

export const PROFILE_NAV_LINKS_WITH_ICON = PROFILE_NAV_LINKS.map((item) => {
  let icon: React.ReactNode = null;
  if (item.code === 'user-info') {
    icon = <UserInfo />;
  }
  if (item.code === 'history') {
    icon = <Image />;
  }
  if (item.code === 'submit') {
    icon = <Submit />;
  }
  if (item.code === 'order') {
    icon = <Order />;
  }
  if (item.code === 'api') {
    icon = <Api />;
  }
  return { ...item, icon };
});
