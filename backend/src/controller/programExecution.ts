import { RequestHandler } from "express";

//helpers
import { catchErrorHandler } from "../utils/helpers/Errors/catchErrorsHandler";
import { validationErrorsHandler } from "../utils/helpers/Errors/validationErrors";

//models
import User from "../models/User";
import Workout from "../models/Workout";
import ProgramExecution from "../models/ProgramExecution";
import Program from "../models/Program";
import { Program as ProgramType } from "./program";
import {
  getAllExecutions,
  getExecutionsOfMonth,
  getExecutionsOfWeek,
  getExecutionsOfYear,
} from "../utils/helpers/programExecution/progExecHelpers";

export const getExercisesByDate: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const date = req.params.date || new Date();

    validationErrorsHandler(req);

    const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(date)
    ); //get the day as a name

    const user = await User.findById(userId);

    //TODO add program logic to program endpoints
    if (!user.hasProgram) {
      res
        .status(401)
        .send(
          "You need to create a full program before you declare about execution"
        );
      return;
    }

    const program = await Program.findOne({ user: userId });

    const programOfDay = program.program.find(
      (program: ProgramType) => program.day === day
    ) as ProgramType;

    if (programOfDay.restDay) {
      res
        .status(200)
        .send("This is a rest day, You have no exercises to complete!");
      return;
    }
    const workout = await Workout.findById(programOfDay.workout);

    const exercises = workout.exercises.map(
      (exercise: { name: string }) => exercise.name
    );

    res.status(200).json({ exercises });
    return;
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const declareAnExecution: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { exercises } = req.body;
    const date = req.params.date || new Date();

    validationErrorsHandler(req);

    const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      new Date(date)
    ); //get the day as a name

    const user = await User.findById(userId);

    if (!user.hasProgram) {
      res
        .status(401)
        .send(
          "You need to create a full program before you declare about execution"
        );
      return;
    }

    const program = await Program.findOne({ user: userId });

    const programOfDay = program.program.find(
      (program: ProgramType) => program.day === day
    ) as ProgramType;

    const programExecution = await ProgramExecution.findOne({ user: userId });

    if (programOfDay.restDay) {
      const currentExecution = {
        programId: programOfDay._id,
        date,
        executionRate: 100,
        grade: 10,
      };
      programExecution.executions.push(currentExecution);
      user.grade += currentExecution.grade;
    } else {
      const numberOfExercises = Object.keys(exercises).length;
      const valueOfEachExercise = 100 / numberOfExercises;
      let numberOfExercisesDone = 0;

      for (let exercise in exercises) {
        if (exercises[exercise] === true) numberOfExercisesDone++;
      }

      const executionRate = Math.ceil(
        valueOfEachExercise * numberOfExercisesDone
      );
      const grade = Math.ceil(executionRate / 10);

      const execution = {
        programId: programOfDay._id,
        date,
        executionRate,
        grade,
      };

      programExecution.executions.push(execution);
      user.grade += grade;
    }
    await programExecution.save();
    await user.save();

    res.status(201).send("Wonderful! Your execution has been declared");
    return;
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const getSingleExecution: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const stringDate = req.params.date;

    const programExecution = await ProgramExecution.findOne({ user: userId });

    if (programExecution.executions.length === 0) {
      res.status(401).send("User doesn't has any declared executions");
      return;
    }

    const date = new Date(stringDate);

    const requestedExecution = programExecution.executions.find(
      (execution: { date: Date }) =>
        execution.date.toISOString() === date.toISOString()
    );

    if (!requestedExecution) {
      res.status(401).send("No execution was found at this date");
      return;
    }

    res.status(200).json(requestedExecution);
    return;
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const getExecutionsByRange: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { date, range } = req.body;

    const user = await User.findById(userId);

    if (!user.hasProgram) {
      res.status(401).send("This user doesn't has a full program yet");
      return;
    }

    const dateObj = new Date(date);

    let executions: any[];

    switch (range) {
      case "week":
        executions = await getExecutionsOfWeek(dateObj, userId);
        break;
      case "month":
        executions = await getExecutionsOfMonth(dateObj, userId);
        break;
      case "year":
        executions = await getExecutionsOfYear(dateObj, userId);
        break;
      case "all":
        executions = await getAllExecutions(userId);
        break;
      default:
        executions = [];
    }

    if (executions.length === 0) {
      res.status(401).send("No Executions were found in this dates");
      return;
    }

    res.status(200).json(executions);
    return;
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
