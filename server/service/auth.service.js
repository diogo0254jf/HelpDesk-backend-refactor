const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModels = require("../models/user.models");
const ApiError = require("../utils/ApiError");

require("dotenv").config();

exports.loginUserService = async (userInformation) => {
  const { email, password } = userInformation;

  const user = await userModels.findOne({
    login: email,
  });

  if (!user) {
    throw new ApiError("Incorrect login details", 401, "User not found");
  }

  let passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new ApiError("Incorrect login details", 401);
  }

  if (!user.active) {
    throw new ApiError("User not active", 401);
  }

  const token = jwt.sign(
    {
      sub: user._id,
      name: user.nome,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  await user.updateOne({ token: token });

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

exports.registerUserService = async (userInformation) => {
  const { name, email, password } = userInformation;

  try {
    await userModels
      .findOne({
        email,
      })
      .then((result) => {
        if (result) {
          throw { status: 400, message: "Email already registered" };
        }
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModels.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    throw new ApiError(
      error.message || "Internal server error during registration",
      error.status || 500
    );
  }
};

exports.generateNewToken = async (decoded) => {
  const user = await userModels.findOne({
    _id: decoded.sub,
  });

  const token = jwt.sign(
    {
      sub: decoded.sub,
      name: decoded.name,
      role: decoded.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  await user.updateOne({ token: token });
  user.save();

  return token;
};
