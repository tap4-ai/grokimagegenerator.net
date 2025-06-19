import imageCompression from 'browser-image-compression';

import { ResponseRows, SignedUrlType } from '@/types/server';

import { maxSizeMB } from '../constants';
import { fetchWithRetry } from './promiseUtils';

/* eslint-disable import/prefer-default-export */
/**
 * 下载文件
 * @param {String} path - 下载地址/下载请求地址。
 * @param {String} filename - 下载文件的名字（考虑到兼容性问题，最好加上后缀名）
 */
export function downloadFile(path: string, filename: string) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', path, true);
  xhr.responseType = 'blob'; // 直接获取Blob数据

  xhr.onload = function () {
    if (xhr.status === 200 || xhr.status === 304) {
      const blob = xhr.response;
      const downloadUrl = URL.createObjectURL(blob); // 从Blob创建一个URL
      console.log(`fileurl:${downloadUrl}`);

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename; // 设置文件名
      document.body.appendChild(a);
      a.click(); // 模拟点击实现下载

      // 清理资源
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl); // 释放URL对象占用的资源
    }
  };

  xhr.send();
}

export async function getImageFileByUrl(url: string): Promise<File> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }

  const blob = await response.blob();

  // Extract the filename from the URL
  const urlParts = url.split('/');
  const filename = urlParts[urlParts.length - 1];

  // Determine the image type based on the file extension
  const extension = filename.split('.').pop()?.toLowerCase();
  let mimeType = 'image/png'; // Default to PNG if the extension is not recognized

  if (extension === 'jpg' || extension === 'jpeg') {
    mimeType = 'image/jpeg';
  } else if (extension === 'gif') {
    mimeType = 'image/gif';
  } else if (extension === 'bmp') {
    mimeType = 'image/bmp';
  } else if (extension === 'webp') {
    mimeType = 'image/webp';
  }

  // Create the file with the correct image MIME type
  const file = new File([blob], filename, { type: mimeType });

  return file;
}

export async function getFileByUrl(url: string): Promise<File> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch file');
  }

  const blob = await response.blob();

  // Extract the filename from the URL
  const urlParts = url.split('/');
  const filename = urlParts[urlParts.length - 1];

  // Determine the file type based on the file extension
  const extension = filename.split('.').pop()?.toLowerCase();
  let mimeType = '';

  if (extension === 'jpg' || extension === 'jpeg') {
    mimeType = 'image/jpeg';
  } else if (extension === 'png') {
    mimeType = 'image/png';
  } else if (extension === 'gif') {
    mimeType = 'image/gif';
  } else if (extension === 'bmp') {
    mimeType = 'image/bmp';
  } else if (extension === 'webp') {
    mimeType = 'image/webp';
  } else if (extension === 'mp4') {
    mimeType = 'video/mp4';
  } else if (extension === 'webm') {
    mimeType = 'video/webm';
  } else if (extension === 'ogg') {
    mimeType = 'video/ogg';
  } else if (extension === 'mov') {
    mimeType = 'video/quicktime';
  } else {
    throw new Error('Unsupported file type');
  }

  // Create the file with the correct MIME type
  const file = new File([blob], filename, { type: mimeType });

  return file;
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export async function compressMultiImages(files: File[], maxSizeMB = 10): Promise<File[]> {
  const compressOptions = {
    maxSizeMB,
    useWebWorker: true,
  };

  const compressedFiles = await Promise.all(
    files.map(async (file) => {
      if (file instanceof File && file.type.startsWith('image/')) {
        try {
          if (file.size < maxSizeMB * 1024 * 1024) {
            return file;
          }
          const blobTemp = await imageCompression(file, compressOptions);
          return new File([blobTemp], file.name, { type: file.type });
        } catch (error) {
          console.warn('Image compression failed, using original file:', error);
          return file;
        }
      }
      return file;
    }),
  );

  return compressedFiles;
}

export type FileType = {
  data: File | null;
  type: string;
};

/**
 * 上传文件到存储
 * @deprecated change to useUploadFiles
 * @param {FileType[]} files - 文件列表
 * @returns {Promise<string[]>} - 文件URL列表
 */
export const uploadFilesToStorage = async (files: FileType[]): Promise<string[]> => {
  if (files.length === 0) {
    return [];
  }

  // Get signed URLs
  const signedUrlResult = await fetchWithRetry('/api/file-signed-url', {
    method: 'POST',
    headers: {
      credentials: 'include',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mineType: files.map((file) => file.type),
    }),
  });

  if (!signedUrlResult.ok) {
    if (signedUrlResult.status === 401) {
      throw new Error('401');
    }
    throw new Error('Failed to get signed URLs');
  }

  const signedUrlJson = (await signedUrlResult.json()) as ResponseRows<SignedUrlType[]>;
  const { rows } = signedUrlJson;

  // Upload files
  const storeResults = await Promise.all(
    rows.map((obj, index) => {
      const file = files[index];
      return fetchWithRetry(obj.signedUrl, {
        method: 'PUT',
        body: file.data,
        headers: {
          'Content-Type': file.type,
        },
      });
    }),
  );

  // Generate final URLs
  return storeResults.map(
    (item) =>
      `https://${process.env.NEXT_PUBLIC_R2_IMAGE_DOMAIN}${item.url.split('r2.cloudflarestorage.com')[1].split('?')[0]}`,
  );
};

export async function shouldCompressImageFileList(fileList: FileType[], xMB: number = maxSizeMB): Promise<FileType[]> {
  const maxSizeInBytes = xMB * 1024 * 1024;

  if (fileList.every((file) => file.data?.size && file.data.size <= maxSizeInBytes)) {
    return fileList;
  }

  const compressedFilesPromises = fileList.map((file) => {
    if (file.data && file.data.size > maxSizeInBytes) {
      return imageCompression(file.data, { maxSizeMB: xMB, useWebWorker: true }).then(
        (compressedData) =>
          ({
            ...file,
            data: compressedData,
          }) satisfies FileType,
      );
    }
    return Promise.resolve(file);
  });

  const compressedFiles = await Promise.all(compressedFilesPromises);

  return compressedFiles;
}
