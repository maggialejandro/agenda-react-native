import { SectionListProps, TextStyle, ViewStyle } from 'react-native';
import {
  MarkedDays,
  MonthProps,
  ThemeType as MonthThemeType,
} from 'react-native-month';

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

interface EventsThemeType {
  sectionHeaderContainer?: ViewStyle;
  sectionHeaderFont?: TextStyle;
  sectionFooterContainer?: ViewStyle;
  sectionFooterFont?: TextStyle;
}

interface EventThemeType {}

export interface ThemeType extends EventThemeType, EventsThemeType {
  container?: ViewStyle;
  monthContainer?: ViewStyle;
}

export { MonthThemeType };

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
  monthTheme?: MonthThemeType;
  theme?: ThemeType;
  renderSectionHeader?: SectionListProps<Event>['renderSectionHeader'];
}
