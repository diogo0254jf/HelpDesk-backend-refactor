const { Schema, model } = require("mongoose");

const TicketSchema = new Schema({
  prioridade: {
    type: String,
    enum: ["BAIXA", "MEDIA", "ALTA"],
    required: true,
  },
  status: {
    type: String,
    enum: ["ABERTO", "ANDAMENTO", "ENCERRADO"],
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  observacoes: {
    type: String,
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  tecnico: {
    type: Schema.Types.ObjectId,
    ref: "technical",
    required: true,
  },
});

module.exports = model("ticket", TicketSchema);