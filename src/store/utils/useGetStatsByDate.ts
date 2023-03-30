import { useCallback } from 'react';
import { MMKV, useMMKVObject } from 'react-native-mmkv';
import { DayStats } from '../../types/DayStats';
import { YearStats } from '../../types/YearStats';
import { getStorageStatsKey } from './getStorageStatsKey';

export function useGetStatsByDate(
  date: Date,
  storageInstance?: MMKV
): [DayStats | undefined, (value: DayStats) => void] {
  const [yearStats, setYearStats] = useMMKVObject<YearStats>(
    getStorageStatsKey(date),
    storageInstance
  );

  const dayStats = getDayStats(yearStats, date);

  const updateStats = useCallback(
    (value: DayStats) => {
      const nextState = { ...yearStats };
      nextState[date.getMonth()][date.getDate()] = { ...dayStats, ...value };

      setYearStats(nextState);
    },
    [date, dayStats, setYearStats, yearStats]
  );

  return [dayStats, updateStats];
}

function getDayStats(yearStats: YearStats | undefined, date: Date) {
  if (!yearStats) {
    const emptyStats: DayStats = { bottles: 0 };
    return emptyStats;
  }

  return yearStats?.[date.getMonth()][date.getDate()];
}
