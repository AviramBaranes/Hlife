import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';

import * as workoutController from '../controller/workout';
import User from '../models/User';
import Workout from '../models/Workout';

import createCustomResponseObj from '../utils/helpers/forTests/responseDefaultObj';
import { ObjectId } from 'mongoose';

describe('create workout tests', () => {
  const res = createCustomResponseObj();
  const req = { userId: '61196b0a38af7615d0aed56e', body: {} as any };
  let stubedUser: sinon.SinonStub;

  before(async () => {
    stubedUser = sinon.stub(User, 'findById');
  });

  it('should return error response if name already taken', async () => {
    req.body.trainingDayName = 'A';
    req.body.name = 'chest';

    stubedUser.returns({
      populate() {
        return {
          workouts: [
            { name: '-', trainingDayName: '-' },
            { name: 'chest', trainingDayName: '-' },
          ],
        };
      },
    });

    await workoutController.createWorkout(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('Each workout need to have a unique name');
  });

  it('should create a workout model', async () => {
    req.body.description = 'description';
    req.body.exercises = [{ name: 'name', sets: 1, reps: 1 }];

    const stubedWorkout = sinon.stub(Workout.prototype, 'save');

    stubedUser.returns({
      populate() {
        return { workouts: [{ name: '-', trainingDayName: '-' }] };
      },
    });

    await workoutController.createWorkout(req as any, res as any, () => {});

    const newWorkoutArgs = stubedWorkout.firstCall.thisValue;

    expect(newWorkoutArgs.user).to.be.an('object');
    expect(newWorkoutArgs.trainingDayName).equal('A');
    expect(newWorkoutArgs.name).equal('chest');
    expect(newWorkoutArgs.exercises[0].name).equal('name');
    expect(newWorkoutArgs.exercises[0].sets).equal(1);
    expect(newWorkoutArgs.exercises[0].reps).equal(1);
    expect(newWorkoutArgs.description).equal('description');
  });

  it('should save user model with new workout', async () => {
    const workouts: ObjectId[] = [];
    const save = sinon.spy();
    stubedUser.returns({
      populate() {
        return {
          workouts,
          save,
        };
      },
    });

    await workoutController.createWorkout(req as any, res as any, () => {});

    expect(workouts[0]).to.be.an('object');
    expect(save.called).equal(true);
  });

  it('should return a success response', async () => {
    expect(res.statusCode).equal(201);
    expect(res.msg).equal('A-workout created successfully');
  });

  after(() => {
    stubedUser.restore();
  });
});

describe('get workout by name tests', () => {
  const res = createCustomResponseObj();
  const req = { userId: '61196b0a38af7615d0aed56e', query: {} as any };
  let stubedWorkout: sinon.SinonStub;

  before(async () => {
    stubedWorkout = sinon.stub(Workout, 'findOne');
  });

  it('should return error response if workout was not found', async () => {
    stubedWorkout.returns(false);

    await workoutController.getWorkoutByName(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "couldn't find workout, make sure you create a workout with this name first."
    );
  });

  it('should return success response and the workout object', async () => {
    const workout = { _id: 1, name: 'name', data: 'data' };
    stubedWorkout.returns(workout);

    await workoutController.getWorkoutByName(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);
    expect(res.jsonObj).eql(workout);
  });

  after(() => {
    stubedWorkout.restore();
  });
});

describe('get workout by id test', () => {
  const req = { params: 'id' };
  const res = createCustomResponseObj();
  let stubedWorkout: SinonStub;

  beforeEach(() => {
    stubedWorkout = sinon.stub(Workout, 'findById');
  });

  it('should send an error response if no workout was found', async () => {
    stubedWorkout.returns(false);

    await workoutController.getById(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('No workout with this id');
  });

  it('should send a success response with the workout object', async () => {
    const data = { id: '123', name: 'name', data: 'data' };

    stubedWorkout.returns(data);

    await workoutController.getById(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);
    expect(res.jsonObj).eql(data);
  });

  afterEach(() => {
    stubedWorkout.restore();
  });
});

describe('change workout tests', () => {
  const res = createCustomResponseObj();
  const req = { userId: '61196b0a38af7615d0aed56e', body: {} as any };
  let stubedWorkout: sinon.SinonStub;

  before(async () => {
    stubedWorkout = sinon.stub(Workout, 'findOne');
  });

  it('should return error response if workout was not found', async () => {
    stubedWorkout.returns(false);

    await workoutController.changeWorkout(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "couldn't find workout, make sure you create a workout with this name first."
    );
  });

  it('should return error response if no data was provided', async () => {
    stubedWorkout.returns(true);

    await workoutController.changeWorkout(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      'You need to provide data in order to change the workout'
    );
  });

  it('should save the updated workout', async () => {
    stubedWorkout.returns({ save: sinon.spy() });

    req.body.name = 'name';
    req.body.description = 'description';
    req.body.exercises = 'exercises';

    await workoutController.changeWorkout(req as any, res as any, () => {});

    const workout = await Workout.findOne();

    expect(workout.save.called).equal(true);
    expect(workout.name).equal('name');
    expect(workout.description).equal('description');
    expect(workout.exercises).equal('exercises');
  });

  it('should return success response', async () => {
    expect(res.statusCode).equal(201);
    expect(res.msg).eql('Workout changed successfully');
  });

  after(() => {
    stubedWorkout.restore();
  });
});

describe('delete workout tests', () => {
  const res = createCustomResponseObj();
  const req = { userId: '61196b0a38af7615d0aed56e', params: {} as any };
  let stubedWorkout: sinon.SinonStub;

  before(async () => {
    stubedWorkout = sinon.stub(Workout, 'findOneAndDelete');
  });

  it('should return error response if workout was not found', async () => {
    stubedWorkout.returns(false);

    await workoutController.deleteWorkout(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal(
      "couldn't find workout, make sure you create a workout with this name first."
    );
  });

  it('should return success response and the workout object', async () => {
    stubedWorkout.returns(true);

    await workoutController.deleteWorkout(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);
    expect(res.msg).eql('Workout deleted successfully');
  });

  after(() => {
    stubedWorkout.restore();
  });
});
