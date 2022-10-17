import React from 'react';
import { StyleSheet, View } from 'react-native';

type LineProps = {
  color: string;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    flex: 1,
  },
});

export const Line = ({ color }: LineProps) => {
  return <View style={[styles.container, { backgroundColor: color }]} />;
};
