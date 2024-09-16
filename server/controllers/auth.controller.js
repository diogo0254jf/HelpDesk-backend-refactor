const {
  registerUserService,
  loginUserService,
} = require("../service/auth.service");
const ApiError = require("../utils/ApiError");

exports.loginUserController = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const result = await loginUserService({ username, password });

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.toObject());
    } else {
      next(error);
    }
  }
};

exports.registerUserController = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const result = await registerUserService({
      name,
      email,
      password,
    });

    res.status(200).json(result);
  } catch (error) {
    
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.toObject());
    } else {
      next(error);
    }
  }
};
