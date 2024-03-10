// server.js
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000
require('dotenv').config()
app.use(cors())
app.use(express.json())

// Set up MongoDB connection
// Replace <username>, <password>, and <clusterName> with your actual credentials
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Define the schema for your mess menu
const menuSchema = new mongoose.Schema({
  imageUrl: String,
  date: { type: Date, default: Date.now },
})

const Menu = mongoose.model('Menu', menuSchema)

// Set up multer for handling file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// API endpoint to upload a menu photo
app.post('/api/upload', upload.single('photo'), async (req, res) => {
  try {
    const newMenu = new Menu({
      imageUrl: req.file.buffer.toString('base64'),
    })

    await newMenu.save()
    // Delete all previous menu photos
    await Menu.deleteMany({ _id: { $ne: newMenu._id } })
    res.status(201).send('Menu photo uploaded successfully!')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})
// API endpoint to retrieve the latest dinner photo uploaded within the last 3 hours
app.get('/api/menu', async (req, res) => {
  try {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000) // Calculate the time 3 hours ago
    const menu = await Menu.findOne({ date: { $gte: threeHoursAgo } }).sort({
      date: 'desc',
    })

    // Delete any menu photos not uploaded within the last 3 hours
    await Menu.deleteMany({ date: { $lt: threeHoursAgo } })

    if (menu) {
      res.json({
        imageUrl: menu.imageUrl,
        uploadTime: menu.date, // Send the time the image was uploaded
      })
    } else {
      res.status(404).send('No menu photo found within the last 3 hours.')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
