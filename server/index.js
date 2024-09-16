"use strict";

var http = require("https");
const app = require("./app.js");
const io = require("./routes/SOCKET_routes");
const fs = require("fs");
require("dotenv").config();

if (process.env.ENV == "local") {
  var options = {};
  http = require("http");
} else {
  var key = fs.readFileSync(process.env.HTTPS_KEY);
  var cert = fs.readFileSync(process.env.HTTPS_CERT);
  var ca = fs.readFileSync(process.env.HTTPS_CA);

  var options = {
    key: key,
    cert: cert,
    ca: ca,
  };
}

const hostname = process.env.HOST || "localhost";
const port = process.env.PORT;

async function bootstrap() {
  return http.createServer(options, app).listen(port);
}

bootstrap()
  .then((server) => {
    io.attach(server, {
      cors: {
        origin: [
          "http://localhost:3000",
          "http://localhost:3008",
          "http://localhost:5173",
          "http://localhost:3009",
          "http://localhost:5173",
        ],
        methods: ["GET", "POST"],
        credentials: true,
        transports: ["websocket", "polling"],
      },
      allowEIO3: true,
      pingTimeout: 30000, // 30 seconds
      pingInterval: 25000, // 25 seconds
    });
    global.io = io;
    console.log(
      `Server listening at http://${hostname}:${server.address().port}`
    );
  })
  .catch((error) => {
    setImmediate(() => {
      console.error("Server Error:");
      console.error(error);
      process.exit();
    });
  });
