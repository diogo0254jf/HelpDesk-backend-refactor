"use strict";
const {
  getAllTechnicalsController,
  getTechnicalByIdController,
  createTechnicalController,
  updateTechnicalController,
  deleteTechnicalController,
} = require("../../controllers/technical.controller");
const validate = require("../../middlewares/schema.middleware");
const {
  TechnicalCreateSchema,
  TechnicalUpdateSchema,
} = require("../../schemas/technical.schema");

module.exports = (Router) => {
  const router = Router();

  router
    .get("/technicals", getAllTechnicalsController)
    .get("/technical/:id", getTechnicalByIdController)
    .post(
      "/technical",
      validate(TechnicalCreateSchema),
      createTechnicalController
    )
    .put(
      "/technical/:id",
      validate(TechnicalUpdateSchema),
      updateTechnicalController
    )
    .delete("/technical/:id", deleteTechnicalController);

  return router;
};
