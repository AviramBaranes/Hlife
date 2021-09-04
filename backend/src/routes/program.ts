import express from "express";
import { body, param } from "express-validator";

import authMiddleware from "../middleware/authMiddleware";
import * as programController from "../controller/program";
import { validateEnums } from "../utils/helpers/validation/customValidationHelpers";

const router = express.Router();

const trainingDayNames = ["A", "B", "C", "D", "FB", "aerobic"];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

router.get(
  "/recommendation",
  authMiddleware,
  programController.getRecommendationProgram
);

router.post(
  "/:day",
  authMiddleware,
  [
    param("day", "Invalid day").custom((value: string) =>
      validateEnums(value, days)
    ),
    body("trainingDayName", "Training day is invalid")
      .optional()
      .custom((value: string) => validateEnums(value, trainingDayNames)),
  ],
  programController.createProgram
);

router.get("/", authMiddleware, programController.getAllPrograms);

router.get(
  "/:day",
  authMiddleware,
  param("day", "Day is invalid").custom((value: string) =>
    validateEnums(value, days)
  ),
  programController.getProgram
);

router.put(
  "/:day",
  authMiddleware,
  [
    param("day", "Invalid day").custom((value: string) =>
      validateEnums(value, days)
    ),
    body("trainingDayName", "Training day is invalid")
      .optional()
      .custom((value: string) => validateEnums(value, trainingDayNames)),
    body("restDay", "rest day needs to be a boolean").isBoolean(),
  ],
  programController.changeProgram
);

export default router;
