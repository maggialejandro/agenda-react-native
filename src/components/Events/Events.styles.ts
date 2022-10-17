import { StyleSheet } from 'react-native';
import { fontSize } from '../../constants/fontSize';
import { spacing } from '../../constants/spacing';

export const viewStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: spacing.small,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  sectionFooter: {
    flex: 1,
    padding: spacing.small,
  },
});

export const textStyles = StyleSheet.create({
  sectionFooterFont: {
    color: '#8ea0a4',
  },
  sectionHeaderFont: {
    color: '#6d95da',
    fontSize: fontSize.caption1,
    fontWeight: 'bold',
    marginHorizontal: spacing.small,
  },
});
