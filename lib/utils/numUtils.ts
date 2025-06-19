export function generateRandomNumber(min: number, max: number, filter?: number[]): number {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  while (filter && filter.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return randomNumber;
}

export function generateRandomNumbers({
  n,
  min,
  max,
  filter,
}: {
  n: number;
  min: number;
  max: number;
  filter?: number[];
}): number[] {
  const result: number[] = [];
  let filterList = filter;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < n; i++) {
    const randomNumber = generateRandomNumber(min, max, filterList);
    if (filterList) {
      filterList.push(randomNumber);
    } else {
      filterList = [randomNumber];
    }
    result.push(randomNumber);
  }
  return result;
}

export function subtractWithPrecision(a: number, b: number, precision: number = 10): number {
  const factor = 10 ** precision;
  const result = (Math.round(a * factor) - Math.round(b * factor)) / factor;
  return result;
}

export function findClosestResolution(resolution: string, list: { value: string }[]): string {
  const [width, height] = resolution.split('x').map(Number);

  if (Number.isNaN(width) || Number.isNaN(height) || width <= 0 || height <= 0) {
    throw new Error('Invalid resolution format');
  }

  const inputRatio = width / height;

  let closestDiff = Infinity;
  let closestValue = '';

  list.forEach((item) => {
    const [w, h] = item.value.split(':').map(Number);
    const ratio = w / h;
    const diff = Math.abs(ratio - inputRatio);

    if (diff < closestDiff) {
      closestDiff = diff;
      closestValue = item.value;
    }
  });

  return closestValue;
}

export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}
