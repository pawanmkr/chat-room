const path = require('path');
const express = require('express');
const PORT = 4000 || process.env.PORT;

const app = express();
const server = require('http').createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

// run when client connects
io.on('connection', socket => {
    
    socket.emit('message', `hi, it's me pawan...`);

    //broadcast when a user connects
    socket.broadcast.emit('message', 'a user has joined the chat');

    //when a user dissconnects
    socket.on('disconnect', () => {
        io.emit('message', 'user left');
    })

    //catching chatMessage here and sending back to client again
    socket.on('textMessageFromClient', (message) => {
        io.emit('message', message);
    })
});

server.listen(PORT, () => {
    console.log(`server's up and running at http://localhost/${PORT}`);
});