const express = require('express')

const http = require('http')
const router = require('./router')

const { Server } = require('socket.io')

const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')


const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

const corsPolicy = {
    //Headers:'Access-Control-Allow-Headers: X-Requested-With, privatekey',
    origin: '*',
    credentials: true
}

app.use(cors())
app.use(router);

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('join', ({ name, room }) => {
        console.log(name, room)
        const { error, user } = addUser({id:socket.id, name, room});

        if(error) return error;

        socket.emit('message', {user:'admin',text:`${user.name} welcome to the ${room}`})
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has joined!`})
        socket.join(user.room);
    })

    socket.on('sendMessage',(message)=>{
        const user=getUser(socket.id)
        io.to(user.room).emit('meessage',{ user:user.name, text:message})
    })
    
    socket.on('disconnect', () => {
        console.log('user has left')
    })

})

server.listen(PORT, () => console.log(`server started on ${PORT}`));

