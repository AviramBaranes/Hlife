import express from "express";
import { body, param } from "express-validator";

import authMiddleware from "../middleware/authMiddleware";
import * as programExecutionController from "../controller/programExecution";
import { validateEnums } from "../utils/helpers/validation/customValidationHelpers";

const router = express.Router();

router.get(
  "/exercises-to-do/:date",
  authMiddleware,
  param("date", "The parameter that provided is not a valid date")
    .optional()
    .isDate(),
  programExecutionController.getExercisesByDate
);

router.post("/:date", authMiddleware, [
  param("date", "The parameter that provided is not a valid date")
    .optional()
    .isDate(),
  body("exercises").custom((value: { [name: string]: string }) => {
    for (let key in value) {
      if (typeof value[key] === "boolean") {
        return true;
      }
      return new Error("Each exercise need to have a boolean value");
    }
  }),
]);

router.get(
  "/:date",
  authMiddleware,
  param("date", "This date is invalid").isDate(),
  programExecutionController.getSingleExecution
);

router.get(
  "/by-range",
  authMiddleware,
  [
    body("range", "a range can only be a week, a month, a year or all").custom(
      (value: string) => validateEnums(value, ["week", "month", "year", "all"])
    ),
    body("date", "date is invalid"),
  ],
  programExecutionController.getExecutionsByRange
);

export default router;
