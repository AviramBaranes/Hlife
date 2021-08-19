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
    body("trainingDayName", "Invalid name").custom((value: string) =>
      validateEnums(value, trainingDayNames)
    ),
    body("name", "Invalid name").isAlpha().isLength({ min: 3 }),
    body("description", "Invalid description").optional().isLength({ min: 10 }),
    body("exercises").custom((value: ExercisesObj[]) =>
      validateExercises(value)
    ),
    body("time", "Invalid time").optional().isInt({ min: 10, max: 300 }),
  ],
  workoutController.createWorkout
);

//get by name
router.get(
  "/",
  authMiddleware,
  query("trainingDayName").custom((value: string) =>
    validateEnums(value, trainingDayNames)
  ),
  workoutController.getWorkoutByName
);

//get by id
router.get("/:workoutId", authMiddleware, workoutController.getById);

router.put(
  "/",
  authMiddleware,
  [
    body("trainingDayName", "Invalid name").custom((value: string) =>
      validateEnums(value, trainingDayNames)
    ),
    body("name", "Invalid name").isAlpha().isLength({ min: 3 }),
    body("description", "Invalid description").optional().isLength({ min: 10 }),
    body("exercises").custom((value: ExercisesObj[]) =>
      validateExercises(value)
    ),
    body("time", "Invalid time").optional().isInt({ min: 10, max: 300 }),
  ],
  workoutController.changeWorkout
);

router.delete(
  "/:name",
  authMiddleware,
  param("name").custom((value: string) =>
    validateEnums(value, trainingDayNames)
  ),
  workoutController.deleteWorkout
);

export default router;
