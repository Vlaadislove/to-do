import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createDate } from './utils/createDate'
import { createMonth } from './utils/createMonth'
import { createYear } from './utils/createYear'
import { getMonthesNames } from './utils/getMonthesNames'
import { getWeekDaysNames } from './utils/getWeekDaysNames'
import { Calendar } from './components/Calendar/Calendar'


function App() {
  const [selectedDate, setSelectedDay] = React.useState(new Date());
  console.log('createDate', createDate())
  return (
    <>
      <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} />
    </>
  )
}

export default App
