import dayjs from 'dayjs';
import { useMemo } from 'react';
import { SectionListData } from 'react-native';
import { AgendaProps, Event, ExtendedMarkedDays } from 'src/types';

export const useMonthEvents = (
  currentDay: Date,
  firstDayMonday: boolean,
  markedDays?: ExtendedMarkedDays,
  viewType?: AgendaProps['viewType']
) => {
  const eventDaysCount =
    viewType === 'week' ? 7 : dayjs(currentDay).daysInMonth();
  const monthDays = useMemo(
    () => new Array(eventDaysCount).fill(true),
    [eventDaysCount]
  );

  const startWeekType = firstDayMonday ? 'isoWeek' : 'week';
  const weekStartDay = dayjs(currentDay).startOf(startWeekType);

  const sections: SectionListData<Event>[] = useMemo(() => {
    return monthDays.map((_, index): SectionListData<Event> => {
      const day =
        viewType === 'week'
          ? weekStartDay.add(index, 'day')
          : dayjs(currentDay).date(index + 1);
      const key = day.format('YYYY-MM-DD');
      let data: Event[] = [];

      if (markedDays && markedDays[key]) {
        data = markedDays[key].events;
      }

      return {
        key,
        data,
        title: day.format('ddd, MMM D'),
      };
    });
  }, [currentDay, markedDays, monthDays, viewType, weekStartDay]);

  return sections;
};
