const express = require("express")
const app = express()
const server = require('http').createServer(app)

server.listen(5000,  () => {
    console.log(5000)
})


const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});

io.on("connection", socket => {
    console.log(socket.id);
    socket.on("send", (user, room) => {
        socket.to(room).emit("receive-first", user)
    })
    socket.on('join-room', (user, room, cb) => {
        socket.join(room);
        socket.to(room).emit("receive-info", user)
        cb();
    })
    socket.on("table", (val, room, char, cb) => {
        socket.to(room).emit("receive-table", val, char);
        cb();
    })
});

