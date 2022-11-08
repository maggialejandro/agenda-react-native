import React, { useCallback, useMemo, useRef } from 'react';
import { SectionList, View } from 'react-native';
import { Month } from 'react-native-month';
import { useAgendaEvents } from '../../hooks/use-agenda-events';
import { AgendaProps } from 'src/types';
import { Events } from '../Events/Events';

import { viewStyles } from './Agenda.styles';
import dayjs from 'dayjs';
import { Week } from '../Week/Week';

export const Agenda = ({
  selectedDay,
  events,
  onDayPress,
  theme,
  monthTheme,
  renderSectionHeader,
  locale = 'en',
  firstDayMonday = false,
  viewType = 'month',
}: AgendaProps) => {
  const sectionListRef = useRef<SectionList>(null);
  const currentDay = useMemo(() => selectedDay ?? new Date(), [selectedDay]);

  const onDayPressCallback = useCallback(
    (date: Date) => {
      onDayPress?.(date);

      const dayIndex =
        viewType === 'week'
          ? firstDayMonday
            ? dayjs(date).isoWeekday() - 1
            : date.getDay()
          : dayjs(date).date() - 1;

      sectionListRef.current?.scrollToLocation({
        sectionIndex: dayIndex,
        itemIndex: 1,
        viewPosition: 0,
      });
    },
    [firstDayMonday, onDayPress, viewType]
  );

  const { markedDays } = useAgendaEvents(
    currentDay,
    events ?? [],
    viewType,
    firstDayMonday
  );

  return (
    <View style={[viewStyles.container, theme?.container]}>
      {viewType === 'month' && (
        <View style={[viewStyles.monthContainer, theme?.monthContainer]}>
          <Month
            month={currentDay.getMonth()}
            year={currentDay.getFullYear()}
            startDate={currentDay}
            onPress={onDayPressCallback}
            markedDays={markedDays}
            showWeekdays
            locale={locale}
            firstDayMonday={firstDayMonday}
            theme={monthTheme}
          />
        </View>
      )}
      {viewType === 'week' && (
        <Week
          selectedDate={currentDay}
          monthTheme={monthTheme}
          firstDayMonday={firstDayMonday}
          locale={locale}
          markedDays={markedDays}
          onPress={onDayPressCallback}
        />
      )}
      <Events
        currentDay={currentDay}
        markedDays={markedDays}
        ref={sectionListRef}
        renderSectionHeader={renderSectionHeader}
        viewType={viewType}
        firstDayMonday={firstDayMonday}
      />
    </View>
  );
};
