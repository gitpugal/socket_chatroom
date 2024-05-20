const express = require('express');
const { createServer } = require('node:http')
const { join } = require('node:path');
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
});

io.on('connection', (socket) => {
    console.log("An User Connected to Socket with id: ", socket.id);

    socket.on('message', (message, id) => {
        io.emit('newMessage', id, message)
    });

    io.emit("newUserJoined", socket.id);
});




server.listen(3000, () => {
    console.log("Listening to PORT: 3000...")
});
