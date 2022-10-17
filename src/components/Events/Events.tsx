import dayjs from 'dayjs';
import React, { forwardRef, Ref, useCallback } from 'react';
import { SectionList, SectionListProps, Text, View } from 'react-native';
import { Event as Event, ExtendedMarkedDays, ThemeType } from 'src/types';
import { EventItem } from '../EventItem/EventItem';
import { Line } from '../Line/Line';
import { useMonthEvents } from './Events.hooks';

import { textStyles, viewStyles } from './Events.styles';

type EventsProps = {
  currentDay: Date;
  markedDays: ExtendedMarkedDays;
  onEventPress?: (event: Event) => void;
  renderSectionHeader?: SectionListProps<Event>['renderSectionHeader'];
  theme?: ThemeType;
};

const keyExtractor = (item: Event, index: number) => `${item.name}-${index}`;

export const Events = forwardRef(
  (
    {
      currentDay,
      markedDays,
      onEventPress,
      renderSectionHeader,
      theme,
    }: EventsProps,
    ref: Ref<SectionList>
  ) => {
    const sections = useMonthEvents(currentDay, markedDays);

    const renderEvent = useCallback(
      ({ item: event }) => {
        return <EventItem {...event} onPress={onEventPress} />;
      },
      [onEventPress]
    );

    const renderSectionFooter = useCallback(
      ({ section }) => {
        if (section.data.length === 0) {
          return (
            <View
              style={[viewStyles.sectionFooter, theme?.sectionFooterContainer]}
            >
              <Text
                style={[textStyles.sectionFooterFont, theme?.sectionFooterFont]}
              >
                There are not events this day
              </Text>
            </View>
          );
        }
        return null;
      },
      [theme?.sectionFooterContainer, theme?.sectionFooterFont]
    );

    const defaultRenderSectionHeader = useCallback(
      ({ section: { title, key } }) => {
        return (
          <View
            style={[viewStyles.sectionHeader, theme?.sectionHeaderContainer]}
          >
            <Line color="lightgray" />
            <Text
              style={[textStyles.sectionHeaderFont, theme?.sectionHeaderFont]}
            >
              {dayjs(key).isSame(dayjs(), 'day') ? 'Today' : title}
            </Text>
            <Line color="lightgray" />
          </View>
        );
      },
      [theme?.sectionHeaderContainer, theme?.sectionHeaderFont]
    );

    return (
      <SectionList
        ref={ref}
        style={viewStyles.listContainer}
        sections={sections}
        renderItem={renderEvent}
        renderSectionHeader={renderSectionHeader ?? defaultRenderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        keyExtractor={keyExtractor}
      />
    );
  }
);
