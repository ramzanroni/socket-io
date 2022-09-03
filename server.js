const express = require('express')
const app = express();
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


const io = require('socket.io')(http)
io.on('connection', (socket) => {
    console.log('Connected..')
    console.log('client id - ' + socket.id); 
    // console.log(msg);
    socket.on('message', (msg) => {
        console.log(msg.senderid);
        if (msg.senderid == '') {
            socket.broadcast.emit('message', msg);            
        } else {
            socket.to(msg.senderid).emit('message', msg);
        }
    })
 })