/* eslint-disable no-promise-executor-return */
/* eslint-disable no-await-in-loop */

import type { ResponseData } from '@/types/server';

export const wait = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time));
};

export const executeTasksInInterval = async <T extends ResponseData<{ status: string }>, P>({
  taskFunction,
  params,
  intervalTime = 1000,
  totalTimeLimit = 120_000,
  stopStatusList = ['success', 'failed'],
  waitStatusList = ['await'],
}: {
  taskFunction: (params: P) => Promise<T>;
  params: P;
  intervalTime?: number;
  totalTimeLimit?: number;
  stopStatusList?: string[];
  waitStatusList?: string[];
}): Promise<T> => {
  let lastExecutionTime = Date.now();
  const startTime = Date.now();
  let taskPromise: Promise<T> | null = null;

  while (Date.now() - startTime < totalTimeLimit) {
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastExecutionTime;

    if (!taskPromise || timeElapsed >= intervalTime) {
      if (taskPromise) {
        const result = await taskPromise;
        if (result?.code !== 200) {
          return result;
        }
        if (stopStatusList.includes(result?.data?.status)) {
          return result; // Stop execution and return the result
        }
        // If status is 'wait', we'll start a new task immediately
      }

      taskPromise = taskFunction(params);
      lastExecutionTime = Date.now();
    } else {
      // Wait 10ms before checking again
      await wait(intervalTime - 100);
    }
  }

  // If we've exceeded totalTimeLimit, wait for the last task to finish
  if (taskPromise) {
    const finalResult = await taskPromise;
    if (!waitStatusList.includes(finalResult?.data?.status)) {
      return finalResult;
    }
  }

  // If we've exceeded totalTimeLimit and last task status was 'wait'
  throw new Error('Execution time limit exceeded');
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const TIMEOUT = 2 * 60 * 1000;

export const fetchWithRetry = async (
  url: string,
  options?: RequestInit,
  times: { maxRetries?: number; delay?: number; timeOut?: number } = {
    maxRetries: MAX_RETRIES,
    delay: RETRY_DELAY,
    timeOut: TIMEOUT,
  },
): Promise<Response> => {
  const { maxRetries = MAX_RETRIES, delay = RETRY_DELAY, timeOut = TIMEOUT } = times;

  try {
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), timeOut);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timerId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out');
    }

    if (maxRetries > 0) {
      // console.log(`Retrying... (${MAX_RETRIES - maxRetries + 1}/${MAX_RETRIES})`);
      await wait(delay);
      return fetchWithRetry(url, options, { maxRetries: maxRetries - 1, delay });
    }
    throw error;
  }
};

type Result<T, E = Error> = [null, T] | [E, null];

/**
 * Try to execute a promise and return the result or an error
 * @param promise - The promise to execute
 * @returns A tuple containing the result or an error like: [error, response]
 */
export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    const res = await promise;
    return [null, res];
  } catch (error) {
    return [error as E, null];
  }
}
