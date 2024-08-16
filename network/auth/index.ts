'use server';

import { cookies } from 'next/headers';

import { AUTHORIZATION } from '@/lib/constants';
import { generateBearerToken } from '@/lib/utils/stringUtils';

import serverFetch, { ResponseData } from '../serverFetch';

export type LoginVo = {
  access_token: string;
  client_id: string;
  expire_in: number;
  expire_date: number; // custom
  /**
   * 用户 openid
   */
  openid: string;
  refresh_expire_in: number;
  refresh_token: string;
  /**
   * 令牌权限
   */
  scope: string;
};

export type UserInfo = {
  /**
   * 返回用户的clientKey
   */
  clientKey: string;
  /**
   * 国家
   */
  countryCode: string;
  /**
   * credits
   */
  credits: number;
  /**
   * 邮箱
   */
  email: string;
  /**
   * user id
   */
  id: number;
  /**
   * 头像
   */
  imageUrl: string;
  /**
   * 付费的用户的credit是否为0
   */
  isCreditZero: boolean;
  /**
   * 是否生效的订阅
   */
  isSubscribed: boolean;
  /**
   * 订阅是否在有效期内
   */
  isValidity: boolean;
  /**
   * 最新购买的套餐id
   */
  memeberCardId: string;
  /**
   * 昵称
   */
  nickName: string;
  /**
   * 性别
   */
  sex: string;
  /**
   * 今日是否签到
   */
  signInTime: number;
  /**
   * 站点
   */
  site: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 0:web 1:app 2: api
   */
  userType: number;
  subscribedExpireTime: number | null;
};

export async function getUserInfo(authorization: string) {
  const res = await serverFetch<ResponseData<UserInfo>>({
    endpoint: '/draw/clientUser/getInfo',
    options: {
      method: 'GET',
      headers: { authorization, credentials: 'include' },
    },
  });
  return res;
}

export type UserData = {
  auth: LoginVo;
  userInfo: UserInfo;
};

export async function loginSystem({
  email,
  password,
  socialData,
}: {
  email?: string;
  password?: string;
  socialData?: any;
}) {
  const res = await serverFetch<ResponseData<LoginVo>>({
    endpoint: '/auth/login',
    data: socialData || {
      grantType: 'password',
      username: `${email}`,
      password,
    },
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  if (res?.code !== 200) {
    return res;
  }

  const result = await getUserInfo(generateBearerToken(res.data.access_token as string));
  const cookieStore = cookies();
  cookieStore.set(AUTHORIZATION, res.data.access_token);
  const expireDate = res.data.expire_in + new Date().getTime();

  return {
    code: result.code,
    msg: result.msg,
    data: {
      auth: {
        ...res.data,
        expire_date: expireDate,
      },
      userInfo: result.data,
    },
  } satisfies ResponseData<UserData>;
}

export async function logout() {
  cookies().delete(AUTHORIZATION);
  const res = await serverFetch<ResponseData>({
    endpoint: '/auth/logout?userType=0',
    options: {
      method: 'POST',
    },
  });
  return res;
}

export async function signupWithEmail({
  userName,
  email,
  password,
}: {
  userName: string;
  email: string;
  password: string;
}) {
  const res = await serverFetch<ResponseData>({
    endpoint: '/auth/register',
    data: { grantType: 'password', nickName: userName, userName: email, email, password },
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
  return res;
}

export async function loginWithSocial(source: string) {
  const res = await serverFetch<ResponseData<string>>({
    endpoint: `/auth/binding/${source}`,
    data: { redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/social-callback?source=${source}` },
  });

  return res;
}

export async function verifyCode({ email, emailCode }: { email: string; emailCode: string }) {
  const res = serverFetch<ResponseData<any>>({
    endpoint: '/auth/updateEmailStatus',
    data: { email, emailCode },
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
  return res;
}

export async function getVerifyCodeByEmail({ email }: { email: string }) {
  const res = serverFetch<ResponseData<any>>({
    endpoint: '/auth/sendEmail',
    data: { email },
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
  return res;
}

export async function resetPassword({
  email,
  emailCode,
  newPassword,
}: {
  email: string;
  emailCode: string;
  newPassword: string;
}) {
  const res = serverFetch<ResponseData<any>>({
    endpoint: '/auth/resetPassword',
    data: { email, emailCode, newPassword },
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
  return res;
}
