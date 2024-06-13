import { getWeekNumber } from './getWeekNumber';

interface CreateDateParams {
  date?: Date;
}

export const createDate = (params?: CreateDateParams) => {

  const d = params?.date ?? new Date();
  const dayNumber = d.getDate();
  const day = d.toLocaleDateString('default', { weekday: 'long' });
  const dayNumberInWeek = d.getDay() + 1;
  const dayShort = d.toLocaleDateString('default', { weekday: 'short' });
  const year = d.getFullYear();
  const yearShort = d.toLocaleDateString('default', { year: '2-digit' });
  const month = d.toLocaleDateString('default', { month: 'long' });
  const monthShort = d.toLocaleDateString('default', { month: 'short' });
  const monthNumber = d.getMonth() + 1;
  const monthIndex = d.getMonth();
  const timestamp = d.getTime();
  const week = getWeekNumber(d);

  return {
    date: d,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week
  };
};