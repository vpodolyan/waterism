import { DayStats } from './DayStats';

export interface YearStats {
  [month: string]: {
    [day: string]: DayStats;
  };
}
