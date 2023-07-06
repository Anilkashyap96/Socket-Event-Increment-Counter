const socket = io();

// Handle event
// It takes two parameters: event name & callback function
// If emit pass data then callback function will have parameter
socket.on('countUpdated', (count) => {
    console.log('The count has been updated', count);
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked')
    // Emit the event without data
    socket.emit('increment');
})