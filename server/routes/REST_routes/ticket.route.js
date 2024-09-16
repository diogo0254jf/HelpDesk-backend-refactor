"use strict";
// const {
//   getAllTicketsController,
//   getTicketByIdController,
//   createTicketController,
//   updateTicketController,
//   deleteTicketController,
// } = require("../../controllers/ticket.controller");
// const validate = require("../../middlewares/schema.middleware");
// const {
//   ticketCreateSchema,
//   ticketUpdateSchema,
// } = require("../../schemas/ticket.schema");

module.exports = (Router) => {
  const router = Router();

  // router
  //   .get("/tickets", getAllTicketsController)
  //   .get("/tickets/:id", getTicketByIdController)
  //   .post("/tickets", validate(ticketCreateSchema), createTicketController)
  //   .put("/tickets/:id", validate(ticketUpdateSchema), updateTicketController)
  //   .delete("/tickets/:id", deleteTicketController);

  router
  .get("/tickets", () => {
    console.log("Hello World")
  })
  // .get("/tickets/:id", getTicketByIdController)
  // .post("/tickets", validate(ticketCreateSchema), createTicketController)
  // .put("/tickets/:id", validate(ticketUpdateSchema), updateTicketController)
  // .delete("/tickets/:id", deleteTicketController);

  return router;
};