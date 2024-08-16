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
