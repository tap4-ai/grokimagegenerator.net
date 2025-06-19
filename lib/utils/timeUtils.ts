import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { nanoid } from 'nanoid';

dayjs.extend(duration);

export function formatTime(time: number, format: string = 'HH:mm') {
  return dayjs(time).format(format);
}

export function formatDate(time: number, format: string = 'YYYY-MM-DD') {
  return dayjs(time).format(format);
}

export function generateFileName(fileType: string): string {
  const folder = dayjs().format('YYYY/M/D');

  const fileName = nanoid();

  return `${folder}/${fileName}.${fileType}`;
}

export function formatDuration(seconds: number): string {
  const timeDuration = dayjs.duration(seconds, 'seconds');
  const hours = String(timeDuration.hours()).padStart(2, '0');
  const minutes = String(timeDuration.minutes()).padStart(2, '0');
  const secs = String(timeDuration.seconds()).padStart(2, '0');

  return `${hours}:${minutes}:${secs}`;
}

export function isToday(time: number): boolean {
  if (time === 0) return false;
  return dayjs(time).isSame(dayjs(), 'day');
}

export function generateSimpleId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomPart}`;
}
