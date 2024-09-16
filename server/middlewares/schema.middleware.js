const { z } = require("zod");
const { StatusCodes } = require("http-status-codes");

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid data", details: errorMessages });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }
};

module.exports = validate;
