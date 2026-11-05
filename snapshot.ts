import { existsSync, readFileSync, writeFileSync } from "node:fs";

import type {
  TwitchDropsResponseType,
  TwitchRewardsResponseType,
} from "./types";

const API_URL = "https://drops.sunkwi.com/api/twitch";
const REQUEST_TIMEOUT_MS = 30_000;

const fetchAnswer = async <T>(route: string): Promise<T> => {
  const url = `${API_URL}${route}`;
  // Optional: a free key (drops.sunkwi.com/dashboard) lifts the anonymous
  // limit of 1 request every 5 minutes per route.
  const apiKey = process.env.DROPS_API_KEY;
  const response = await fetch(url, {
    headers: apiKey
      ? {
          "X-API-Key": apiKey,
        }
      : {},
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`GET ${url} answered ${response.status}`);
  }

  return (await response.json()) as T;
};

export const fetchDrops = (): Promise<TwitchDropsResponseType> =>
  fetchAnswer<TwitchDropsResponseType>("/drops");

export const fetchRewards = (): Promise<TwitchRewardsResponseType> =>
  fetchAnswer<TwitchRewardsResponseType>("/rewards");

const readSnapshot = (file: string): Record<string, unknown> | null => {
  if (!existsSync(file)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
};

/**
 * Writes the answer to `file` unless the list under `listKey` is the one
 * already there: `refreshedAt` and `rateLimit` change at every call, and a
 * file rewritten for them alone would make the workflow commit every run.
 * Returns whether the file was written.
 */
export const writeSnapshot = <T extends object>(
  file: string,
  answer: T,
  listKey: keyof T & string,
): boolean => {
  const previous = readSnapshot(file);

  if (JSON.stringify(previous?.[listKey]) === JSON.stringify(answer[listKey])) {
    return false;
  }

  writeFileSync(file, `${JSON.stringify(answer, null, 2)}\n`);

  return true;
};
