import { RequestHandler } from 'express';

import Workout, { WorkoutType } from '../models/Workout';
import User, { UserType } from '../models/User';
import { catchErrorHandler } from '../utils/helpers/Errors/catchErrorsHandler';
import { validationErrorsHandler } from '../utils/helpers/Errors/validationErrors';

interface UserWithWorkout extends UserType {
  workouts: WorkoutType[];
}

export const createWorkout: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { trainingDayName, name, description, exercises, time } = req.body;

    validationErrorsHandler(req);

    const user = (await User.findById(userId).populate(
      'workouts'
    )) as UserWithWorkout;

    let isNamesValid = true;

    if (!user.workouts) {
      user.workouts = [];
    }

    user.workouts.forEach((workout) => {
      const isNameIdentical = workout.name === name;
      const isTrainingDayNameIdentical =
        workout.trainingDayName === trainingDayName;

      if (isNameIdentical || isTrainingDayNameIdentical) {
        if (workout.trainingDayName !== 'aerobic') {
          isNamesValid = false;
        }
      }
    });

    if (!isNamesValid) {
      res.status(403).send('Each workout need to have a unique name');
      return;
    }

    const workout = new Workout({
      user: userId,
      trainingDayName,
      name,
      exercises,
    }) as WorkoutType;

    if (description) workout.description = description;
    if (time) workout.time = time;
    await workout.save();

    user.workouts.push(workout._id);
    await user.save();

    return res
      .status(201)
      .send(`${trainingDayName}-workout created successfully`);
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const changeHasAllWorkout: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;

    const user = (await User.findById(userId)) as UserType;

    user.hasAllWorkouts = true;
    await user.save();

    res.status(201).send('User has now created all workout!');
    return;
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const getWorkoutByName: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { trainingDayName } = req.query;

    validationErrorsHandler(req);

    const workout = (await Workout.findOne({
      user: userId,
      trainingDayName,
    })) as WorkoutType;

    if (!workout) {
      res
        .status(403)
        .send(
          "couldn't find workout, make sure you create a workout with this name first."
        );
      return;
    }

    res.status(200).json(workout);
    return;
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const getAllWorkouts: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const workouts = await Workout.find({ user: userId });

    if (!workouts) {
      res
        .status(403)
        .send('You need to create all workouts and then request for them.');
      return;
    }
    res.status(200).json(workouts);
    return;
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const { workoutId } = req.params;

    const workout = (await Workout.findById(workoutId)) as WorkoutType;

    if (!workout) {
      res.status(403).send('No workout with this id');
      return;
    }

    res.status(200).json(workout);
    return;
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const changeWorkout: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { trainingDayName, name, description, exercises, time } = req.body;

    validationErrorsHandler(req);

    const workout = (await Workout.findOne({
      user: userId,
      trainingDayName,
    })) as WorkoutType;

    if (!workout) {
      res
        .status(403)
        .send(
          "couldn't find workout, make sure you create a workout with this name first."
        );
      return;
    }

    if (!name && !description && !exercises) {
      res
        .status(403)
        .send('You need to provide data in order to change the workout');
      return;
    }

    if (name) workout.name = name;
    if (description) workout.description = description;
    if (exercises) workout.exercises = exercises;
    if (time) workout.time = time;

    await workout.save();

    res.status(201).send('Workout changed successfully');
    return;
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const deleteWorkout: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { name } = req.params;

    validationErrorsHandler(req);

    const workout = (await Workout.findOneAndDelete({
      user: userId,
      name,
    })) as WorkoutType;

    if (!workout) {
      res
        .status(403)
        .send(
          "couldn't find workout, make sure you create a workout with this name first."
        );
      return;
    }

    res.status(200).send('Workout deleted successfully');
    return;
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};
