import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';

import server from '../app';
import User from '../models/User';
import Workout from '../models/Workout';
import Program from '../models/Program';
import Goals from '../models/Goals';

const user = new User({
  name: '-',
  username: '-',
  email: '-',
  password: '-',
  gender: 'male',
  dateOfBirth: '01/01/2005',
});

const payload = { userId: user._id.toString() };
const token = jwt.sign(payload, process.env.jwtSecret as string, {
  expiresIn: '2d',
});

describe('get program recommendation route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).get('/program/recommendation');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should move from validation middleware successfully', async () => {
    const stubedGoalsModel = sinon.stub(Goals, 'findOne');
    stubedGoalsModel.returns({ basicGoal: false });

    const response = await request(server)
      .get('/program/recommendation')
      .set('Cookie', [`jon=${token}`]);

    expect(response.statusCode).equal(403);
    expect(response.text).equal(
      'User need to create goals in order to get a recommendation program'
    );

    stubedGoalsModel.restore();
  });
});

describe('post program route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).post('/program/day');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should send an error response for failing validation ', async () => {
    const payload = JSON.stringify({
      trainingDayName: 'W',
    });

    const response = await request(server)
      .post('/program/invalid-day')
      .set('Cookie', [`jon=${token}`])
      .set('Content-type', 'application/json')
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal('Validation Failed');
    expect(response.body.data[0].value).equal('invalid-day');
    expect(response.body.data[0].msg).equal('Invalid day');
    expect(response.body.data[1].value).equal('W');
    expect(response.body.data[1].msg).equal('Training day is invalid');
  });

  it('should move from validation middleware successfully', async () => {
    const stubedWorkoutModel = sinon.stub(Workout, 'findOne');
    stubedWorkoutModel.returns(false);

    const payload = JSON.stringify({
      trainingDayName: 'A',
      workoutName: 'name',
    });

    const response = await request(server)
      .post('/program/Sunday')
      .set('Cookie', [`jon=${token}`])
      .set('Content-type', 'application/json')
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal(
      "Couldn't find a workout with this name, make sure you create one first"
    );

    stubedWorkoutModel.restore();
  });
});

describe('get program route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).get('/program');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should move from validation middleware successfully', async () => {
    const stubedProgramModel = sinon.stub(Program, 'findOne');
    stubedProgramModel.returns({
      populate() {
        return false;
      },
    });

    const response = await request(server)
      .get('/program')
      .set('Cookie', [`jon=${token}`]);

    expect(response.statusCode).equal(403);
    expect(response.text).equal('Something wrong... this user has no program');

    stubedProgramModel.restore();
  });
});

describe('get program by day route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).get('/program/day');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should send an error response for failing validation ', async () => {
    const response = await request(server)
      .get('/program/invalid-day')
      .set('Cookie', [`jon=${token}`]);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal('Validation Failed');
    expect(response.body.data[0].value).equal('invalid-day');
    expect(response.body.data[0].msg).equal('Day is invalid');
  });

  it('should move from validation middleware successfully', async () => {
    const stubedProgramModel = sinon.stub(Program, 'findOne');
    stubedProgramModel.returns({ program: [] });

    const response = await request(server)
      .get('/program/Sunday')
      .set('Cookie', [`jon=${token}`]);

    expect(response.statusCode).equal(403);
    expect(response.text).equal('No program was found for the user');

    stubedProgramModel.restore();
  });
});

describe('post program route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).put('/program/day');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should send an error response for failing validation ', async () => {
    const payload = JSON.stringify({
      trainingDayName: 'W',
      restDay: 'not-a-boolean',
    });

    const response = await request(server)
      .put('/program/invalid-day')
      .set('Cookie', [`jon=${token}`])
      .set('Content-type', 'application/json')
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal('Validation Failed');
    expect(response.body.data[0].value).equal('invalid-day');
    expect(response.body.data[0].msg).equal('Invalid day');
    expect(response.body.data[1].value).equal('W');
    expect(response.body.data[1].msg).equal('Training day is invalid');
    expect(response.body.data[2].value).equal('not-a-boolean');
    expect(response.body.data[2].msg).equal('rest day needs to be a boolean');
  });

  it('should move from validation middleware successfully', async () => {
    const payload = JSON.stringify({
      trainingDayName: 'A',
      restDay: true,
    });

    const response = await request(server)
      .put('/program/Sunday')
      .set('Cookie', [`jon=${token}`])
      .set('Content-type', 'application/json')
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal("You can't set a workout day as a rest day");
  });

  it('should move from validation middleware successfully (optional values are omitted)', async () => {
    const stubedProgramModel = sinon.stub(Program, 'findOne');
    stubedProgramModel.returns(false);

    const payload = JSON.stringify({
      restDay: true,
    });

    const response = await request(server)
      .put('/program/Sunday')
      .set('Cookie', [`jon=${token}`])
      .set('Content-type', 'application/json')
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal('No program was found for the user');

    stubedProgramModel.restore();
  });
});
