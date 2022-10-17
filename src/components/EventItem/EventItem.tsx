import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Event } from 'src/types';
import { Circle } from '../Circle/Circle';

import { viewStyles, textStyles } from './EventItem.styles';

type EventItemProps = {
  onPress?: (event: Event) => void;
} & Event;

export const EventItem = ({ onPress, ...rest }: EventItemProps) => {
  const onEventPress = useCallback(() => onPress?.(rest), [onPress, rest]);
  const { name, startDate, endDate } = rest;

  const date = `${dayjs(startDate).format('HH:mm')} to ${dayjs(endDate).format(
    'HH:mm'
  )}`;

  return (
    <TouchableOpacity style={viewStyles.container} onPress={onEventPress}>
      <View style={viewStyles.circleContainer}>
        <Circle size={15} color={rest.color} />
      </View>
      <View>
        <Text style={textStyles.title}>{name}</Text>
        <Text style={textStyles.subtitle}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};
