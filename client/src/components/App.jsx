import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Affirmations from './Affirmations'
import New_affirmation from './New_affirmation'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/affirmations' element={<Affirmations />} />
        <Route path='/new_affirmation' element={<New_affirmation />} />
      </Routes>
    </Router>
  )
}

export default App