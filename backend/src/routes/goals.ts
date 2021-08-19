import express from "express";
import { body } from "express-validator";

import authMiddleware from "../middleware/authMiddleware";
import * as goalsController from "../controller/goals";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [
    body("basicGoal").custom((value: string) => {
      if (value === "lose fat" || value === "increase muscles mass") {
        return true;
      }
      throw new Error(
        "basic goal can be either 'lose fat' or 'increase muscles mass'"
      );
    }),
    body("weight", "Weight must be a number").isFloat({ min: 30, max: 225 }),
    body("fatPercentage", "Fat percentage must be a number")
      .optional()
      .isFloat({ min: 0, max: 50 }),
    body("musclesMass", "Muscles mass must be a number")
      .optional()
      .isFloat({ min: 25, max: 100 }),
  ],
  goalsController.createGoal
);

router.put(
  "/basicGoal",
  authMiddleware,
  [
    body("fatPercentage", "Fat percentage must be a number")
      .optional()
      .isFloat({ min: 0, max: 50 }),
    body("musclesMass", "Muscles mass must be a number")
      .optional()
      .isFloat({ min: 25, max: 100 }),
  ],
  goalsController.changeBasicGoal
);

router.put(
  "/",
  authMiddleware,
  [
    body("weight", "Weight must be a number")
      .optional()
      .isFloat({ min: 30, max: 225 }),
    body("fatPercentage", "Fat percentage must be a number")
      .optional()
      .isFloat({ min: 0, max: 50 }),
    body("musclesMass", "Muscles mass must be a number")
      .optional()
      .isFloat({ min: 25, max: 100 }),
  ],
  goalsController.changeGoals
);

router.get("/", authMiddleware, goalsController.getGoals);

export default router;
