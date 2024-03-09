import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DisplayPage from './components/DisplayPage'
import UploadPage from './components/UploadPage'

function App() {
  return (
    <div className="App">
      <h1 className="mb-4 text-2xl  text-gray-900 bg-blue dark:text-white md:text-5xl lg:text-6xl">
        Dinner Menu
      </h1>
      <Router>
        <Routes>
          <Route path="/" element={<DisplayPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
