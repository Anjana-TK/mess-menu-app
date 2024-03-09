import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DisplayPage = () => {
  const [menuImageUrl, setMenuImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Add a loading state

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    setIsLoading(true) // Set loading to true before the request
    try {
      const response = await axios.get(
        'https://mess-menu-app.onrender.com/api/menu'
      )
      setMenuImageUrl(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false) // Set loading to false after the request
    }
  }

  return (
    <div>
      <div className="bg-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-4">Today's Dinner Photo</h2>
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
          {isLoading ? (
            <p>Loading menu...</p> // Display loading message
          ) : menuImageUrl ? (
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
