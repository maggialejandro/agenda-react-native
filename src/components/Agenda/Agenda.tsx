import React, { useCallback, useMemo, useRef } from 'react';
import { SectionList, View } from 'react-native';
import { Month } from 'react-native-month';
import { useAgendaEvents } from '../../hooks/use-agenda-events';
import { AgendaProps } from 'src/types';
import { Events } from '../Events/Events';

import { viewStyles } from './Agenda.styles';
import dayjs from 'dayjs';

export const Agenda = ({
  selectedDay,
  events,
  onDayPress,
  theme,
  monthTheme,
  renderSectionHeader,
}: AgendaProps) => {
  const sectionListRef = useRef<SectionList>(null);
  const currentDay = useMemo(() => selectedDay ?? new Date(), [selectedDay]);

  const onDayPressCallback = useCallback(
    (date: Date) => {
      onDayPress?.(date);
      const dayIndex = dayjs(date).date() - 1;

      sectionListRef.current?.scrollToLocation({
        sectionIndex: dayIndex,
        itemIndex: 1,
        viewPosition: 0,
      });
    },
    [onDayPress]
  );

  const { markedDays } = useAgendaEvents(currentDay, events ?? []);

  return (
    <View style={[viewStyles.container, theme?.container]}>
      <View style={[viewStyles.monthContainer, theme?.monthContainer]}>
        <Month
          month={currentDay.getMonth()}
          year={currentDay.getFullYear()}
          startDate={currentDay}
          onPress={onDayPressCallback}
          markedDays={markedDays}
          showWeekdays
          locale="en"
          firstDayMonday
          theme={monthTheme}
        />
      </View>
      <Events
        currentDay={currentDay}
        markedDays={markedDays}
        ref={sectionListRef}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};
