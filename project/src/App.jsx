import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Monetization from './components/monetization/Monetization'
import HelloWorld from './components/HelloWorld'
import About from './components/About'
import Calculator from './components/Calculator'
import Navigation from './components/Navigation'
import { getRouterBasename } from './utils/routerUtils'

function App() {

  return (
    <Monetization>
      <Router basename={getRouterBasename()}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HelloWorld />} />
          <Route path="/about" element={<About />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </Router>
    </Monetization>
  )
}

export default App