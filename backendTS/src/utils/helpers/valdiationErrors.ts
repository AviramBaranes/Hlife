import { Request } from "express";
import { CustomError } from "../../types/error";
import expressValidator from "express-validator";

const validationErrorsHandler = (req: Request) => {
  const errors = expressValidator.validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed") as CustomError;
    error.statusCode = 422;
    error.data = errors.array() as [];
    throw error;
  }
};
export default validationErrorsHandler;
