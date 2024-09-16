"use strict";
const express = require("express");
const cors = require("cors");
const routerMiddleware = require("./routes/REST_routes");
global["mongoose"] = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("../swagger_documentation.json");
require("dotenv").config();

async function main() {
  const mongoUrl = process.env.MONGO_URL_CONNECTION;
  if (!mongoUrl || (!mongoUrl.startsWith("mongodb://") && !mongoUrl.startsWith("mongodb+srv://"))) {
    throw new Error("A variável de ambiente MONGO_URL_CONNECTION não está definida corretamente");
  }

  try {    
    await mongoose.connect(mongoUrl);
    console.log("Conectado ao banco de dados");
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  }
}

const app = express();


main(app).catch((err) => console.log(err));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(cors());
app.use(express.json());
app.use(express.static("../public"));

routerMiddleware(app);

module.exports = app;
