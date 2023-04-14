import { DayStats } from './DayStats';

export interface YearStats {
  [month: number]: {
    [day: number]: DayStats;
  };
}
