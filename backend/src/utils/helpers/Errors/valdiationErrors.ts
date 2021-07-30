import { Request } from "express";
import { CustomError } from "../../../types/error";
import { validationResult } from "express-validator";

export const validationErrorsHandler = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed") as CustomError;
    error.statusCode = 422;
    error.data = errors.array() as [];
    throw error;
  }
};
