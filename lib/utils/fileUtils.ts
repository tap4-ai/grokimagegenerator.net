'use client';

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
