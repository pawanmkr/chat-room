const socket = io();
const form = document.getElementById('form');
const messageBody = document.querySelector('.messages');

//listening for submit event when user will send chat
form.addEventListener('submit', (event) => {
    event.preventDefault()

    //catching text-message from the input box
    const chatMessageBox = document.getElementById('msg');
    const chatMessage = chatMessageBox.value;

    //emitting chatMessage to server
    socket.emit('textMessageFromClient', chatMessage);

    //clear input box and focus
    chatMessageBox.value = "";
    chatMessageBox.focus();
});

//this socket gets the message from server and then it sends the message
//to outputMessage function to print in DOM
socket.on('message', (message) => {
    console.log("send by the server: " + message);
    outputMessage(message);

    //scroll to top
    messageBody.scrollTop = messageBody.scrollHeight;
});

//output message to DOM
const outputMessage = (message) => {
    const list = document.createElement('li');
    list.classList.add('list-item');
    // list.innerHTML = `
    //             <p class="meta"> ${message.username} <span> ${message.time} </span> </p>
    //             <P class="text">${message.text}</P>
    // `;
    list.innerText = message;
    document.getElementById('msg-list').appendChild(list);
}