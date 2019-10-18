import dayjs from 'dayjs';

// eslint-disable-next-line import/prefer-default-export
export function addMonths(date, months = 1) {
  return dayjs(date)
    .add(months, 'month')
    .format('YYYY-MM-DD');
}
