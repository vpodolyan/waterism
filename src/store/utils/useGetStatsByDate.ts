import { MMKV, useMMKVObject } from 'react-native-mmkv';
import { YearStats } from '../../types/YearStats';
import { getStorageStatsKey } from './getStorageStatsKey';

export function useGetStatsByDate(date: Date, storageInstance?: MMKV) {
  const [yearStats] = useMMKVObject<YearStats>(
    getStorageStatsKey(date),
    storageInstance
  );

  return yearStats?.[date.getMonth()][date.getDate()];
}
