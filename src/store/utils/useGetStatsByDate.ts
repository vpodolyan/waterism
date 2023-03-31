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
      let nextState: YearStats;

      if (!yearStats) {
        nextState = {
          [date.getMonth()]: {
            [date.getDate()]: { bottles: 0 },
          },
        };
      } else {
        nextState = { ...yearStats };
      }

      if (!nextState[date.getMonth()]) {
        nextState[date.getMonth()] = {
          [date.getDate()]: { ...value },
        };
      } else {
        nextState[date.getMonth()][date.getDate()] = { ...dayStats, ...value };
      }

      setYearStats(nextState);
    },
    [date, dayStats, setYearStats, yearStats]
  );

  return [dayStats, updateStats];
}

function getDayStats(yearStats: YearStats | undefined, date: Date) {
  return yearStats?.[date.getMonth()]?.[date.getDate()];
}
