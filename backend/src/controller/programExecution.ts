import { RequestHandler } from 'express';

//helpers
import { catchErrorHandler } from '../utils/helpers/Errors/catchErrorsHandler';
import { validationErrorsHandler } from '../utils/helpers/Errors/validationErrors';

//models
import User, { UserType } from '../models/User';
import Workout, { WorkoutType } from '../models/Workout';
import ProgramExecution, { ProgramExecType } from '../models/ProgramExecution';
import Program, { ProgramType } from '../models/Program';
import {
  getAllExecutions,
  getExecutionsOfMonth,
  getExecutionsOfWeek,
  getExecutionsOfYear,
} from '../utils/helpers/programExecution/progExecHelpers';

export const getExercisesByDate: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const date = req.params.date || new Date();

    validationErrorsHandler(req);

    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
      new Date(date)
    ); //get the day as a name

    const user = (await User.findById(userId)) as UserType;

    //TODO add program logic to program endpoints
    if (!user.hasProgram) {
      res
        .status(403)
        .send(
          'You need to create a full program before you declare about execution'
        );
      return;
    }

    const program = (await Program.findOne({ user: userId })) as ProgramType;

    const programOfDay = program.program.find((program) => program.day === day);

    if (programOfDay!.restDay) {
      res
        .status(200)
        .send('This is a rest day, You have no exercises to complete!');
      return;
    }
    const workout = (await Workout.findById(
      programOfDay!.workout
    )) as WorkoutType;

    const { name, trainingDayName, time, exercises } = workout;

    res.status(200).json({ exercises, name, trainingDayName, time });
    return;
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const declareAnExecution: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { exercises, isAerobic } = req.body;
    const date = req.params.date || new Date();

    validationErrorsHandler(req);

    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
      new Date(date)
    ); //get the day as a name

    const user = (await User.findById(userId)) as UserType;

    if (!user.hasProgram) {
      res
        .status(403)
        .send(
          'You need to create a full program before you declare about execution'
        );
      return;
    }

    const program = (await Program.findOne({ user: userId })) as ProgramType;

    const programOfDay = program.program.find((program) => program.day === day);

    const programExecution = await ProgramExecution.findOne({ user: userId });
    let modifiedDate: Date | string = date;
    if (!req.params.date) {
      modifiedDate = new Date(new Date(date).setHours(0, 0, 0, 0));
    }
    if (programOfDay!.restDay || isAerobic) {
      const currentExecution = {
        programId: programOfDay!._id,
        date: modifiedDate,
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
        programId: programOfDay!._id,
        date: modifiedDate,
        executionRate,
        grade,
      };

      programExecution.executions.push(execution);
      user.grade += grade;
    }
    await programExecution.save();
    await user.save();

    res.status(201).send('Wonderful! Your execution has been declared');
    return;
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const getSingleExecution: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const stringDate = req.params.date;

    validationErrorsHandler(req);

    const programExecution = (await ProgramExecution.findOne({
      user: userId,
    })) as ProgramExecType;

    if (programExecution.executions.length === 0) {
      res.status(403).send("User doesn't has any declared executions");
      return;
    }

    const date = new Date(stringDate);

    const requestedExecution = programExecution.executions.find(
      (execution: { date: Date }) =>
        execution.date.toLocaleDateString() === date.toLocaleDateString()
    );

    if (!requestedExecution) {
      res.status(403).send('No execution was found at this date');
      return;
    }

    res.status(200).json(requestedExecution);
    return;
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

export const getExecutionsByRange: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req;
    const { date, range } = req.params;

    validationErrorsHandler(req);

    const user = (await User.findById(userId)) as UserType;

    if (!user.hasProgram) {
      res.status(403).send("This user doesn't has a full program yet");
      return;
    }

    const dateObj = new Date(date);

    let executions: any[];

    switch (range) {
      case 'week':
        executions = await getExecutionsOfWeek(dateObj, userId);
        break;
      case 'month':
        executions = await getExecutionsOfMonth(dateObj, userId);
        break;
      case 'year':
        executions = await getExecutionsOfYear(dateObj, userId);
        break;
      case 'all':
        executions = await getAllExecutions(userId);
        break;
      default:
        executions = [];
    }

    if (executions.length === 0) {
      res.status(204).send('No Executions were found in this dates');
      return;
    }

    res.status(200).json(executions);
    return;
  } catch (err: any) {
    catchErrorHandler(err, next);
  }
};

// export const createDummyData: RequestHandler = async (req, res, next) => {
//   try {
//     const { userId } = req;

//     const dates = [
//       '10-01-2021',
//       '10-02-2021',
//       '10-03-2021',
//       '10-04-2021',
//       '10-05-2021',
//       '10-06-2021',
//       '10-07-2021',
//       '10-08-2021',
//       '10-09-2021',
//       '10-10-2021',
//       '10-11-2021',
//       '10-12-2021',
//       '10-13-2021',
//       '10-14-2021',
//       '10-15-2021',
//       '10-16-2021',
//       '10-17-2021',
//       '10-18-2021',
//       '10-19-2021',
//       '10-20-2021',
//       '10-21-2021',
//       '10-22-2021',
//       '10-23-2021',
//       '10-24-2021',
//       '10-25-2021',
//       '10-26-2021',
//       '10-27-2021',
//       '10-28-2021',
//       '10-29-2021',
//       '10-30-2021',
//     ];

//     let counter = 0;

//     // validationErrorsHandler(req);

//     //get the day as a name

//     // const user = (await User.findById(userId)) as UserType;

//     // const program = (await Program.findOne({ user: userId })) as ProgramType;

//     // const programOfDay = program.program.find((program) => program.day === day);

//     const programExecution = await ProgramExecution.findOne({ user: userId });

//     while (counter < 29) {
//       const date = new Date(dates[counter]);
//       console.log(date);
//       let rate = Math.random() * 120;
//       const executionRate = rate > 100 ? 100 : rate;

//       const execution = {
//         programId: '6176790215381809aca95aaf',
//         date,
//         executionRate,
//       };

//       programExecution.executions.push(execution);
//       counter++;
//     }

//     await programExecution.save();

//     res.status(201).send('Wonderful! Your execution has been declared');
//     return;
//   } catch (err: any) {
//     catchErrorHandler(err, next);
//   }
// };
