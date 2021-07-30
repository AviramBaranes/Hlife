import { NextFunction } from "express";
import { CustomError } from "../../../types/error";

export const catchErrorHandler = (err: CustomError, next: NextFunction) => {
  process.env.Node_ENV !== "test" && console.log(err);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
  return err;
};
