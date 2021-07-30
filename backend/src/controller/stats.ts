import { RequestHandler } from "express";

import { validationErrorsHandler } from "../utils/helpers/Errors/valdiationErrors";
import { catchErrorHandler } from "../utils/helpers/Errors/catchErrorsHandler";
import PhysicalStats from "../models/PhysicalStats";
import Goals from "../models/Goals";
import User from "../models/User";
import {
  calculateGrade,
  GoalsAchieved,
} from "../utils/helpers/stats/statsHelpers";

export const addStats: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);
    const { userId } = req;

    const { weight, height, fatPercentage, muscelesMass, bodyImageUrl } =
      req.body;

    const userGoals = await Goals.findOne({ user: userId });

    if (!userGoals) {
      res.status(401).send("User's goals not found");
      return;
    }

    const user = await User.findById(userId);
    const userStats = await PhysicalStats.findOne({ user: userId });

    let grade = 15;
    let messages: string[] = [];
    let accomplishments = <GoalsAchieved>{};

    if (userStats.stats.length > 0) {
      const lastStatsIndex = userStats.stats.length - 1;
      const lastStatsRecord = userStats.stats[lastStatsIndex];
      const lastWeightRecord = lastStatsRecord.weight;

      const { failureMessages, goalsAchieved, calculatedGrade } =
        calculateGrade(
          lastWeightRecord,
          fatPercentage,
          lastStatsRecord,
          muscelesMass,
          userGoals.basicGoals,
          userGoals.detailGoals,
          weight
        );

      grade += calculatedGrade;
      messages = [...failureMessages];
      accomplishments = { ...goalsAchieved };
    }

    const newStatsEntry = {
      date: new Date(),
      deservedGrade: grade,
      weight,
      height,
      fatPercentage,
      muscelesMass,
      bodyImageUrl,
    };

    user.grade += grade;
    userStats.stats.push(newStatsEntry);

    await user.save();
    await userStats.save();

    res
      .status(201)
      .json({ messages, currentGrade: user.grade, accomplishments });
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
