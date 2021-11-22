import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../types/error';

const jwt = require('jsonwebtoken');

const errorHandler = (errorMsg: string) => {
  const error = new Error(errorMsg) as CustomError;
  error.statusCode = 401;
  throw error;
};

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): CustomError | void => {
  try {
    let authToken;
    try {
      authToken = req.headers.cookie?.split('jon=')[1].split(';')[0];
    } catch (err) {
      errorHandler("Unauthorized Couldn't find cookie");
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    } catch (err) {
      errorHandler('Unauthorized cookie is invalid');
    }

    req.userId = decodedToken.userId;

    next();
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};

export default authMiddleware;
