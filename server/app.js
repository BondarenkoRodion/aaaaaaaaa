import cors from 'cors'
import express, { Router } from 'express'
import './src/config.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './src/middlewares/errorHandler.js'
import { connectToDatabase } from './src/database.js'
import authRoutes from './src/routes/auth.js'
import videoRoutes from './src/routes/videos.js'
import userRoutes from './src/routes/users.js'
//import testRouter from './src/routes/test.js'
import http from 'http'
import { initializeSocket } from './sockets/ws.js'
//import Test1 from './src/models/Test1.js'

import VideoModel from './src/models/Video.js'


// Create an instance of the Express app
const app = express()
// Create an HTTP server using the Express app
const server = http.createServer(app)
// Initialize WebSocket with the created server
initializeSocket(server)


// Middleware setup
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(errorHandler)

// Set up routes for different parts of the API
app.use('/api/auth', authRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/users', userRoutes)

// app.use('/api/test', testRouter)

//-------------------

const router = Router();

router.get('/api/test/videos', async (req, res) => {
  const videos = await VideoModel.find()
  res.json(videos)
})

// router.get('/api/test/videos/:id', async (req, res) => {
//   const video = await VideoModel.findOne({ _id: req.params.id})
//   res.json(video)
// })

router.get('/api/test/videos/:id', async (req, res) => {
  const video = await VideoModel.findOne({ _id: req.params.id})
  let l = video.likedUsers.length
  video.likedUsers[l] = l
  video.save() 
  res.json(video)
})

// router.get('/api/test/videos/:id/addlikes', async (req, res) => {
//   const video = await Video.findOne({ _id: req.params.id})
//   res.json(video)
// })

app.use(router);

//---------------------

// Start the server and listen on port 3000
server.listen(3000, () => {
  connectToDatabase();
  console.log('Connected to server!');
})

// let t = new Test1({test:5});

// t.save();

// let t1 = await Test1.find();

// console.log(t1.test);