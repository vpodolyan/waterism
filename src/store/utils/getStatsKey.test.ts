import { STATS } from '../consts';
import { getStatsKey } from './getStatsKey';

it('should return correct key for the date', () => {
  const date = new Date(2023, 1, 20);
  const key = getStatsKey(date);
  expect(key).toBe(`${STATS}.2023.1.19`);
});
