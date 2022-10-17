import dayjs from 'dayjs';
import React, { forwardRef, Ref, useCallback } from 'react';
import { SectionList, Text, View } from 'react-native';
import { Event as Event, ExtendedMarkedDays } from 'src/types';
import { EventItem } from '../EventItem/EventItem';
import { Line } from '../Line/Line';
import { useMonthEvents } from './Events.hooks';

import { textStyles, viewStyles } from './Events.styles';

type EventsProps = {
  currentDay: Date;
  markedDays: ExtendedMarkedDays;
  onEventPress?: (event: Event) => void;
};

const keyExtractor = (item: Event, index: number) => `${item.name}-${index}`;

export const Events = forwardRef(
  (
    { currentDay, markedDays, onEventPress }: EventsProps,
    ref: Ref<SectionList>
  ) => {
    const sections = useMonthEvents(currentDay, markedDays);

    const renderEvent = useCallback(
      ({ item: event }) => {
        return <EventItem {...event} onPress={onEventPress} />;
      },
      [onEventPress]
    );

    const renderSectionFooter = useCallback(({ section }) => {
      if (section.data.length === 0) {
        return (
          <View style={viewStyles.sectionFooter}>
            <Text style={textStyles.sectionFooterFont}>
              There are not events this day
            </Text>
          </View>
        );
      }
      return null;
    }, []);

    return (
      <SectionList
        ref={ref}
        style={viewStyles.listContainer}
        sections={sections}
        renderItem={renderEvent}
        renderSectionHeader={({ section: { title, key } }) => (
          <View style={viewStyles.sectionHeader}>
            <Line color="lightgray" />
            <Text style={textStyles.sectionHeaderFont}>
              {dayjs(key).isSame(dayjs(), 'day') ? 'Today' : title}
            </Text>
            <Line color="lightgray" />
          </View>
        )}
        renderSectionFooter={renderSectionFooter}
        keyExtractor={keyExtractor}
      />
    );
  }
);
