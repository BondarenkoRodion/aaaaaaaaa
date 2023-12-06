import { Server } from 'socket.io'

// Function to initialize WebSocket with the provided server
export const initializeSocket = (server) => {
  // Create a new instance of the Server class with specified options
  const io = new Server(server, {
    cors: {
      // Allow connections from the specified frontend address
      origin: 'http://localhost:5173',
    },
  })

  // Event handler for when a client connects to the WebSocket server
  io.on('connection', (socket) => {
    console.log('User is connected')

    // Event handler for the 'addVideo' event received from a client
    socket.on('addVideo', (videoData) => {
      // Broadcast the 'newVideo' event to all connected clients with the received video data
      io.emit('newVideo', videoData)
    })

    // Event handler for the 'deleteVideo' event received from a client
    socket.on('deleteVideo', (videoData) => {
      // Broadcast the 'videoDeleted' event to all connected clients with the received video data
      io.emit('videoDeleted', videoData)
    })

    // Event handler for when a client disconnects from the WebSocket server
    socket.on('disconnect', () => {
      console.log('User is disconnected')
    })
  })
}