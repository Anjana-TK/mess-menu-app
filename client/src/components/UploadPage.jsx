// UploadPage.js
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('photo', selectedFile)

      await axios.post(
        'https://mess-menu-app.onrender.com/api/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      // Show upload success alert
      alert('Upload success!')

      // Navigate back to the display page after successful upload
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Menu Photo</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
    </div>
  )
}

export default UploadPage
