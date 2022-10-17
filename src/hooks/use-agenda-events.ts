import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Event, ExtendedMarkedDays } from 'src/types';

export const useAgendaEvents = (currentMonth: Date, events: Event[]) => {
  return useMemo(() => {
    const markedDays: ExtendedMarkedDays = {};
    const monthStartingDay = dayjs(currentMonth)
      .startOf('month')
      .startOf('day');
    const monthEndingDay = dayjs(currentMonth).endOf('month').endOf('day');

    events.forEach((event) => {
      if (dayjs(event.endDate).isBefore(dayjs(event.startDate))) {
        throw new Error(`${event.name} startDate must be previous to endDate`);
      }

      if (dayjs(event.endDate).isBefore(monthStartingDay)) {
        // previous month event
        return;
      }

      if (dayjs(event.startDate).isAfter(monthEndingDay)) {
        // future month event
        return;
      }

      let currentDay = dayjs(event.startDate).isBefore(monthStartingDay)
        ? monthStartingDay
        : dayjs(event.startDate);

      const lastDay = dayjs(event.endDate).isBefore(monthEndingDay)
        ? dayjs(event.endDate)
        : monthEndingDay;

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
  }, [currentMonth, events]);
};

export const getMonthEvents = (currentMonth: Date, events: Event[]) => {
  return events.filter((event) => {
    if (dayjs(event.endDate).isBefore(dayjs(event.startDate))) {
      throw new Error(`${event.name} startDate must be previous to endDate`);
    }

    const monthStartingDay = dayjs(currentMonth)
      .startOf('month')
      .startOf('day');
    const monthEndingDay = dayjs(currentMonth).endOf('month').endOf('day');

    if (dayjs(event.startDate).isBetween(monthStartingDay, monthEndingDay)) {
      return true;
    }

    return dayjs(event.endDate).isBetween(monthStartingDay, monthEndingDay);
  });
};
