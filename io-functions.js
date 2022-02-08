const onConnection = (socket) => {
    console.log('a user connected')

    socket.on('join', ({ name, room }) => {
        console.log(name, room)
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return error;

        socket.emit('message', { user: 'admin', text: `${user.name} welcome to the ${room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })
        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    })

    socket.on('sendMessage', (message) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('meessage', { user: user.name, text: message })
    })

    socket.on('disconnect', () => {
        io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    })
}

const onJoin=()=>{
    
}


module.exports = { onConnection };