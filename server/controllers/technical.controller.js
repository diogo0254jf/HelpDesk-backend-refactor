const {
  getAllTechnicalsService,
  getTechnicalByIdService,
  createTechnicalService,
  deleteTechnicalService,
  updateTechnicalService,
} = require("#services/technical");

const ApiError = require("../utils/ApiError");

exports.getAllTechnicalsController = async (req, res, next) => {
  try {
    const technicals = await getAllTechnicalsService();

    res.status(200).json(technicals);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.toObject());
    } else {
      next(error);
    }
  }
};

exports.getTechnicalByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const technical = await getTechnicalByIdService(id);

    res.status(200).json(technical);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.toObject());
    } else {
      next(error);
    }
  }
};

exports.createTechnicalController = async (req, res, next) => {
  try {
    const { nome, cpf, email, password } = req.body;

    const newTechnical = await createTechnicalService({
      nome,
      cpf,
      email,
      password,
    });

    res.status(201).json(newTechnical);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.toObject());
    } else {
      next(error);
    }
  }
};

exports.updateTechnicalController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, cpf, email, password } = req.body;

    const updatedTechnical = await updateTechnicalService(id, {
      nome,
      cpf,
      email,
      password,
    });

    res.status(200).json(updatedTechnical);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.toObject());
    } else {
      next(error);
    }
  }
};

exports.deleteTechnicalController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Technical id is required" });
    }

    await deleteTechnicalService(id);

    res.status(204).json();
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json(error.toObject());
    } else {
      next(error);
    }
  }
};
