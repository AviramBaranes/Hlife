import express from "express";
import { body, param } from "express-validator";

import * as statsController from "../controller/stats";
import authMiddleware from "../middleware/authMiddleware";
import { validateEnums } from "../utils/helpers/validation/customValidationHelpers";

const router = express.Router();
const ranksOptionsEnum = ["Beginner", "Intermediate", "Advanced", "Pro"];

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
    body("musclesMass", "Muscles mass needs to be in a range of 10kg-200kg")
      .optional()
      .isInt({
        min: 0,
        max: 120,
      }),
    body("bodyImageUrl", "Image is invalid").optional().isURL(),
  ],
  statsController.addStats
);

//get all stats dates
router.get(
  "/all-stats-dates",
  authMiddleware,
  statsController.getAllStatsDates
);

//get a stat
router.get(
  "/:date",
  authMiddleware,
  param("date", "invalid param").isDate(),
  statsController.getStatsByDate
);

//get all stats
router.get("/", authMiddleware, statsController.getAllStats);

//change the last stat
router.put(
  "/",
  authMiddleware,
  [
    body("weight", "Weight needs to be in range 35kg-250kg")
      .optional()
      .isFloat({
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
    body("musclesMass", "Muscles mass needs to be in a range of 10kg-200kg")
      .optional()
      .isInt({
        min: 0,
        max: 120,
      }),
    body("bodyImageUrl", "Image is invalid").optional().isURL(),
  ],
  statsController.changeLastStats
);

//delete the last stat
router.delete("/", authMiddleware, statsController.deleteLastStats);

//set a ranking to user
router.post(
  "/set-ranking",
  authMiddleware,
  body("selfRank", "Ranking is invalid").custom((value: number) =>
    validateEnums(value, ranksOptionsEnum)
  ),
  statsController.setRanking
);

export default router;
