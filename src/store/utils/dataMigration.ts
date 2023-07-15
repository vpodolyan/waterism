import { MMKV } from 'react-native-mmkv';
import {
  CURRENT_FILTER_BOTTLES,
  CURRENT_FILTER_LIMIT,
  DATA_SCHEMA_VERSION,
  TOTAL_BOTTLES,
  TOTAL_FILTERS_USED
} from '../keys';

function toVersion1(storage: MMKV) {
  try {
    storage.set(CURRENT_FILTER_BOTTLES, storage.getNumber(TOTAL_BOTTLES) || 0);
    storage.set(CURRENT_FILTER_LIMIT, 300);
    storage.set(TOTAL_FILTERS_USED, 0);
    storage.set(DATA_SCHEMA_VERSION, '1');
  } catch (e) {
    console.error(`Data migration error: ${e}`);
  }
}

export function updateDataSchema(storageInstance?: MMKV) {
  const storage = storageInstance || new MMKV();
  const dataSchemaVersion = storage.getString(DATA_SCHEMA_VERSION);
  if (!dataSchemaVersion) {
    toVersion1(storage);
  }
}
