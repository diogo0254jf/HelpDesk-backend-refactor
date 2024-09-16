"use strict";
const {
  forgotPasswordController,
  registerUserController,
  loginUserController,
} = require("../../controllers/auth.controller");
const validate = require("../../middlewares/schema.middleware");
const {
  authLoginSchema,
  authRegisterSchema,
} = require("../../schemas/auth.schema");

module.exports = (Router) => {
  const router = Router();

  router
    .post("/client/auth", validate(authLoginSchema), loginUserController)
    .put("/client/auth", validate(authRegisterSchema), registerUserController);

  return router;
};
