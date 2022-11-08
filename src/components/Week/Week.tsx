import React from 'react';
import { View } from 'react-native';
import {
  LocaleType,
  WeekDays,
  Day,
  getDayNames,
  MarkedDays,
} from 'react-native-month';
import { MonthThemeType } from 'src/types';
import { useWeekDays } from './Week.hooks';

import { viewStyles } from './Week.styles';

type WeekProps = {
  selectedDate: Date;
  monthTheme?: MonthThemeType;
  locale: LocaleType;
  firstDayMonday: boolean;
  markedDays?: MarkedDays;
  onPress: (date: Date) => void;
};

export const Week = ({
  selectedDate,
  monthTheme = {},
  locale,
  firstDayMonday,
  markedDays = {},
  onPress,
}: WeekProps) => {
  const weekDayNames = getDayNames(locale, firstDayMonday);
  const days = useWeekDays(selectedDate, firstDayMonday);

  return (
    <View>
      <WeekDays days={weekDayNames} theme={monthTheme} />
      <View style={viewStyles.weekContainer}>
        {days.map((day) => (
          <Day
            key={day.key}
            item={day}
            dots={markedDays[day.id]?.dots}
            dayTheme={markedDays[day.id]?.theme}
            onPress={onPress}
            theme={monthTheme}
          />
        ))}
      </View>
    </View>
  );
};
