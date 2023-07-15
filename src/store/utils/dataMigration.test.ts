import { MMKV } from 'react-native-mmkv';
import { CURRENT_FILTER_BOTTLES, DATA_SCHEMA_VERSION, TOTAL_BOTTLES } from '../keys';
import { updateDataSchema } from './dataMigration';

describe('Data migration tests', () => {
  const storage = new MMKV();

  it('should initialize filter values correctly for v1', () => {
    const targetBottlesValue = 100;

    storage.delete(DATA_SCHEMA_VERSION);
    storage.set(TOTAL_BOTTLES, targetBottlesValue);

    updateDataSchema(storage);

    expect(storage.getNumber(CURRENT_FILTER_BOTTLES)).toBe(targetBottlesValue);
    expect(storage.getString(DATA_SCHEMA_VERSION)).toBe('1');
  });
});
