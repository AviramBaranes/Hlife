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
      if (value === "lose weight" || value === "gain weight") {
        return true;
      }
      throw new Error(
        "basic goal can be either 'lose weight' or 'gain weight'"
      );
    }),
    body("weight", "Weight must be a number").isFloat(),
    body("fatPercentage", "Fat percentage must be a number")
      .optional()
      .isFloat(),
    body("muscelesMass", "Musceles mass must be a number").optional().isFloat(),
  ],
  goalsController.createGoal
);

export default router;
