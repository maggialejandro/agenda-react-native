import React, { useState } from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Agenda, Event, MonthThemeType } from 'react-native-agenda';

const MONTH_THEME: MonthThemeType = {
  activeDayContentStyle: {
    backgroundColor: '#1890FF',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDayTextStyle: {
    color: 'white',
  },
  dayContainerStyle: {
    marginVertical: 0,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  dayContentStyle: {
    width: 36,
    height: 36,
  },
  activeDayContainerStyle: {
    backgroundColor: 'transparent',
  },
};

const events: Event[] = [
  {
    name: 'Buy a gift',
    startDate: new Date(2022, 8, 12, 10, 30),
    endDate: new Date(2022, 8, 15, 10, 30),
    color: '#3722f6',
  },
  {
    name: 'Test Two',
    startDate: new Date(2022, 8, 14, 12, 40),
    endDate: new Date(2022, 8, 17, 12, 40),
    color: '#61d800',
  },
  {
    name: 'Test Three',
    startDate: new Date(2022, 8, 28, 11, 40),
    endDate: new Date(2022, 9, 10, 14, 40),
    color: '#dd0074',
  },
  {
    name: 'Study',
    startDate: new Date(2022, 7, 28, 14, 20),
    endDate: new Date(2022, 8, 3, 14, 20),
    color: '#fa8100',
  },
  {
    name: 'Random',
    startDate: new Date(2022, 8, 5, 14, 20),
    endDate: new Date(2022, 8, 5, 16, 20),
    color: '#b794f6',
  },
];

const App = () => {
  const [selectedDay, setSelectedDay] = useState(new Date(2022, 8, 1));
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView style={{ height }}>
      <Agenda
        events={events}
        selectedDay={selectedDay}
        onDayPress={setSelectedDay}
        monthTheme={MONTH_THEME}
      />
    </SafeAreaView>
  );
};

export default App;
