"use strict";
const {
  getAllTechnicalsController,
  getTechnicalByIdController,
  createTechnicalController,
  updateTechnicalController,
  deleteTechnicalController,
} = require("../../controllers/technical.controller");
const validate = require("../../middlewares/schema.middleware");
// const {
//   TechnicalCreateSchema,
//   TechnicalUpdateSchema,
// } = require("../../schemas/Technical.schema");

module.exports = (Router) => {
  const router = Router();

  router
    .get("/technicals", getAllTechnicalsController)
    .get("/technical/:id", getTechnicalByIdController)
    // .post("/technical", validate(TechnicalCreateSchema), createTechnicalController)
    // .put("/technical/:id", validate(TechnicalUpdateSchema), updateTechnicalController)
    .post("/technical", createTechnicalController)
    .put("/technical/:id", updateTechnicalController)
    .delete("/technical/:id", deleteTechnicalController);

  return router;
};
