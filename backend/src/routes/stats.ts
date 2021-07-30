import express from "express";
import { body } from "express-validator";

import * as statsController from "../controller/stats";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

//add stat
router.post(
  "/",
  authMiddleware,
  [
    body("weight", "Weight needs to be in range 35kg-250kg").isFloat({
      min: 35,
      max: 250,
    }),
    body("height", "Height needs to be in a range of 100cm-250cm")
      .optional()
      .isInt({
        min: 100,
        max: 250,
      }),
    body("fatPercentage", "Fat Percentage needs to be lower than 80%")
      .optional()
      .isInt({
        min: 0,
        max: 80,
      }),
    body("muscelesMass", "Musceles mass needs to be in a range of 10kg-200kg")
      .optional()
      .isInt({
        min: 0,
        max: 80,
      }),
    body("bodyImageUrl", "Image is invalid").optional().isURL(),
  ],
  statsController.addStats
);

export default router;
