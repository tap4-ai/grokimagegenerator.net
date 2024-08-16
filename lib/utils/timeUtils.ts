import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

export function formatTime(time: number, format: string = 'HH:mm') {
  return dayjs(time).format(format);
}

export function generateFileName(fileType: string): string {
  const folder = dayjs().format('YYYY/M/D');

  const fileName = uuidv4();

  return `${folder}/${fileName}.${fileType}`;
}
