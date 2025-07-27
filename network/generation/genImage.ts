'use server';

import { createCipheriv } from 'crypto';
import serverFetch from '@/network/serverFetch';
import { ResponseData } from '@/network/type';

import { AVAILABLE_MODELS } from '@/lib/constants';

const SECRET_KEY = process.env.AES_SECRET_KEY;

function encryptValue(value: string | number): string {
  if (!SECRET_KEY) {
    throw new Error('AES_SECRET_KEY is not set');
  }

  const timestamp = Date.now();
  const plaintext = `${value}@${timestamp}`;

  // Java 使用的是 AES/ECB/PKCS5Padding (Node.js 中对应 aes-256-ecb)
  // 但 ECB 不需要 IV，需要用 createCipheriv 但传入 null 作为 IV
  const key = Buffer.from(SECRET_KEY, 'utf8');

  // 由于 Node.js 的 ECB 实现问题，我们使用兼容的方式
  const cipher = createCipheriv('aes-256-ecb', key, null);
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return encrypted;
}

export async function generateImage(data: GenerateImageRequest): Promise<GenerateImageResponse | null> {
  try {
    // 验证 Turnstile token
    if (!data.turnstileToken) {
      console.error('缺少人机验证 Token');
      return null;
    }

    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!,
        response: data.turnstileToken,
      }),
    });

    const turnstileResult = await turnstileResponse.json();
    console.log('Turnstile 验证结果:', turnstileResult);

    if (!turnstileResult.success) {
      console.error('人机验证失败:', turnstileResult);
      return null;
    }

    const { platform, modelName } = data;

    if (
      !AVAILABLE_MODELS.some((model) => model.name === modelName) ||
      !AVAILABLE_MODELS.some((model) => model.platform === platform)
    ) {
      return null;
    }
    // 加密必要参数
    const encryptedPlatformType = encryptValue(platform);
    const encryptedModelName = encryptValue(modelName);
    const encryptedBrowserFingerprint = encryptValue(data.browserFingerprint);

    const requestBody = {
      platform: encryptedPlatformType,
      modelName: encryptedModelName,
      browserFingerprint: encryptedBrowserFingerprint,
      prompt: data.prompt,
      width: data.width,
      height: data.height,
    };

    console.log(requestBody, 'requestBody');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // 测试环境添加 X-Forwarded-For (生产环境需要删除)
    if (process.env.NODE_ENV === 'development') {
      headers['X-Forwarded-For'] = '173.45.221.87';
    }

    const result = await serverFetch<ResponseData<GenerateImageResponse>>({
      endpoint: '/image/generator4login/async/free',
      data: requestBody,
      options: {
        method: 'POST',
        headers,
        needCookie: true,
      },
    });

    console.log(result);

    return result.data;
  } catch (error) {
    console.error('生成图片错误:', error);
    return null;
  }
}

export interface GenerateImageRequest {
  platform: number;
  modelName: string;
  prompt: string;
  width: number;
  height: number;
  browserFingerprint: string;
  turnstileToken: string;
}

export type GenerateImageResponse = {
  key: string;
  status: 'await' | 'failed' | 'success';
} | null;
