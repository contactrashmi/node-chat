var socket = io()
socket.on('connect', function () {
  console.log('Connected to server');

  /*socket.emit('createEmail', {
    to: 'jane@emaple.com',
    text: 'Hey! This is Rashmi'
  })*/

  socket.emit('createMessage', {
    from: 'rashmi@example.com',
    text: 'Hey this is a new message from Rashmi'
  })
})

socket.on('disconnect', function() {
  console.log('Disconnected from server');
})

/*socket.on('newEmail', function (email) {
  console.log('New Email',email);
})*/

socket.on('newMessage', function (message) {
  console.log('New Message', message);
})
