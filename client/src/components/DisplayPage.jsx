// DisplayPage.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DisplayPage = () => {
  const [menuImageUrl, setMenuImageUrl] = useState('')

  useEffect(() => {
    // Fetch today's dinner photo on component mount
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/menu')
      setMenuImageUrl(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className="bg-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-4">Today's Dinner Photo</h2>
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
          {menuImageUrl ? (
            <img
              src={`data:image/jpeg;base64,${menuImageUrl}`}
              alt="Today's Dinner"
            />
          ) : (
            <p>No menu photo available for today.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default DisplayPage