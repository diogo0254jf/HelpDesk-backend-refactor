const swaggerAutogen = require("swagger-autogen")();
const doc = require("./server/configs/swagger");

const outputFile = "./swagger_documentation.json";
const endpoints = ["./server/routes/*/*.js"];

swaggerAutogen(outputFile, endpoints, doc).then(() => {
  require("./server/app.js");
});
