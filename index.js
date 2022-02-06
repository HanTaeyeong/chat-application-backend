const express = require('express')

const http = require('http')
const router = require('./router')

const { Server } = require('socket.io')

const cors =require('cors')

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app)

const io = new Server(server,{cors:{
    origin:'*'
}})

const corsPolicy={
    //Headers:'Access-Control-Allow-Headers: X-Requested-With, privatekey',
    origin:'*',
    credentials:true
}

app.use(cors())
app.use(router);


io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room)

        const error = true;
  
        if (error) {
            callback(()=>alert('error'));
        }

    })


    socket.on('disconnect', () => {
        console.log('user has left')
    })

})

server.listen(PORT, () => console.log(`server started on ${PORT}`));

