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

// API endpoint to retrieve today's dinner photo
app.get('/api/menu', async (req, res) => {
  try {
    const today = new Date().setHours(0, 0, 0, 0)
    const menu = await Menu.findOne({ date: { $gte: today } }).sort({
      date: 'desc',
    })

    if (menu) {
      res.send(menu.imageUrl)
    } else {
      res.status(404).send('No menu photo found for today.')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
