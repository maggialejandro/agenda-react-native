import { StyleSheet } from 'react-native';
import { spacing } from '../../constants/spacing';
import { fontSize } from '../../constants/fontSize';

export const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.small,
    flexDirection: 'row',
  },
  circleContainer: {
    justifyContent: 'center',
    paddingRight: spacing.small,
  },
});

export const textStyles = StyleSheet.create({
  title: { fontSize: fontSize.body, marginBottom: spacing.small / 2 },
  subtitle: { fontSize: fontSize.caption1, color: 'gray' },
});
