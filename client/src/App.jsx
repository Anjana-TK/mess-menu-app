import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import DisplayPage from './components/DisplayPage'
import UploadPage from './components/UploadPage'
import { Navbar, Typography } from '@material-tailwind/react'

function App() {
  return (
    <div className="App">
      <Navbar className="px-6 py-3 bg-blue-100">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
          >
            Mess Menu
          </Typography>
        </div>
      </Navbar>
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
