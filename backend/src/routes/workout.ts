import express from "express";
import { body, param, query } from "express-validator";

import authMiddleware from "../middleware/authMiddleware";
import * as workoutController from "../controller/workout";
import { validateEnums } from "../utils/helpers/validation/customValidationHelpers";
import {
  ExercisesObj,
  validateExercises,
} from "../utils/program/programHelpers";

const router = express.Router();

const trainingDayNames = ["A", "B", "C", "D", "FB", "aerobic"];

router.post(
  "/",
  authMiddleware,
  [
    body("trainingDayName", "Invalid training day name").custom(
      (value: string) => validateEnums(value, trainingDayNames)
    ),

    body("name")
      .isAlpha()
      .withMessage("Name can contain only letters")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 letters"),

    body("description", "Description too short")
      .optional()
      .isLength({ min: 10 }),

    body("exercises", "Exercises are invalid").custom((value: ExercisesObj[]) =>
      validateExercises(value)
    ),

    body("time", "Time is invalid").optional().isInt({ min: 10, max: 300 }),
  ],
  workoutController.createWorkout
);

//get by name
router.get(
  "/",
  authMiddleware,
  query("trainingDayName", "Invalid training day name").custom(
    (value: string) => validateEnums(value, trainingDayNames)
  ),
  workoutController.getWorkoutByName
);

//get by id
router.get("/:workoutId", authMiddleware, workoutController.getById);

router.put(
  "/",
  authMiddleware,
  [
    body("trainingDayName", "Invalid training day name").custom(
      (value: string) => validateEnums(value, trainingDayNames)
    ),

    body("name")
      .isAlpha()
      .withMessage("Name can contain only letters")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 letters"),

    body("description", "Description too short")
      .optional()
      .isLength({ min: 10 }),

    body("exercises", "Exercises are invalid").custom((value: ExercisesObj[]) =>
      validateExercises(value)
    ),

    body("time", "Time is invalid").optional().isInt({ min: 10, max: 300 }),
  ],
  workoutController.changeWorkout
);

router.delete(
  "/:trainingDayName",
  authMiddleware,
  param("trainingDayName", "Invalid training day name").custom(
    (value: string) => validateEnums(value, trainingDayNames)
  ),
  workoutController.deleteWorkout
);

export default router;
