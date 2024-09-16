const { Schema, model } = require("mongoose");

const TechnicalSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "TECNICO",
  },
  tickets: [
    {
      type: Schema.Types.ObjectId,
      ref: "tickets",
    },
  ],
});

module.exports = model("technical", TechnicalSchema);
