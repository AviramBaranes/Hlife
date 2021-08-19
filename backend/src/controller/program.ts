import { RequestHandler } from "express";
import { Schema } from "mongoose";

import Workout from "../models/Workout";
import Program from "../models/Program";
import { catchErrorHandler } from "../utils/helpers/Errors/catchErrorsHandler";
import { validationErrorsHandler } from "../utils/helpers/Errors/validationErrors";
import User from "../models/User";

export interface Program {
  day: string;
  restDay: boolean;
  workout?: Schema.Types.ObjectId;
}

const initialProgramList = [
  { day: "Sunday" },
  { day: "Monday" },
  { day: "Tuesday" },
  { day: "Wednesday" },
  { day: "Thursday" },
  { day: "Friday" },
  { day: "Saturday" },
] as Program[];

export const createProgram: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { day } = req.params;
    const { trainingDayName } = req.body;

    validationErrorsHandler(req);

    let workout;
    if (trainingDayName) {
      workout = await Workout.findOne({ trainingDayName, user: userId });
    }

    if (!workout && trainingDayName) {
      res
        .status(401)
        .send(
          "Couldn't find a workout with this name, make sure you create one first"
        );
      return;
    }

    const program = await Program.findOne({ user: userId });

    //create new model
    if (program.program.length === 0) {
      const programList = [...initialProgramList] as Program[];

      const programDayIndex = programList.findIndex(
        (program) => program.day === day
      );

      const programDay = programList[programDayIndex];

      if (workout) {
        programDay.workout = workout._id;
        programDay.restDay = false;
      } else {
        programDay.restDay = true;
      }

      programList[programDayIndex] = programDay;

      program.program = programList;
      await program.save();
    }
    //edit existing model
    else {
      const programList = program.program as Program[];

      const programDayIndex = programList.findIndex(
        (program) => program.day === day
      );

      const isDayAlreadySet =
        programList[programDayIndex].restDay ||
        programList[programDayIndex].workout;

      if (isDayAlreadySet) {
        res.status(401).send("This day already has a program");
        return;
      }

      const programDay = programList[programDayIndex];

      if (workout) {
        programDay.workout = workout._id;
        programDay.restDay = false;
      } else {
        programDay.restDay = true;
      }

      programList[programDayIndex] = programDay;

      program.program = programList;
      await program.save();

      let programFull = true;
      program.program.forEach(
        (program: Program, _: number, programs: Program[]) => {
          if (programs.length !== 7) {
            programFull = false;
            return;
          }
          if (!program.restDay && !program.workout) programFull = false;
        }
      );

      if (programFull) {
        const user = await User.findById(userId);
        user.hasProgram = true;
        await user.save();
      }
    }

    res.status(201).send("Program added successfully");
    return;
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const getAllPrograms: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;

    const program = await Program.findOne({ user: userId });

    if (!program) {
      res.status(401).send("Something wrong... this user has no program");
      return;
    }

    const programFull = program.program.every(
      (program: Program) => program.restDay || program.workout
    );

    if (!programFull) {
      res
        .status(401)
        .send(
          "You need to create a program for each day in order to request them"
        );
      return;
    }

    res.status(200).json(program.program);
    return;
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const getProgram: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { day } = req.params;

    validationErrorsHandler(req);

    const program = await Program.findOne({ user: userId });

    if (program.program.length === 0) {
      res.status(401).send("No program was found for the user");
      return;
    }

    const requestedProgram = program.program.find(
      (program: { day: string }) => program.day === day
    );

    const isProgramAlreadySet =
      requestedProgram.restDay || requestedProgram.workout;

    if (!isProgramAlreadySet) {
      res
        .status(401)
        .send("No program was set at this day yet, make sure you create one");
      return;
    }

    res.status(200).json(requestedProgram);
    return;
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const changeProgram: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { day } = req.params;
    const { trainingDayName, restDay } = req.body;

    validationErrorsHandler(req);

    if (trainingDayName && restDay) {
      res.status(401).send("You can't set a workout day as a rest day");
      return;
    }

    const program = await Program.findOne({ user: userId });

    if (!program) {
      res.status(401).send("No program was found for the user");
      return;
    }

    const requestedProgram = {
      ...program.program.find(
        (program: { day: string }) => program.day === day
      ),
    };

    if (Object.keys(requestedProgram).length === 0) {
      res
        .status(401)
        .send(
          "No program has made for this user. Make sure you create one first"
        );
      return;
    }

    const isProgramAlreadySet =
      requestedProgram.restDay || requestedProgram.workout;

    if (!isProgramAlreadySet) {
      res
        .status(401)
        .send("No program was set at this day yet, make sure you create one");
      return;
    }

    let workout;
    if (trainingDayName) {
      workout = await Workout.findOne({ user: userId, trainingDayName });
    }

    if (!workout && trainingDayName) {
      res
        .status(401)
        .send(
          "Couldn't find a workout with this name, make sure you create one first"
        );
      return;
    }

    if (workout) requestedProgram.workout = workout._id;
    if (requestedProgram.workout && restDay) delete requestedProgram.workout;
    requestedProgram.restDay = restDay;

    const requestedProgramIndex = program.program.findIndex(
      (program: { day: string }) => program.day === day
    );

    program.program[requestedProgramIndex] = { ...requestedProgram };
    await program.save();

    res.status(201).send("Program updated successfully");
    return;
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
