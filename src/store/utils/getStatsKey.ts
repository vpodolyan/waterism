import { STATS } from '../consts';

export function getStatsKey(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  return `${STATS}.${year}.${month}.${day}`;
}
