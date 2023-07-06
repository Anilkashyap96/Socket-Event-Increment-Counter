# Socket-Event-Increment-Counter

Goal: Create an Express Web Server

	1- Initialize npm and install Express
	2- Setup a new Express server
	- Serve up the public directory
	- Listen on port 3000
	3- Create index.html and render "Chat App" to the screen
	4- Start the server and view the page in the browser


	• Web-Socket is not specific to Node.JS. You can use the Web-Socket with other programming languages as well.
	 
Web-Sockets with Node.JS
	• Web-Sockets allow for full-duplex communication(Bi-directional communication).
		
		
		
	• Web-Socket is a separate protocol from HTTP.
	• Persistent connection between client and server.

	
Scenario:1 
There are 4 clients connected in the chat room and one client sends the message in chat room
Flow:
	• Client sends the data to the server. 
	•  Server broadcasts the data to all the clients.
		
	   
	
** We will use socket.io library with node.js to achieve the real-time data communication
     npm install socket.io@2.2.0


Create Server(index.js) in the server side

const path = require('path');
const http = require('http');
const express = require('express');
const port = 3000;
const app = express();
const server = http.createServer(app);
// html
const publicDirectoryPath = path.join(__dirname, '../public');
console.log(publicDirectoryPath)
app.use('/', express.static(publicDirectoryPath))
server.listen(port, () => {
    console.log(`Server is listening to ${port}`);
})
 
	• socket.io expect to be called with a raw http server.
Now Express does this behind the scene. That's why explicitly creating a server using http server.
	
	const socketIo = require('socket.io');
	
	const server = http.createServer(app);
	const io = socketIo(server)
	
	//  New client is connected
	io.on('connect',  () => {
	    console.log('New wobsocket connection!.');
	})
	
	
Client side implementation

	• Load the javascript file /socket.io/socket.io.js in index.html
	• Call the io() function which is present in /socket.io/socket.io.js

Socket connection & event emit in the server side
io.on('connection',  (socket) => {
    console.log('New wobsocket connection!.');
    // Emit the event
    // emit method takes two paramters: event name & data
    socket.emit('countUpdated', count);
});


Socket connection in the client side & event handling
const socket = io();
// Handle event
// It takes two parameters: event name & callback function
// If emit pass data then callback function will have parameter
socket.on('countUpdated', (count) => {
    console.log('The count has been updated', count);
});


** Note: 
	• Emit the event for particular connection.
	io.on('connection',  (socket) => {
	    console.log('New wobsocket connection!.');
	    // Emit the event
	    // emit method takes two paramters: event name & data
	    // Emit the event for particular connection
	    socket.emit('countUpdated', count);
	    socket.on('increment', () => {
	        // **Emit the event for particular connection
	        socket.emit('countUpdated', ++count);    });
	});
	
	• Emit the event for all the connections including itself
	io.on('connection',  (socket) => {
	    console.log('New wobsocket connection!.');
	    // Emit the event
	    // emit method takes two paramters: event name & data
	    // Emit the event for particular connection
	    socket.emit('countUpdated', count);
	    socket.on('increment', () => {
	        // **Emit the event for all the connections / Broadcast the event
	        io.emit('countUpdated', ++count);
	    });
	});
	
	• Broadcast the event for all other the connections except itself
	
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
	        io.emit('message', message);
	    });
	    socket.on('disconnect', () => {
	        io.emit('message', 'A new user has left!')
	    })
	});
	

Event Acknowledge
Public/Chat.js
--------------
document.querySelector('#send-text').addEventListener('click', (e) => {
    e.preventDefault();
    
    const dom = document.querySelector('#message-box');
    const text = dom.value;
    // Emit the event and acknowledge the event through callback
    socket.emit('sendMessage', text, (callbackMessage)=> {
        console.log(`This message was delivered: ${callbackMessage}`)
    });
})

src/index.js
--------------

io.on('connection',  (socket) => {
    // Emit the event for other connections except itself connection
    socket.broadcast.emit('message', 'A new user has joined')

        // Event Handling and Event Acknowledgement using the callback
    socket.on('sendMessage', (message, callback) => {
        // Emit the event for all the connections including itself connection
        socket.broadcast.emit('message', 'BroadCasting: '+message);
        callback('Delivered');
    });
});

![image](https://github.com/Anilkashyap96/Socket-Event-Increment-Counter/assets/24756308/1dbdfdb7-be3d-4219-b12a-3f7f3eac06cb)
