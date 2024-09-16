"use strict";
// const {
//   getAllClientsController,
//   getClientByIdController,
//   createClientController,
//   updateClientController,
//   deleteClientController,
// } = require("../../controllers/client.controller");
// const validate = require("../../middlewares/schema.middleware");
// const {
//   clientCreateSchema,
//   clientUpdateSchema,
// } = require("../../schemas/client.schema");

module.exports = (Router) => {
  const router = Router();

  //   router
  //     .get("/clients", getAllClientsController)
  //     .get("/clients/:id", getClientByIdController)
  //     .put("/clients/:id", validate(clientUpdateSchema), updateClientController)
  //     .delete("/clients/:id", deleteClientController);

  router.get("/clients", () => {
    console.log("Hello World");
  });

  return router;
};
