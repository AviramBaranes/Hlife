import { RequestHandler } from "express";

import { validationErrorsHandler } from "../utils/helpers/Errors/validationErrors";
import { catchErrorHandler } from "../utils/helpers/Errors/catchErrorsHandler";
import PhysicalStats, { PhysicalStatsType } from "../models/PhysicalStats";
import Goals, { GoalsType } from "../models/Goals";
import User, { UserType } from "../models/User";
import {
  calculateGrade,
  GoalsAchieved,
} from "../utils/helpers/stats/statsHelpers";

export const addStats: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);
    const { userId } = req;

    const { weight, height, fatPercentage, musclesMass, bodyImageUrl } =
      req.body;
    const userGoals = (await Goals.findOne({ user: userId })) as GoalsType;

    if (!userGoals) {
      res.status(403).send("User's goals not found");
      return;
    }

    const user = (await User.findById(userId)) as UserType;
    const userStats = (await PhysicalStats.findOne({
      user: userId,
    })) as PhysicalStatsType;

    let grade = 15;
    let messages: string[] = [];
    let accomplishments = <GoalsAchieved>{};

    if (userStats.stats.length > 0) {
      const lastStatsIndex = userStats.stats.length - 1;
      const lastStatsRecord = userStats.stats[lastStatsIndex];
      const lastWeightRecord = lastStatsRecord.weight;

      const currentTime = new Date().getTime();
      if (
        lastStatsRecord.date.getTime() + 7 * 24 * 60 * 60 * 1000 >
        currentTime
      ) {
        res
          .status(403)
          .send("You can only declare stats change once in 7 days");
        return;
      }

      const { failureMessages, goalsAchieved, calculatedGrade } =
        calculateGrade(
          lastWeightRecord,
          fatPercentage,
          lastStatsRecord,
          musclesMass,
          userGoals.basicGoal,
          userGoals.detailGoals,
          weight,
          messages
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
      musclesMass,
      bodyImageUrl,
    };

    user.grade += grade;
    user.hasInitialStats = true;
    userStats.stats.push(newStatsEntry);

    await userStats.save();
    await user.save();

    res
      .status(201)
      .json({ messages, currentGrade: user.grade, accomplishments });
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const getAllStatsDates: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;

    const userStats = (await PhysicalStats.findOne({
      user: userId,
    })) as PhysicalStatsType;

    if (!userStats) {
      res.status(403).send("No stats were found for this user");
      return;
    }

    if (userStats.stats.length === 0) {
      res.status(403).send("No stats were created yet");
      return;
    }

    const statsDates = userStats.stats.map(
      (stats: { date: Date }) => stats.date
    );

    res.status(200).json({ statsDates: [...statsDates] });
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const getStatsByDate: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { date } = req.params;

    validationErrorsHandler(req);

    const userStats = (await PhysicalStats.findOne({
      user: userId,
    })) as PhysicalStatsType;

    if (!userStats) {
      res.status(403).send("No stats were found for this user");
      return;
    }

    const requestedStats = userStats.stats.find(
      (stats: { date: Date }) => stats.date.toString() === date
    );

    if (!requestedStats) {
      res.status(403).send("Invalid date, no stats were entered at this date");
      return;
    }

    res.status(200).json({ ...requestedStats });
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const getAllStats: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;

    const userStats = (await PhysicalStats.findOne({
      user: userId,
    })) as PhysicalStatsType;

    if (!userStats) {
      res.status(403).send("No stats were found for this user");
      return;
    }

    if (userStats.stats.length === 0) {
      res.status(403).send("No stats were created yet");
      return;
    }

    res.status(200).json({ stats: [...userStats.stats] });
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const deleteLastStats: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;

    const userStats = (await PhysicalStats.findOne({
      user: userId,
    })) as PhysicalStatsType;

    if (!userStats) {
      res.status(403).send("No stats were found for this user");
      return;
    }

    if (userStats.stats.length === 0) {
      res.status(403).send("No stats were created yet");
      return;
    }

    const lastStatsIndex = userStats.stats.length - 1;
    const lastStats = userStats.stats[lastStatsIndex];

    const currentTime = new Date().getTime();
    const lastStatsTime = Date.parse(lastStats.date.toString());
    const dayInMS = 100 * 60 * 60 * 24; //one day in ms
    const allowedToDelete = currentTime - lastStatsTime < dayInMS;

    if (!allowedToDelete) {
      res
        .status(403)
        .send(
          "It's been over 24 hours since the last stats were created, You can't delete them"
        );
      return;
    }

    userStats.stats.pop();
    await userStats.save();

    res.status(200).send("The last stats were deleted");
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const changeLastStats: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { weight, height, fatPercentage, musclesMass, bodyImageUrl } =
      req.body;

    validationErrorsHandler(req);

    const userStats = (await PhysicalStats.findOne({
      user: userId,
    })) as PhysicalStatsType;

    if (!userStats) {
      res.status(403).send("No stats were found for this user");
      return;
    }

    if (userStats.stats.length === 0) {
      res.status(403).send("No stats were created yet");
      return;
    }

    const lastStatsIndex = userStats.stats.length - 1;
    const lastStats = userStats.stats[lastStatsIndex];

    const currentTime = new Date().getTime();
    const lastStatsTime = Date.parse(lastStats.date.toString());
    const dayInMS = 100 * 60 * 60 * 24; //one day in ms
    const allowedToChange = currentTime - lastStatsTime < dayInMS;

    if (!allowedToChange) {
      res
        .status(403)
        .send(
          "It's been over 24 hours since the last stats were created, You can't change them"
        );
      return;
    }

    const noData =
      !weight && !height && !fatPercentage && !musclesMass && !bodyImageUrl;

    if (noData) {
      res.status(403).send("No data was provided");
      return;
    }

    if (weight) lastStats.weight = weight;
    if (height) lastStats.height = height;
    if (fatPercentage) lastStats.fatPercentage = fatPercentage;
    if (musclesMass) lastStats.musclesMass = musclesMass;
    if (bodyImageUrl) lastStats.bodyImageUrl = bodyImageUrl;

    await userStats.save();

    res.status(200).send("The last stats were updated");
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const setRanking: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { selfRank } = req.body;

    validationErrorsHandler(req);

    const physicalStats = (await PhysicalStats.findOne({
      user: userId,
    })) as PhysicalStatsType;

    if (!physicalStats) {
      res
        .status(403)
        .send(
          "Something went wrong... Couldn't find stats that match the user"
        );
      return;
    }

    physicalStats.rank = selfRank;
    await physicalStats.save();

    res.status(201).send("Ranking the user successfully");
    return;
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};
