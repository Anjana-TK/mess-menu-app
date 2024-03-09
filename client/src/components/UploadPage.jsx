// UploadPage.js
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const navigate = useNavigate() // Use useNavigate instead of useHistory

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('photo', selectedFile)

      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // Show upload success alert
      alert('Upload success!')

      // Navigate back to the display page after successful upload
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Upload Menu Photo</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default UploadPage
