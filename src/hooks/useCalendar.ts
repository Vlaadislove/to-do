import React from 'react';

import { createDate } from '../utils/createDate';
import { createMonth } from '../utils/createMonth';
import { getMonthNumberOfDays } from '../utils/getMonthNumberOfDays';
import { getMonthesNames } from '../utils/getMonthesNames';
import { getWeekDaysNames } from '../utils/getWeekDaysNames';

interface UseCalendarParams {
  selectedDate: Date;
  firstWeekDayNumber?: number;
}

const DAYS_IN_WEEK = 7;

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10;
  return [...Array(10)].map((_, index) => startYear + index);
};

export const useCalendar = ({
  selectedDate: date,
  firstWeekDayNumber = 2
}: UseCalendarParams) => {
  const [mode, setMode] = React.useState<'days' | 'monthes' | 'years'>('days');
  const [selectedDay, setSelectedDay] = React.useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = React.useState(createMonth({ date: new Date(selectedDay.year, selectedDay.monthIndex) }));
  const [selectedYear, setSelectedYear] = React.useState(selectedDay.year);
  const [selectedYearsInterval, setSelectedYearsInterval] = React.useState(getYearsInterval(selectedDay.year));

  const monthesNames = React.useMemo(() => getMonthesNames(), []);

  const weekDaysNames = React.useMemo(() => getWeekDaysNames(firstWeekDayNumber), []);

  const days = React.useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);
console.log('days',days)
  const calendarDays = React.useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
    }).createMonthDays();


    const firstDay = days[0];

    const lastDay = days[monthNumberOfDays - 1];

    const shiftIndex = firstWeekDayNumber - 1;

    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
        ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
        : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;
    console.log( DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex))
    const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
      result[i] = days[i - numberOfPrevDays];
    }

    for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }

    return result;
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  const onClickArrow = (direction: 'right' | 'left') => {
    if (mode === 'years' && direction === 'left') {
      return setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] - 10));
    }

    if (mode === 'years' && direction === 'right') {
      return setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] + 10));
    }

    if (mode === 'monthes' && direction === 'left') {
      const year = selectedYear - 1;
      if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear - 1);
    }

    if (mode === 'monthes' && direction === 'right') {
      const year = selectedYear + 1;
      if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
      return setSelectedYear(selectedYear + 1);
    }

    if (mode === 'days') {
      const monthIndex =
        direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;
      if (monthIndex === -1) {
        const year = selectedYear - 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
        return setSelectedMonth(createMonth({ date: new Date(selectedYear - 1, 11) }));
      }

      if (monthIndex === 12) {
        const year = selectedYear + 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));
        return setSelectedMonth(createMonth({ date: new Date(year, 0) }));
      }

      setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex) }));
    }
  };

  const setSelectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex) }));
  };

  return {
    state: {
      mode,
      calendarDays,
      weekDaysNames,
      monthesNames,
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearsInterval
    },
    functions: {
      onClickArrow,
      setMode,
      setSelectedDay,
      setSelectedMonthByIndex,
      setSelectedYear,
      setSelectedYearsInterval
    }
  };
};