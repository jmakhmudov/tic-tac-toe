const io = require("socket.io")(5000, {
    cors: {
        origin: '*'
    }
});

io.on("connection", socket => {
    console.log(socket.id);
    socket.on("send", (user, room) => {
        socket.to(room).emit("receive-info", user)
    })
    socket.on('join-room', (user, room, cb) => {
        socket.join(room);
        socket.to(room).emit("receive-info", user)
        cb();
    })
    socket.on("table", (val, room, cb) => {
        socket.to(room).emit("receive-table", val);
        cb();
    })
});