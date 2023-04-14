import { MMKV, useMMKVObject } from 'react-native-mmkv';
import { YearStats } from '../../types/YearStats';
import { getStorageStatsKey } from './getStorageStatsKey';

export function useYearStats(date: Date, storageInstance?: MMKV) {
  return useMMKVObject<YearStats>(getStorageStatsKey(date), storageInstance);
}
