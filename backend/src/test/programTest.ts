import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import { expect } from 'chai';
import sinon, { SinonStub, stub } from 'sinon';

import * as programController from '../controller/program';
import createCustomResponseObj, {
  ResponseCustomObject,
} from '../utils/helpers/forTests/responseDefaultObj';

import Workout from '../models/Workout';
import Program from '../models/Program';
import User from '../models/User';
import Goals from '../models/Goals';
import PhysicalStats from '../models/PhysicalStats';

describe('get program recommendation endpoint test ', () => {
  const req = { userId: '123' };
  const res = createCustomResponseObj();
  let stubedUserModel: SinonStub,
    stubedGoalsModel: SinonStub,
    stubedStatsModel: SinonStub;
  beforeEach(() => {
    stubedGoalsModel = sinon.stub(Goals, 'findOne');
    stubedUserModel = sinon.stub(User, 'findById');
    stubedStatsModel = sinon.stub(PhysicalStats, 'findOne');
  });

  afterEach(() => {
    stubedGoalsModel.restore();
    stubedUserModel.restore();
    stubedStatsModel.restore();
  });

  it('should send an error response if no basic goal was defined', async () => {
    stubedGoalsModel.returns({ basicGoal: false });

    await programController.getRecommendationProgram(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      'User need to create goals in order to get a recommendation program'
    );
  });

  it('should send the correct recommendation (female gain muscle pro)', async () => {
    stubedUserModel.returns({ gender: 'female' });
    stubedGoalsModel.returns({ basicGoal: 'increase muscles mass' });
    stubedStatsModel.returns({ rank: 'Pro' });

    await programController.getRecommendationProgram(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(200);
    expect(res.jsonObj[0]).eql({ workoutName: 'AB', timesPerWeek: 4 });
  });

  it('should send the correct recommendation (female gain muscle)', async () => {
    stubedUserModel.returns({ gender: 'female' });
    stubedGoalsModel.returns({ basicGoal: 'increase muscles mass' });
    stubedStatsModel.returns({ rank: 'Intermediate' });

    await programController.getRecommendationProgram(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(200);
    expect(res.jsonObj[0]).eql({ workoutName: 'FB', timesPerWeek: 2 });
  });

  it('should send the correct recommendation (female lose fat pro)', async () => {
    stubedUserModel.returns({ gender: 'female' });
    stubedGoalsModel.returns({ basicGoal: 'lose fat' });
    stubedStatsModel.returns({ rank: 'Pro' });

    await programController.getRecommendationProgram(
      req as any,
      res as any,
      () => {}
    );
    expect(res.statusCode).equal(200);
    expect(res.jsonObj[0]).eql({ workoutName: 'aerobic', timesPerWeek: 4 });
    expect(res.jsonObj[1]).eql({ workoutName: 'FB', timesPerWeek: 1 });
  });

  it('should send the correct recommendation (female lose fat)', async () => {
    stubedUserModel.returns({ gender: 'female' });
    stubedGoalsModel.returns({ basicGoal: 'lose fat' });
    stubedStatsModel.returns({ rank: 'Advanced' });

    await programController.getRecommendationProgram(
      req as any,
      res as any,
      () => {}
    );
    expect(res.statusCode).equal(200);
    expect(res.jsonObj[0]).eql({ workoutName: 'aerobic', timesPerWeek: 4 });
  });

  it('should send the correct recommendation (male lose fat pro)', async () => {
    stubedUserModel.returns({ gender: 'male' });
    stubedGoalsModel.returns({ basicGoal: 'lose fat' });
    stubedStatsModel.returns({ rank: 'Pro' });

    await programController.getRecommendationProgram(
      req as any,
      res as any,
      () => {}
    );
    expect(res.statusCode).equal(200);
    expect(res.jsonObj[0]).eql({ workoutName: 'aerobic', timesPerWeek: 4 });
    expect(res.jsonObj[1]).eql({ workoutName: 'FB', timesPerWeek: 1 });
  });

  it('should send the correct recommendation (male lose fat)', async () => {
    stubedUserModel.returns({ gender: 'male' });
    stubedGoalsModel.returns({ basicGoal: 'lose fat' });
    stubedStatsModel.returns({ rank: 'Beginner' });

    await programController.getRecommendationProgram(
      req as any,
      res as any,
      () => {}
    );
    expect(res.statusCode).equal(200);
    expect(res.jsonObj[0]).eql({ workoutName: 'aerobic', timesPerWeek: 2 });
  });

  it('should send the correct recommendation (male gain muscle)', async () => {
    stubedUserModel.returns({ gender: 'male' });
    stubedGoalsModel.returns({ basicGoal: 'increase muscles mass' });
    stubedStatsModel.returns({ rank: 'Pro' });

    await programController.getRecommendationProgram(
      req as any,
      res as any,
      () => {}
    );
    expect(res.statusCode).equal(200);
    expect(res.jsonObj[0]).eql({ workoutName: 'ABCD', timesPerWeek: 4 });
  });
});

describe('create program endpoint test', () => {
  const res = createCustomResponseObj();
  const req = {
    userId: '61196b0a38af7615d0aed56e',
    body: { trainingDayName: 'A' } as any,
    params: { day: 'Sunday' },
  };
  let stubedWorkoutModel: SinonStub;
  let stubedProgramModel: SinonStub;
  beforeEach(() => {
    stubedWorkoutModel = sinon.stub(Workout, 'findOne');
    stubedProgramModel = sinon.stub(Program, 'findOne');
  });

  it('Should send error response if workout was not found', async () => {
    stubedWorkoutModel.returns(false);

    await programController.createProgram(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "Couldn't find a workout with this name, make sure you create one first"
    );
  });

  it('should create new program model with a list of all days + a rest day', async () => {
    stubedProgramModel.returns({ program: [], save: sinon.spy() });
    stubedWorkoutModel.returns(false);

    delete req.body.trainingDayName;

    await programController.createProgram(req as any, res as any, () => {});

    const program = await Program.findOne();

    expect(program.save.called).equal(true);
    expect(program.program[0].day).equal('Sunday');
    expect(program.program[0].restDay).equal(true);
    expect(program.program[1].day).equal('Monday');
    expect(program.program).length(7);
  });

  it('should create new program model with a list of all days + a workout day', async () => {
    stubedProgramModel.returns({ program: [], save: sinon.spy() });
    stubedWorkoutModel.returns({ _id: '51196b0a38af7615d0aed56e' });

    req.body.trainingDayName = 'A';

    await programController.createProgram(req as any, res as any, () => {});

    const program = await Program.findOne();

    expect(program.save.called).equal(true);
    expect(program.program[0].day).equal('Sunday');
    expect(program.program[0].workout.toString()).equal(
      '51196b0a38af7615d0aed56e'
    );
    expect(program.program[1].day).equal('Monday');
    expect(program.program).length(7);
  });

  it('should send a success response', () => {
    expect(res.statusCode).equal(201);
    expect(res.msg).equal('Program added successfully');
  });

  it('should send an error response if day already has a program (restDay)', async () => {
    stubedProgramModel.returns({
      program: [{ day: 'Sunday', restDay: true }, { day: 'Monday' }],
    });
    stubedWorkoutModel.returns(false);

    delete req.body.trainingDayName;

    await programController.createProgram(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('This day already has a program');
  });

  it('should send an error response if day already has a program (workout)', async () => {
    stubedProgramModel.returns({
      program: [{ day: 'Sunday', workout: 'id' }, { day: 'Monday' }],
    });
    stubedWorkoutModel.returns(false);

    delete req.body.trainingDayName;

    await programController.createProgram(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('This day already has a program');
  });

  it('should create new program day with a workout', async () => {
    req.body.trainingDayName = 'A';

    stubedProgramModel.returns({
      save: sinon.spy(),
      program: [{ day: 'Sunday' }, { day: 'Monday' }],
    });
    stubedWorkoutModel.returns({ _id: '51196b0a38af7615d0aed56e' });

    await programController.createProgram(req as any, res as any, () => {});

    const program = await Program.findOne();

    expect(program.save.called).equal(true);
    expect(program.program[0].workout.toString()).equal(
      '51196b0a38af7615d0aed56e'
    );
    expect(program.program[0].restDay).equal(false);
  });
  it('should create new program day with a restDay', async () => {
    req.params.day = 'Monday';
    delete req.body.trainingDayName;

    stubedProgramModel.returns({
      save: sinon.spy(),
      program: [{ day: 'Sunday' }, { day: 'Monday' }],
    });

    await programController.createProgram(req as any, res as any, () => {});

    const program = await Program.findOne();

    expect(program.save.called).equal(true);
    expect(program.program[1].workout).equal(undefined);
    expect(program.program[1].restDay).equal(true);
  });

  it('should send a success response', () => {
    expect(res.statusCode).equal(201);
    expect(res.msg).equal('Program added successfully');
  });

  it('should update user if program is full', async () => {
    req.params.day = 'Sunday';
    stubedProgramModel.returns({
      save: sinon.spy(),
      program: [
        { day: 'Sunday' },
        { day: '2', restDay: true },
        { day: '3', restDay: true },
        { day: '4', restDay: true },
        { day: '5', restDay: true },
        { day: '6', restDay: true },
        { day: '7', restDay: true },
      ],
    });
    const stubedUser = sinon.stub(User, 'findById');
    stubedUser.returns({ hasProgram: false, save: sinon.spy() });

    await programController.createProgram(req as any, res as any, () => {});

    const user = User.findById({});

    expect(user.save.called).equal(true);
    expect(user.hasProgram).equal(true);

    stubedUser.restore();
  });

  afterEach(() => {
    stubedWorkoutModel.restore();
    stubedProgramModel.restore();
  });
});

describe('get all programs endpoint test', () => {
  const req = { userId: '123' };
  const res = createCustomResponseObj();
  let stubedProgramModel: SinonStub;

  beforeEach(() => {
    stubedProgramModel = sinon.stub(Program, 'findOne');
  });

  it('should send an error response if no program was found', async () => {
    stubedProgramModel.returns({
      populate() {
        return false;
      },
    });

    await programController.getAllPrograms(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('Something wrong... this user has no program');
  });

  it('should send an error response if program is not full', async () => {
    stubedProgramModel.returns({
      populate() {
        return { program: [{ day: 'a' }, { day: 'b' }] };
      },
    });

    await programController.getAllPrograms(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      'You need to create a program for each day in order to request them'
    );
  });

  it('should send a success response with the full program', async () => {
    stubedProgramModel.returns({
      populate() {
        return {
          program: [
            { day: 'a', restDay: true },
            { restDay: false, workout: 'id', day: 'b' },
          ],
        };
      },
    });

    await programController.getAllPrograms(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);
    expect(res.jsonObj[0]).eql({ day: 'a', restDay: true });
    expect(res.jsonObj[1]).eql({ restDay: false, workout: 'id', day: 'b' });
  });

  afterEach(() => {
    stubedProgramModel.restore();
  });
});

describe('get program endpoint test', () => {
  const res = createCustomResponseObj();
  const req = {
    userId: '61196b0a38af7615d0aed56e',
    params: { day: 'Sunday' },
  };
  let stubedProgramModel: SinonStub;
  beforeEach(() => {
    stubedProgramModel = sinon.stub(Program, 'findOne');
  });

  it('Should send an error response if workout was not found', async () => {
    stubedProgramModel.returns({ program: [] });

    await programController.getProgram(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('No program was found for the user');
  });

  it('should send an error response if there is no program as made yet', async () => {
    stubedProgramModel.returns({ program: [{ day: 'Sunday' }] });

    await programController.getProgram(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      'No program was set at this day yet, make sure you create one'
    );
  });

  it('should send a success response with the requested program', async () => {
    stubedProgramModel.returns({
      program: [
        { day: 'no' },
        { day: 'Sunday', restDay: false, workout: '_id' },
      ],
    });

    await programController.getProgram(req as any, res as any, () => {});

    const expectedResponseData = {
      day: 'Sunday',
      restDay: false,
      workout: '_id',
    };

    expect(res.statusCode).equal(200);
    expect(res.jsonObj).eql(expectedResponseData);
  });

  afterEach(() => {
    stubedProgramModel.restore();
  });
});

describe('change program endpoint test', () => {
  const res = createCustomResponseObj();
  const req = {
    userId: '61196b0a38af7615d0aed56e',
    body: { trainingDayName: 'A', restDay: true } as any,
    params: { day: 'Sunday' },
  };
  let stubedProgramModel: SinonStub;
  let stubedWorkoutModel: SinonStub;
  beforeEach(() => {
    stubedProgramModel = sinon.stub(Program, 'findOne');
    stubedWorkoutModel = sinon.stub(Workout, 'findOne');
  });

  it('Should send an error response if the request contains a rest day and a workout', async () => {
    stubedProgramModel.returns(false);

    await programController.changeProgram(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal("You can't set a workout day as a rest day");
  });

  it('Should send an error response if program was not found', async () => {
    req.body.restDay = false;
    stubedProgramModel.returns(false);

    await programController.changeProgram(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('No program was found for the user');
  });

  it('should send an error response if there is no program as made yet', async () => {
    stubedProgramModel.returns({ program: [{ day: 'Sunday' }] });

    await programController.changeProgram(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      'No program was set at this day yet, make sure you create one'
    );
  });

  it('Should send error response if workout was not found', async () => {
    stubedWorkoutModel.returns(false);
    stubedProgramModel.returns({ program: [{ day: 'Sunday', restDay: true }] });

    await programController.changeProgram(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "Couldn't find a workout with this name, make sure you create one first"
    );
  });

  it('Should set a new workout', async () => {
    stubedWorkoutModel.returns({ _id: '61196b0a38af7615d0aed56e' });
    stubedProgramModel.returns({
      save: sinon.spy(),
      program: [{ day: 'Sunday', restDay: true }],
    });

    await programController.changeProgram(req as any, res as any, () => {});

    const program = await Program.findOne();
    const testingProgram = program.program[0];

    expect(testingProgram.workout.toString()).equal('61196b0a38af7615d0aed56e');
    expect(testingProgram.restDay).equal(false);
    expect(program.save.called).equal(true);
  });

  it('should delete the workout if rest day is true', async () => {
    req.body.restDay = true;
    delete req.body.trainingDayName;

    stubedProgramModel.returns({
      save: sinon.spy(),
      program: [{ day: 'Sunday', workout: 'exist' }],
    });

    await programController.changeProgram(req as any, res as any, () => {});

    const program = await Program.findOne();
    const testingProgram = program.program[0];

    expect(testingProgram.workout).equal(undefined);
    expect(testingProgram.restDay).equal(true);
    expect(program.save.called).equal(true);
  });

  it('should set a success response', () => {
    expect(res.statusCode).equal(201);
    expect(res.msg).equal('Program updated successfully');
  });

  afterEach(() => {
    stubedProgramModel.restore();
    stubedWorkoutModel.restore();
  });
});
