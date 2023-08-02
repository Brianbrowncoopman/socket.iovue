import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
  //console.log("cliente conectado");
  console.log(socket.id);

  socket.on("message", (body) => {
    console.log(body);
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(5),
    });
  });
});

server.listen(3000);
console.log("Server on port", 3000);
