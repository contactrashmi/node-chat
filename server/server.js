const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
//var io = require('socket.io').listen();

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected');

   /*socket.emit('newEmail', {
     from: 'ra00119758@gmail.com',
     createdAt: 123,
     text: 'Hey!! What is going on.'
   })*/

   socket.emit('newMessage', {
     from: 'server@example.com',
     createdAt: 123,
     text: 'New message created by server'
   })

   /*socket.on('createEmail', (newEmail) => {
      console.log('New Email', newEmail);
   })*/

   socket.on('createMessage', (createMessage) => {
     console.log('Message created by client:', createMessage);
   })

  socket.on('disconnect', () => {
    console.log('User was disconneted');
  })
})

server.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
})
