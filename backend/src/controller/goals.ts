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

export const changeBasicGoal: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);
    const { userId } = req;

    const userGoals = await Goals.findOne({ user: userId });

    if (!userGoals) {
      res.status(401).send("Goals have not created yet for this user");
      return;
    }

    let basicGoal = userGoals.basicGoal;

    if (basicGoal === "gain weight") {
      basicGoal = "lose weight";
    } else {
      basicGoal = "gain weight";
    }

    userGoals.basicGoal = basicGoal;
    await userGoals.save();

    res.status(201).send("Goals updated");
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const changeGoals: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);
    const { userId } = req;

    const { weight, fatPercentage, muscelesMass } = req.body;

    const userGoals = await Goals.findOne({ user: userId });

    if (!userGoals) {
      res.status(401).send("Goals have not created yet for this user");
      return;
    }

    if (!weight && !fatPercentage && !muscelesMass) {
      res.status(401).send("No parameters were provided");
      return;
    }

    if (weight) userGoals.detailedGoals.weight = weight;
    if (fatPercentage) userGoals.detailedGoals.fatPercentage = fatPercentage;
    if (muscelesMass) userGoals.detailedGoals.muscelesMass = muscelesMass;

    await userGoals.save();

    res.status(201).send("Goals updated");
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const getGoals: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;

    const userGoals = await Goals.findOne({ user: userId });

    if (!userGoals) {
      res.status(401).send("Goals have not created yet for this user");
      return;
    }

    res.status(201).json({ ...userGoals });
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
