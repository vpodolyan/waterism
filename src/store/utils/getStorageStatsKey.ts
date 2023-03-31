import { STATS } from '../keys';

export function getStorageStatsKey(date: Date) {
  const year = date.getFullYear();
  return `${STATS}.${year}`;
}
