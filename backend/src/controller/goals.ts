import { RequestHandler } from "express";
import Goals from "../models/Goals";
import { catchErrorHandler } from "../utils/helpers/Errors/catchErrorsHandler";
import { validationErrorsHandler } from "../utils/helpers/Errors/valdiationErrors";

export const createGoal: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);
    const { userId } = req;
    const { basicGoal, weight, fatPercentage, muscelesMass } = req.body;

    const userGoals = new Goals({
      user: userId,
      basicGoal,
      detailGoals: {
        weight,
        fatPercentage,
        muscelesMass,
      },
    });
    await userGoals.save();

    res.status(201).send("Goals created successfully");
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
