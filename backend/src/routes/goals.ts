import express from "express";
import { body } from "express-validator";

import authMiddleware from "../middleware/authMiddleware";
import * as goalsController from "../controller/goals";

const router = express.Router();

//create goals
router.post(
  "/",
  authMiddleware,
  [
    body(
      "basicGoal",
      "basic goal can be either 'lose fat' or 'increase muscles mass'"
    ).custom((value: string) => {
      if (value === "lose fat" || value === "increase muscles mass") {
        return true;
      }
      return false;
    }),
    body("weight", "Weight must be a number").isFloat({ min: 30, max: 225 }),
    body("fatPercentage", "Fat percentage must be a number")
      .optional()
      .isFloat({ min: 0, max: 50 }),
    body("musclesMass", "Muscles mass must be a number")
      .optional()
      .isFloat({ min: 25, max: 125 }),
  ],
  goalsController.createGoal
);

//change basic goal
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

//change detail goal
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

//get goals
router.get("/", authMiddleware, goalsController.getGoals);

export default router;
