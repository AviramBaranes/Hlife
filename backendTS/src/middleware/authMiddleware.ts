import { RequestHandler } from "express";

import { CustomError } from "../types/error";

const jwt = require("jsonwebtoken");

const errorHandler = (errorMsg: string) => {
  const error = new Error(errorMsg) as CustomError;
  error.statusCode = 401;
  throw error;
};

const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    let authToken;
    try {
      authToken = req.headers.cookie?.split("jon=")[1].split(";")[0];
    } catch (err) {
      errorHandler("Unauthorized Couldnt find cookie");
    }

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

export default authMiddleware;
