const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors({ origin: '*', credentials: true }));

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('playVideo', (data) => {
    io.emit('playVideo', data);
    console.log(data);
  });

  socket.on('toggleVideo', () => {
    io.emit('toggleVideo');
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket en el puerto ${PORT}`);
});