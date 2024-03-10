import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Import useNavigate

const DisplayPage = () => {
  const [menuData, setMenuData] = useState({ imageUrl: '', uploadTime: '' })
  const [isLoading, setIsLoading] = useState(false) // Add a loading state
  const navigate = useNavigate() // Initialize navigate

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    setIsLoading(true) // Set loading to true before the request
    try {
      const response = await axios.get(
        'https://mess-menu-app.onrender.com/api/menu'
      )
      setMenuData(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false) // Set loading to false after the request
    }
  }

  // Function to get the current meal based on the time
  const getCurrentMeal = () => {
    const currentHour = new Date().getHours()
    if (currentHour < 12) {
      return 'Breakfast'
    } else if (currentHour < 17) {
      return 'Lunch'
    } else {
      return 'Dinner'
    }
  }

  return (
    <div>
      <div className="bg-gray-200 p-8">
        <h2 className="text-2xl font-bold mb-4">
          Today's {getCurrentMeal()} Photo
        </h2>
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
          {isLoading ? (
            <p>Loading menu...</p> // Display loading message
          ) : menuData.imageUrl ? (
            <>
              <img
                src={`data:image/jpeg;base64,${menuData.imageUrl}`}
                alt="Today's {getCurrentMeal()}"
              />
              <p>
                Uploaded at: {new Date(menuData.uploadTime).toLocaleString()}
              </p>
            </>
          ) : (
            <>
              <p>No {getCurrentMeal()} photo available for today.</p>
              <br />
              <button
                onClick={() => navigate('/upload')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Upload {getCurrentMeal()} Menu
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DisplayPage
