import { STATS } from '../keys';

export function getStatsKey(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${STATS}.${year}.${month}.${day}`;
}
