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

   //emits events to single connection
   /*socket.emit('newMessage', {
     from: 'server@example.com',
     createdAt: 123,
     text: 'New message created by server'
   })*/



   socket.on('createMessage', (createMessage) => {
     console.log('Message created by client:', createMessage);

     //emits message to every user that is connected
     io.emit('newMessage', {
       from: createMessage.from,
       text: createMessage.text,
       createdAt: new Date().getTime()
     })
   })

  socket.on('disconnect', () => {
    console.log('User was disconneted');
  })
})

server.listen(port, () => {
  console.log(`Server is up and running on ${port}`);
})
