import dayjs from 'dayjs';
import { useMemo } from 'react';
import { SectionListData } from 'react-native';
import { Event, ExtendedMarkedDays } from 'src/types';

export const useMonthEvents = (
  currentDay: Date,
  markedDays?: ExtendedMarkedDays
) => {
  const monthDays = useMemo(
    () => new Array(dayjs(currentDay).daysInMonth()).fill(true),
    [currentDay]
  );

  const sections: SectionListData<Event>[] = useMemo(() => {
    return monthDays.map((_, index): SectionListData<Event> => {
      const day = dayjs(currentDay).date(index + 1);
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
  }, [currentDay, markedDays, monthDays]);

  return sections;
};
