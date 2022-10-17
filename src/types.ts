import { MarkedDays, MonthProps, ThemeType } from 'react-native-month';

export type Event = {
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
};

type ValueOf<T> = T[keyof T];

/**
 * @format 'YYYY-MM-DD'
 */
type MonthDayKey = string;

type MarkedDay = ValueOf<MarkedDays>;
export type ExtendedMarkedDay = MarkedDay & { events: Event[] };
export type ExtendedMarkedDays = Record<MonthDayKey, ExtendedMarkedDay>;

export { ThemeType as MonthThemeType };

interface AgendaMonthProps
  extends Pick<
    MonthProps,
    'firstDayMonday' | 'dayNames' | 'disableOffsetDays'
  > {}

export interface AgendaProps extends AgendaMonthProps {
  /**
   * selected day of the Agenda
   *
   * @format 'YYYY-MM-DD'
   * @type {string}
   * @memberof AgendaProps
   */
  selectedDay?: Date;
  events?: Event[];
  onDayPress?: (date: Date) => void;
  onEventPress?: (event: Event) => void;
  monthTheme?: ThemeType;
}
