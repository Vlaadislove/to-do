import React from 'react'
import { useCalendar } from '../../hooks/useCalendar';

interface CalendarProps {
    selectedDate: Date;
    selectDate: (date: Date) => void;
    firstWeekDayNumber?: number;
}



export const Calendar: React.FC<CalendarProps> = ({ selectedDate: date, selectDate, firstWeekDayNumber = 2 }) => {
    //@ts-ignore
    const { functions, state } = useCalendar({
        selectedDate: date,
        firstWeekDayNumber
    });

    // console.log('functions', functions)
    // console.log('state', state)

    return (

        <>

        </>
    )
}
