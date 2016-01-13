var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
console.log(name);
var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('message', function (messages) {
    var momentTimestamp = moment.utc(messages.timestamp);
    var message = $('.messages');
    console.log('New message: ');
    console.log(message.text);
    message.append('<p><strong>' + messages.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
    message.append('<p>' + messages.text + '</p>');
});

var form = $('#message-form');
form.on('submit', function(event) {
    event.preventDefault();
    var message = form.find('input[name=message]');

    socket.emit('message', {
        name: name,
        text: message.val()
    });
    message.val('');
});