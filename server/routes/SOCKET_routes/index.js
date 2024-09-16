"use strict";
const io = require("socket.io")();
require("dotenv").config();

io.on("connection", (socket) => {
  socket.on("ping", (data) => {
    socket.emit("pong", {
      server: new Date().getTime(),
      client: data,
    });
  });

  socket.on("disconnect", () => {});
});

module.exports = io;
