import { RequestHandler } from 'express';
import Goals, { GoalsType } from '../models/Goals';
import User, { UserType } from '../models/User';
import { catchErrorHandler } from '../utils/helpers/Errors/catchErrorsHandler';
import { validationErrorsHandler } from '../utils/helpers/Errors/validationErrors';

export const createGoal: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);
    const { userId } = req;
    const { basicGoal, weight, fatPercentage, musclesMass } = req.body;

    const user = (await User.findById(userId)) as UserType;

    if (user.hasGoals) {
      res.status(403).send('User already created goals');
      return;
    }

    if (basicGoal === 'lose fat' && !fatPercentage) {
      res
        .status(403)
        .send(
          'If you want to lose fat you need to provide your fat percentage'
        );
      return;
    }

    if (basicGoal === 'increase muscles mass' && !musclesMass) {
      res
        .status(403)
        .send(
          'If you want to increase muscles mass you need to provide your muscles mass'
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
    }) as GoalsType;
    await userGoals.save();

    user.hasGoals = true;
    user.save();

    res.status(201).send('Goals created successfully');
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const changeBasicGoal: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);
    const { userId } = req;
    const { fatPercentage, musclesMass } = req.body;

    const userGoals = (await Goals.findOne({ user: userId })) as GoalsType;

    if (!userGoals) {
      res.status(403).send('Goals have not created yet for this user');
      return;
    }

    let basicGoal = userGoals.basicGoal;
    const noFatPercentageBefore = !userGoals.detailGoals.fatPercentage;
    const noMusclesMassBefore = !userGoals.detailGoals.musclesMass;

    if (basicGoal === 'increase muscles mass') {
      if (noFatPercentageBefore && !fatPercentage) {
        res
          .status(403)
          .send(
            'If you want to lose fat you need to provide your fat percentage'
          );
        return;
      }
      if (noFatPercentageBefore) {
        userGoals.detailGoals.fatPercentage = fatPercentage;
      }
      basicGoal = 'lose fat';
    } else {
      if (noMusclesMassBefore && !musclesMass) {
        res
          .status(403)
          .send(
            'If you want to increase muscles mass you need to provide your muscles mass'
          );
        return;
      }
      if (noMusclesMassBefore) {
        userGoals.detailGoals.musclesMass = musclesMass;
      }
      basicGoal = 'increase muscles mass';
    }

    userGoals.basicGoal = basicGoal;
    await userGoals.save();

    res.status(201).send('Goals updated');
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const changeGoals: RequestHandler = async (req, res, next) => {
  try {
    validationErrorsHandler(req);
    const { userId } = req;

    const { weight, fatPercentage, musclesMass } = req.body;

    const userGoals = (await Goals.findOne({ user: userId })) as GoalsType;

    if (!userGoals) {
      res.status(403).send('Goals have not created yet for this user');
      return;
    }

    if (!weight && !fatPercentage && !musclesMass) {
      res.status(403).send('No parameters were provided');
      return;
    }

    if (weight) userGoals.detailGoals.weight = weight;
    if (fatPercentage) userGoals.detailGoals.fatPercentage = fatPercentage;
    if (musclesMass) userGoals.detailGoals.musclesMass = musclesMass;

    await userGoals.save();

    res.status(201).send('Goals updated');
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const getGoals: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;

    const userGoals = (await Goals.findOne({ user: userId })) as GoalsType;

    if (!userGoals) {
      res.status(403).send('Goals have not created yet for this user');
      return;
    }
    const { basicGoal, detailGoals } = userGoals;

    res.status(201).json({ basicGoal, detailGoals });
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};
