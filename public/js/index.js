var socket = io()
socket.on('connect', function () {
  console.log('Connected to server');

  /*socket.emit('createMessage', {
    from: 'rashmi@example.com',
    text: 'Hey this is a new message from Rashmi'
  })*/
})

socket.on('disconnect', function() {
  console.log('Disconnected from server');
})

socket.on('newMessage', function (message) {
  console.log('New Message', message);
  var li = jQuery('<li></li>')
  li.text(`${message.from}:  ${message.text}`)

  jQuery('#messages').append(li)
})

//For acknowledgement
/*socket.emit('createMessage', {
  from: 'Rashmi',
  text: 'Hey this is a new message from Rashmi'
}, function(data) {
  console.log('Got it', data);
})*/

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'jquery',
    text: jQuery('[name=message]').val()
  }, function() {
    console.log('Ack');
  })
})
