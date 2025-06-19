/* eslint-disable no-param-reassign */
import Pica from 'pica';
import type { PixelCrop } from 'react-image-crop';

/* eslint-disable import/prefer-default-export */
export const validateImagePx = ({
  imageFile,
  minWidthPx = 50,
  minHeightPx = 50,
}: {
  imageFile: File;
  minWidthPx?: number;
  minHeightPx?: number;
}): Promise<boolean> =>
  new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(imageFile);
    img.src = objectUrl;

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      img.onload = null;
      img.onerror = null;
    };

    img.onload = () => {
      const { width, height } = img;
      cleanup();
      resolve(width >= minWidthPx && height >= minHeightPx);
    };

    img.onerror = () => {
      cleanup();
      resolve(false);
    };
  });

export async function getImageSizeInKB(imageUrl: string, precision = 1) {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    if (!response.ok) throw new Error('Network response was not ok');
    const size = response.headers.get('content-length');
    return size ? (parseInt(size, 10) / 1024).toFixed(precision) : 'Size unknown';
  } catch (error) {
    console.error('Error:', error);
    return 'Error fetching image size';
  }
}

export const getMimeTypeByUrl = (url: string) => {
  const extension = url.split('.').pop()?.toLowerCase();
  return `image/${extension}`;
};

/**
 * Scale image using Pica and return downloadable URL
 * @param imageUrl - URL of the image to scale
 * @param scaleSize - Scale factor (2 for 2x, 3 for 3x, etc.)
 * @returns Promise<string> - URL of the scaled image
 */
export const scaleWithPica = async (imageUrl: string, scaleSize: number): Promise<string> => {
  const pica = new Pica({
    features: ['js', 'wasm', 'ww'],
  });

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = async () => {
      try {
        // Create source canvas
        const from = document.createElement('canvas');
        from.width = img.width;
        from.height = img.height;
        const fromCtx = from.getContext('2d')!;
        fromCtx.drawImage(img, 0, 0);

        // Create destination canvas
        const to = document.createElement('canvas');
        to.width = img.width * scaleSize;
        to.height = img.height * scaleSize;

        // Resize with Pica
        await pica.resize(from, to, {
          quality: 3,
          unsharpAmount: 150,
          unsharpRadius: 0.6,
          unsharpThreshold: 2,
        });

        // Convert to blob URL for downloading
        const blob = await pica.toBlob(to, getMimeTypeByUrl(imageUrl), 0.9);
        const downloadUrl = URL.createObjectURL(blob);

        resolve(downloadUrl);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = imageUrl;
  });
};

/**
 * Converts a data URL to a File object
 * @param dataUrl - The data URL to convert
 * @param filename - The desired filename (default: 'image.png')
 * @param mimeType - The MIME type of the file (default: 'image/png')
 * @returns Promise<File> - A File object created from the data URL
 */
export const dataUrlToFile = async (dataUrl: string, filename = 'image.png', mimeType = 'image/png'): Promise<File> => {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
};

export type CroppedImage = {
  imageUrl: string;
  imageFile: Blob;
};

export const canvasPreview = async (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0,
): Promise<CroppedImage> => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * (Math.PI / 180);
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);

  ctx.restore();

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Canvas is empty');
        return;
      }
      resolve({ imageUrl: URL.createObjectURL(blob), imageFile: blob });
    }, 'image/png');
  });
};

export const generateImageData = async ({
  image,
  canvasEl,
  crop,
  scale = 1,
  rotate = 0,
}: {
  image: HTMLImageElement;
  crop: PixelCrop;
  canvasEl?: HTMLCanvasElement;
  scale?: number;
  rotate?: number;
}): Promise<CroppedImage> => {
  const canvas = canvasEl || document.createElement('canvas');

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * (Math.PI / 180);
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);

  ctx.restore();

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error('Canvas is empty');
        return;
      }
      resolve({ imageUrl: URL.createObjectURL(blob), imageFile: blob });
    }, 'image/png');
  });
};
