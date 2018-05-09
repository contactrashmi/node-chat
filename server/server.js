const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
//var io = require('socket.io').listen();

const {generateMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected');

   //emits events to single connection
   socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app.'))



   socket.on('createMessage', (createMessage, callback) => {
     console.log('Message created by client:', createMessage);

     //emits message to every user that is connected
     io.emit('newMessage', generateMessage(createMessage.from, createMessage.text))
     callback({
       text: 'data send'
     })
   })

  socket.on('disconnect', () => {
    console.log('User was disconneted');
  })
})

server.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
})
