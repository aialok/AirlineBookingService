const { StatusCodes } = require("http-status-codes");

class validationError extends Error {
  constructor(error) {
    super();
    let explanation = [];
    error.errors.forEach((err) => {
      explanation.push(err.message);
    });
    this.name = "Validation Error";
    this.message = "Not able to validate the date sent in the request";
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}

module.exports = validationError;
