const technicalModels = require("#models/technical");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

exports.getAllTechnicalsService = async () => {
  const technicals = await technicalModels.find();

  if (!technicals) {
    throw new ApiError("Technicals not found", 404);
  }

  return technicals;
};

exports.getTechnicalByIdService = async (id) => {
  const technical = await technicalModels.findOne({ _id: id });

  if (!technical) {
    throw new ApiError("Technical not found", 404);
  }

  return technical;
};

exports.createTechnicalService = async (technicalData) => {
  const { nome, cpf, email, password } = technicalData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newTechnical = await technicalModels.create({
    nome,
    cpf,
    email,
    password: hashedPassword,
  });

  if (!newTechnical) {
    throw new ApiError("Technical not created", 400);
  }

  return newTechnical;
};

exports.updateTechnicalService = async (id, technicalData) => {
  const { nome, cpf, email, password } = technicalData;
  let hashedPassword;

  if (!id) {
    throw new ApiError("Technical id is required", 400);
  }

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const updatedTechnical = await technicalModels.findOneAndUpdate(
    { _id: id },
    {
      nome,
      cpf,
      email,
      password: hashedPassword || password,
    },
    { new: true }
  );

  if (!updatedTechnical) {
    throw new ApiError("Technical not updated", 400);
  }

  return updatedTechnical;
};

exports.deleteTechnicalService = async (id) => {
  if (!id) {
    throw new ApiError("Technical id is required", 400);
  }

  await technicalModels.deleteOne({ _id: id });
  return true;
};
