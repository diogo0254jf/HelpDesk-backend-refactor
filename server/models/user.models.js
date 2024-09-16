"use strict";
const { Schema, model } = require("mongoose");

const user = Schema(
  {
    name: String,
    cpf: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["ADMIN", "CLIENT", "TECHNICAL"],
      default: "CLIENT",
    },
    token: String,
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("user", user);
