// import { TATTOO_MODAL } from '@/lib/constants';
import { generateBearerToken } from '@/lib/utils/stringUtils';

import serverFetch, { ResponseData } from '../serverFetch';

export type ImageGeneratorRequest = {
  authorization: string; // TODO
  outputPrompt: string; // original prompt text
  aiEnhance?: boolean;
  /**
   * alchemy status for leonardo.ai, default:true
   */
  alchemy?: boolean;
  /**
   * 垫图base64
   */
  base64?: string;
  /**
   * cfg_scale for stable diffusion, default:5
   */
  cfgScale?: number;
  /**
   * clip guidance preset for stable diffusion, default:NONE
   * Enum: FAST_BLUE FAST_GREEN NONE SIMPLE SLOW SLOWER SLOWEST
   */
  clipGuidancePreset?: string;
  /**
   * guidance_scale for leonardo.ai, default: 7
   */
  guidanceScale?: number;
  /**
   * height of the image
   */
  height?: number;
  /**
   * highContrast for leonardo.ai, default: false
   * Note: Controls RAW mode. Set to false to enable RAW mode.
   */
  highContrast?: boolean;
  /**
   * highResolution for leonardo.ai, default: false
   * Enable to use the High Resolution feature of Prompt Magic.
   */
  highResolution?: boolean;
  /**
   * number of images to generate, default 1
   * samples for stable diffusion
   */
  imageNum?: number;
  /**
   * is image public for other users
   */
  isPublic?: number;
  /**
   * model for detail platform
   */
  model?: string;
  /**
   * model name for detail platform
   */
  modelName?: string;
  /**
   * model version for detail platform
   */
  modelVersion?: string;
  /**
   * negative prompt for stable diffusion
   */
  negativePrompt?: string;
  /**
   * 是否过滤NSFW，默认过滤
   */
  nsfwFilter?: number;
  /**
   * photoReal for leonardo.ai, default: false
   */
  photoReal?: boolean;
  /**
   * photoRealStrength for leonardo.ai, default: 0.55
   */
  photoRealStrength?: number;
  /**
   * platform type for generating image,
   */
  platformType?: number;
  /**
   * StylePreset for stable diffusion, default:enhance
   * 3d-model analog-film anime cinematic comic-book digital-art enhance fantasy-art isometric
   * line-art low-poly modeling-compound neon-punk origami photographic pixel-art tile-texture
   */
  presetStyle?: string;
  /**
   * prompt for generating image
   */
  prompt: string;
  /**
   * leonardo Enable to use Prompt Magic.
   */
  promptMagic?: boolean;
  /**
   * leonardo Strength of prompt magic. Must be a float between 0.1 and 1.0
   */
  promptMagicStrength?: number;
  /**
   * leonardo Prompt magic version v2 or v3, for use when promptMagic: true
   */
  promptMagicVersion?: string;
  /**
   * image quality, only support for dalle, default hd
   */
  quality?: string;
  /**
   * seaart 是否面部修复, default: false
   */
  restoreFaces?: boolean;
  /**
   * Sampler stable diffusion, default:5
   * Enum: DDIM DDPM K_DPMPP_2M K_DPMPP_2S_ANCESTRAL K_DPM_2 K_DPM_2_ANCESTRAL K_EULER
   * K_EULER_ANCESTRAL K_HEUN K_LMS
   */
  sampler?: string;
  /**
   * GETIMG_AI
   * euler_a ，euler ，lms ，ddim， dpmsolver++，  pndm
   * Scheduler used to denoise the encoded image latents.
   */
  scheduler?: string;
  /**
   * seed for generating image, default:0
   */
  seed?: number;
  /**
   * 站点，具体和后台确认site id信息
   */
  site?: string;
  steps?: number;
  /**
   * style of the image, only support fro dalle, default is vivid
   */
  style?: string;
  /**
   * style name for model
   */
  styleName?: string;
  /**
   * width of the image
   */
  width?: number;
};

// 定义响应数据的接口
export interface ImageGeneratorResponse {
  code: number;
  msg: string;
  data: {
    created: number;
    imageUrl: string;
    platformType: number;
    modelId: string;
    prompt: string;
    costCredits: number;
  };
}

export interface AsyncGenerationImageResult {
  imageResponseVo?: ImageResponseVo;
  /**
   * key
   */
  key?: string;
  /**
   * 请求的状态 等待：await 失败：failed 成功：success
   */
  status?: string;
}

/**
 * ImageResponseVo
 */
export interface ImageResponseVo {
  /**
   * the category id of the image
   */
  categoryId?: number;
  /**
   * the category name of the image
   */
  categoryName?: string;
  /**
   * the cost of the image
   */
  costCredits?: number;
  /**
   * 创建者
   */
  createBy?: number;
  /**
   * the createTime of the image
   */
  createTime?: Date;
  /**
   * the id of the image
   */
  id?: number;
  /**
   * the mimeType of the image
   */
  mimeType?: string;
  /**
   * the model id of the platform
   */
  modelId?: number;
  /**
   * the modelName of the image
   */
  modelName?: string;
  /**
   * the negativePrompt of the image
   */
  negativePrompt?: string;
  /**
   * the nickName of the image created user
   */
  nickName?: string;
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } };
  /**
   * the ai platform type
   */
  platformType?: number;
  /**
   * the prompt of the image
   */
  prompt?: string;
  /**
   * the resolution of the image
   */
  resolution?: string;
  /**
   * the size of the image
   */
  size?: number;
  /**
   * the tags of the image
   */
  tags?: string;
  /**
   * the thumbnailUrl of the image
   */
  thumbnailUrl?: string;
  /**
   * the title of the image
   */
  title?: string;
  /**
   * 更新者
   */
  updateBy?: number;
  /**
   * 更新时间
   */
  updateTime?: Date;
  /**
   * the url of the image
   */
  url?: string;
}

// function modifyPrompt(style: string, prompt: string, splitor = TATTOO_HINT_SPLITOR) {
//   return `${TATTOO_HINT_FIRST} ${style}${splitor} ${TATTOO_HINT_SECOND} ${prompt}`;
// }

export async function generateImageAsyncApi(data: ImageGeneratorRequest & { style: string }) {
  // const baseData = {
  //   modelName: TATTOO_MODAL.modelName,
  //   platformType: TATTOO_MODAL.platformType,
  // } satisfies Omit<ImageGeneratorRequest, 'prompt' | 'authorization' | 'outputPrompt'>;

  const res = await serverFetch<ResponseData<AsyncGenerationImageResult>>({
    endpoint: '/image/generator4login/async',
    data: {
      // ...baseData,
      ...data,
      // prompt: data.prompt,
    },
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
        authorization: generateBearerToken(data.authorization),
      },
    },
  });
  return res;
}

export const getResult = async (key: string, authorization: string) => {
  const result = await serverFetch<ResponseData<AsyncGenerationImageResult>>({
    endpoint: `/image/getResult/${key}`,
    options: {
      headers: {
        authorization: generateBearerToken(authorization),
        credentials: 'include',
      },
    },
  });
  return result;
};
