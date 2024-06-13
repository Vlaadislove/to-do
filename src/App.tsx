import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createDate } from './utils/createDate'
import { createMonth } from './utils/createMonth'
import { createYear } from './utils/createYear'


function App() {
  console.log(createYear().createYearMonthes())
  return (
    <>

    </>
  )
}

export default App
