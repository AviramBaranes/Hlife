import express from "express";
import { body, param } from "express-validator";

import authMiddleware from "../middleware/authMiddleware";
import * as programExecutionController from "../controller/programExecution";
import { validateEnums } from "../utils/helpers/validation/customValidationHelpers";

const router = express.Router();

router.get(
  "/exercises-to-do/:date?",
  authMiddleware,
  param("date", "The parameter that provided is not a valid date")
    .optional()
    .isDate({ format: "DD-MM-YYYY" }),
  programExecutionController.getExercisesByDate
);

router.post(
  "/:date?",
  authMiddleware,
  [
    param("date", "The parameter that provided is not a valid date")
      .optional()
      .isDate({ format: "DD-MM-YYYY" }),
    body("exercises", "Each exercise need to have a boolean value").custom(
      (value: { [name: string]: string }) => {
        for (let key in value) {
          if (typeof value[key] === "boolean") {
            continue;
          }
          return false;
        }
        return true;
      }
    ),
  ],
  programExecutionController.declareAnExecution
);

router.get(
  "/:date",
  authMiddleware,
  [param("date", "This date is invalid").isDate({ format: "DD-MM-YYYY" })],
  programExecutionController.getSingleExecution
);

router.get(
  "/by-range/:range/:date",
  authMiddleware,
  [
    param("range", "a range can only be a week, a month, a year or all").custom(
      (value: string) => validateEnums(value, ["week", "month", "year", "all"])
    ),
    param("date", "date is invalid").isDate({ format: "DD-MM-YYYY" }),
  ],
  programExecutionController.getExecutionsByRange
);

export default router;
