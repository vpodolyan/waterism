import { STATS } from '../keys';
import { getStorageStatsKey } from './getStorageStatsKey';

describe('getStorageStatsKeys', () => {
  it('should return correct key for the date', () => {
    const date = new Date(2023, 1, 20);
    const key = getStorageStatsKey(date);
    expect(key).toBe(`${STATS}.${date.getFullYear()}`);
  });
});
