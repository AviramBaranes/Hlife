const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authToken = req.headers.cookie.split("joh=")[1];

    const errorHandler = (errorMsg) => {
      const error = new Error(errorMsg);
      error.statusCode = 401;
      throw error;
    };

    if (!authToken) errorHandler("Unauthorized Couldnt find cookie");

    let decodedToken;
    try {
      decodedToken = jwt.verify(authToken, process.env.jwtSecret);
    } catch (err) {
      errorHandler("Unauthorized cookie is invalid");
    }

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    process.env.NODE_ENV !== "test" && console.log(err);
    next(err);
    return err;
  }
};
