// Broadcasting the event (Emit the event except itself)
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server)

// html
const publicDirectoryPath = path.join(__dirname, '../public');
console.log(publicDirectoryPath)
app.use('/', express.static(publicDirectoryPath))

io.on('connection',  (socket) => {
    console.log('New wobsocket connection!.');
    // Emit the event
    // emit method takes two paramters: event name & data
    // Emit the event for particular connection
    socket.emit('message', 'Welcome!');

    // Emit the event for other connections except itself connection
    socket.broadcast.emit('message', 'A new user has joined')


    socket.on('sendMessage', (message) => {
        // Emit the event for all the connections including itself connection
        socket.broadcast.emit('message', 'BroadCasting: '+message);
    });

    socket.on('disconnect', () => {        
        io.emit('message', 'A new user has left!')
    })
});

server.listen(port, () => {
    console.log(`Server is listening to ${port}`);
})
