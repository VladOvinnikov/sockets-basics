var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
console.log(name);
var socket = io();

$('.room-title').text(room);
socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('joinRoom', {
        name: name,
        room: room
    })
});

socket.on('message', function (messageSend) {
    var momentTimestamp = moment.utc(messageSend.timestamp);
    var messages = $('.messages');
    var message = $('<li class="list-group-item"></li>');

    console.log('New message: ');
    console.log(message.text);

    message.append('<small><strong>' + messageSend.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></small>');
    message.append('<p>' + messageSend.text + '</p>');
    messages.append(message);
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