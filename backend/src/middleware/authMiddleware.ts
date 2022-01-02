import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { CustomError } from '../types/error';

const errorHandler = (errorMsg: string) => {
  const error = new Error(errorMsg) as CustomError;
  error.statusCode = 401;
  throw error;
};

const authMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
): CustomError | void => {
  try {
    let authToken: string | undefined;
    try {
      authToken = req.headers.authorization?.split('Bearer ')[1];

      if (!authToken) throw 'no token';
    } catch (err) {
      errorHandler("Unauthorized Couldn't find authorization header");
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(authToken!, process.env.JWT_SECRET as string);
    } catch (err) {
      errorHandler('Unauthorized authorization header is invalid');
    }

    req.userId = (decodedToken as { userId: string }).userId;

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
