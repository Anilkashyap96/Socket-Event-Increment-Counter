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

let count = 0;
io.on('connection',  (socket) => {
    console.log('New wobsocket connection!.');
    // Emit the event
    // emit method takes two paramters: event name & data
    // Emit the event for particular connection
    socket.emit('countUpdated', count);

    socket.on('increment', () => {
        // Emit the event for particular connection
        //**socket.emit('countUpdated', ++count);

        // Emit the event for all the connections including itself connection
        io.emit('countUpdated', ++count);
    });
});

server.listen(port, () => {
    console.log(`Server is listening to ${port}`);
})