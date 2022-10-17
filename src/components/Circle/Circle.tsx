import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

type CircleProps = {
  color: string;
  size: number;
};

export const Circle = ({ color, size }: CircleProps) => {
  const styles = useMemo(
    (): ViewStyle => ({
      backgroundColor: color,
      height: size,
      width: size,
      borderRadius: size / 2,
    }),
    [color, size]
  );

  return <View style={styles} />;
};
