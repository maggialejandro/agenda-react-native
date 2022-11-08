import dayjs from 'dayjs';
import { DayType } from 'react-native-month/lib/typescript/src/types';

export const useWeekDays = (
  selectedDate: Date,
  firstDayMonday: boolean
): DayType[] => {
  const days: DayType[] = [];

  const startWeekType = firstDayMonday ? 'isoWeek' : 'week';
  const startOfWeek = dayjs(selectedDate).startOf(startWeekType);

  for (let index = 0; index < 7; index++) {
    const currentDay = startOfWeek.add(index, 'day');
    const dow = currentDay.day();
    const isActive = currentDay.isSame(selectedDate);

    days.push({
      key: currentDay.format('YYYY-MM-DD'),
      id: currentDay.format('YYYY-MM-DD'),
      date: currentDay.toDate(),
      isToday: currentDay.isSame(dayjs()),
      isWeekend: dow === 6 || dow === 0,
      isMonthDate: true,
      isActive,
      isStartDate: isActive,
      isEndDate: isActive,
      isOutOfRange: false,
      isVisible: true,
      isHidden: false,
    });
  }

  return days;
};
