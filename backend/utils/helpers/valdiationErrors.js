const expressValidator = require("express-validator");

module.exports = validationErrorsHandler = (req) => {
  const errors = expressValidator.validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
};
