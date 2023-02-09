import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Debounce from '@components/Debounce'
import Throttle from '@components/Throttle'
import { Link, Routes, Route } from 'react-router-dom'

export default function App(): JSX.Element {
  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Debounce, Throttle</h1>
      <div className="card">
        <div className='Menu'>
          <Link to="/">Debounce</Link>
          <Link to="/Throttle">Throttle</Link>
        </div>
        <Routes>
          <Route path="/" element={<Debounce />} />
          <Route path="Throttle" element={<Throttle />} />
        </Routes>
      </div>
    </div>
  )
}
