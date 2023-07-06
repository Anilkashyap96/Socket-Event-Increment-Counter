const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
// Handle event
// It takes two parameters: event name & callback function
// If emit pass data then callback function will have parameter
socket.on('message', (message) => {
    console.log(message);
})

$messageFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');
    
    const dom = document.querySelector('#message-box');
    const text = dom.value;
    // Emit the event without data
    socket.emit('sendMessage', text, (callbackMessage)=> {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        console.log(`This message was delivered: ${callbackMessage}`)
    });
})

$sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by browser!.')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (callbackMessage) => {
            $sendLocationButton.removeAttribute('disabled');
            console.log(`This message was delivered: ${callbackMessage}`);
        });
    })
    
});
