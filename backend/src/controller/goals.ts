import { RequestHandler } from "express";
import Goals from "../models/Goals";
import { catchErrorHandler } from "../utils/helpers/Errors/catchErrorsHandler";
import { validationErrorsHandler } from "../utils/helpers/Errors/validationErrors";

export const createGoal: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);
    const { userId } = req;
    const { basicGoal, weight, fatPercentage, musclesMass } = req.body;

    if (basicGoal === "lose fat" && !fatPercentage) {
      res
        .status(401)
        .send(
          "If you want to lose fat you need to provide your fat percentage"
        );
      return;
    }

    if (basicGoal !== "lose fat" && !musclesMass) {
      res
        .status(401)
        .send(
          "If you want to increase muscles mass you need to provide your muscles mass"
        );
      return;
    }

    const userGoals = new Goals({
      user: userId,
      basicGoal,
      detailGoals: {
        weight,
        fatPercentage,
        musclesMass,
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
    const { fatPercentage, musclesMass } = req.body;

    const userGoals = await Goals.findOne({ user: userId });

    if (!userGoals) {
      res.status(401).send("Goals have not created yet for this user");
      return;
    }

    let basicGoal = userGoals.basicGoal;
    const noFatPercentageBefore = !userGoals.detailGoal.fatPercentage;
    const noMusclesMassBefore = !userGoals.detailGoal.musclesMass;

    if (basicGoal === "increase muscles mass") {
      if (noFatPercentageBefore && !fatPercentage) {
        res
          .status(401)
          .send(
            "If you want to lose fat you need to provide your fat percentage"
          );
        return;
      }
      if (noFatPercentageBefore) {
        userGoals.detailGoal.fatPercentage = fatPercentage;
      }
      basicGoal = "lose fat";
    } else {
      if (noMusclesMassBefore && !musclesMass) {
        res
          .status(401)
          .send(
            "If you want to increase muscles mass you need to provide your muscles mass"
          );
        return;
      }
      if (noMusclesMassBefore) {
        userGoals.detailGoal.musclesMass = musclesMass;
      }
      basicGoal = "increase muscles mass";
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

    const { weight, fatPercentage, musclesMass } = req.body;

    const userGoals = await Goals.findOne({ user: userId });

    if (!userGoals) {
      res.status(401).send("Goals have not created yet for this user");
      return;
    }

    if (!weight && !fatPercentage && !musclesMass) {
      res.status(401).send("No parameters were provided");
      return;
    }

    if (weight) userGoals.detailedGoals.weight = weight;
    if (fatPercentage) userGoals.detailedGoals.fatPercentage = fatPercentage;
    if (musclesMass) userGoals.detailedGoals.musclesMass = musclesMass;

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
