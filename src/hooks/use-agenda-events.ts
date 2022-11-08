import dayjs from 'dayjs';
import { useMemo } from 'react';
import { AgendaProps, Event, ExtendedMarkedDays } from 'src/types';

export const useAgendaEvents = (
  currentMonth: Date,
  events: Event[],
  viewType: AgendaProps['viewType'],
  firstDayMonday: boolean
) => {
  return useMemo(() => {
    const markedDays: ExtendedMarkedDays = {};
    const rangeType =
      viewType === 'week' ? (firstDayMonday ? 'isoWeek' : 'week') : 'month';
    const firstDay = dayjs(currentMonth).startOf(rangeType).startOf('day');

    const endingDay = dayjs(currentMonth).endOf(rangeType).endOf('day');

    events.forEach((event) => {
      if (dayjs(event.endDate).isBefore(dayjs(event.startDate))) {
        throw new Error(`${event.name} startDate must be previous to endDate`);
      }

      if (dayjs(event.endDate).isBefore(firstDay)) {
        // previous month event
        return;
      }

      if (dayjs(event.startDate).isAfter(endingDay)) {
        // future month event
        return;
      }

      let currentDay = dayjs(event.startDate).isBefore(firstDay)
        ? firstDay
        : dayjs(event.startDate);

      const lastDay = dayjs(event.endDate).isBefore(endingDay)
        ? dayjs(event.endDate)
        : endingDay;

      while (currentDay.isSameOrBefore(lastDay, 'day')) {
        const dot = { color: event.color, selectedColor: event.color };
        const dayIndex = currentDay.format('YYYY-MM-DD');

        if (markedDays[dayIndex]) {
          markedDays[dayIndex].dots?.push(dot);
          markedDays[dayIndex].events.push(event);
        } else {
          markedDays[dayIndex] = {
            dots: [dot],
            events: [event],
          };
        }

        currentDay = currentDay.add(1, 'day');
      }
    });

    return { markedDays };
  }, [currentMonth, events, firstDayMonday, viewType]);
};
