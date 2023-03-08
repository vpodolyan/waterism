import { renderHook } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';
import { getStorageStatsKey } from './getStorageStatsKey';
import { useGetStatsByDate } from './useGetStatsByDate';

describe('useGetStatsByDate tests', () => {
  let storage = new MMKV();

  const date = new Date(2023, 3, 7);

  const statsObject = {
    [`${date.getMonth()}`]: {
      [`${date.getDate()}`]: {
        bottles: 10,
      },
    },
  };

  beforeAll(() => {
    storage = new MMKV();
    const yearKey = getStorageStatsKey(date);
    storage.set(yearKey, JSON.stringify(statsObject));
  });

  it('should return correct stats object for date', () => {
    const { result } = renderHook(() => useGetStatsByDate(date, storage));
    expect(result.current?.bottles).toBe(
      statsObject[date.getMonth()][date.getDate()].bottles
    );
  });
});
