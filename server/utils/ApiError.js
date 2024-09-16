const status = require("http-status");

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }

  toObject() {
    return {
      code: this.statusCode,
      message: status[this.statusCode],
      messageDeveloper: this.message,
    };
  }
}

module.exports = ApiError;
