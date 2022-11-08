import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isoWeek);

export * from './components/Agenda/Agenda';
export * from './types';
