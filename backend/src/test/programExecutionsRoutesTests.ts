import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';

import server from '../app';
import mongoose from 'mongoose';
import User from '../models/User';
import sinon, { SinonStub } from 'sinon';
import ProgramExecution from '../models/ProgramExecution';

const user = new User({
  name: '-',
  username: '-',
  email: '-',
  password: '-',
  gender: 'male',
  dateOfBirth: '01/01/2005',
});

const payload = { userId: user._id.toString() };
const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
  expiresIn: '2d',
});

describe('get exercises-to-do route', () => {
  let stubedUserModel: SinonStub;
  beforeEach(() => {
    stubedUserModel = sinon.stub(User, 'findById');
  });

  it('responds with an unauthorized error', async () => {
    const response = await request(server).get('/program-exec/exercises-to-do');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should response with an invalid date error', async () => {
    const response = await request(server)
      .get('/program-exec/exercises-to-do/not-a-date')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal('Validation Failed');
    expect(response.body.data[0].value).equal('not-a-date');
    expect(response.body.data[0].msg).equal(
      'The parameter that provided is not a valid date'
    );
  });

  it('should response with an invalid date error', async () => {
    const response = await request(server)
      .get('/program-exec/exercises-to-do/not-a-date')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal('Validation Failed');
    expect(response.body.data[0].value).equal('not-a-date');
    expect(response.body.data[0].msg).equal(
      'The parameter that provided is not a valid date'
    );
  });

  it('should pass from the validation middleware successfully 1', async () => {
    stubedUserModel.returns({ hasProgram: false });

    const response = await request(server)
      .get('/program-exec/exercises-to-do/11-11-2001')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.text).equal(
      'You need to create a full program before you declare about execution'
    );
    expect(response.statusCode).equal(403);
  });

  it('should pass from the validation middleware successfully 2', async () => {
    stubedUserModel.returns({ hasProgram: false });

    const response = await request(server)
      .get('/program-exec/exercises-to-do')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.text).equal(
      'You need to create a full program before you declare about execution'
    );
    expect(response.statusCode).equal(403);
  });

  after(async () => {
    server.close();
    mongoose.disconnect();
  });

  afterEach(() => {
    stubedUserModel.restore();
  });
});

describe('post declareAnExecution route', () => {
  let stubedUserModel: SinonStub;

  before(() => {
    stubedUserModel = sinon.stub(User, 'findById');
  });

  it('responds with an unauthorized error', async () => {
    const response = await request(server).post('/program-exec/11-11-2001');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should send an error response for invalid date and exercises', async () => {
    const jsonData = JSON.stringify({
      exercises: { name1: 'not a boolean', name2: true },
    });

    const response = await request(server)
      .post('/program-exec/not-a-date')
      .set('Content-type', 'application/json')
      .set({ Authorization: `Bearer ${token}` })
      .send(jsonData);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal('Validation Failed');
    expect(response.body.data[0].value).equal('not-a-date');
    expect(response.body.data[0].msg).equal(
      'The parameter that provided is not a valid date'
    );
    expect(response.body.data[1].value).eql({
      name1: 'not a boolean',
      name2: true,
    });
    expect(response.body.data[1].msg).equal(
      'Each exercise need to have a boolean value'
    );
  });

  it('should move from the validation middleware successfully', async () => {
    stubedUserModel.returns({ hasProgram: false });
    const jsonData = JSON.stringify({
      exercises: { name1: false, name2: true },
    });

    const response = await request(server)
      .post('/program-exec/11-11-2001')
      .set('Content-type', 'application/json')
      .set({ Authorization: `Bearer ${token}` })
      .send(jsonData);

    expect(response.statusCode).equal(403);
    expect(response.text).equal(
      'You need to create a full program before you declare about execution'
    );
  });

  it('should move from the validation middleware successfully (with no date)', async () => {
    stubedUserModel.returns({ hasProgram: false });
    const jsonData = JSON.stringify({
      exercises: { name1: false, name2: true },
    });

    const response = await request(server)
      .post('/program-exec')
      .set('Content-type', 'application/json')
      .set({ Authorization: `Bearer ${token}` })
      .send(jsonData);

    expect(response.statusCode).equal(403);
    expect(response.text).equal(
      'You need to create a full program before you declare about execution'
    );
  });

  after(async () => {
    server.close();
    mongoose.disconnect();
    stubedUserModel.restore();
  });
});

describe('get SingleExecution route', () => {
  let stubedProgramExecModel: SinonStub;

  before(() => {
    stubedProgramExecModel = sinon.stub(ProgramExecution, 'findOne');
  });

  it('responds with an unauthorized error', async () => {
    const response = await request(server).get('/program-exec/11-11-2001');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should send an error response for invalid Date', async () => {
    const response = await request(server)
      .get('/program-exec/not-a-date')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.body.message).equal('Validation Failed');
    expect(response.statusCode).equal(422);
    expect(response.body.data[0].msg).equal('This date is invalid');
    expect(response.body.data[0].value).equal('not-a-date');
  });

  it('should move from validation middleware successfully', async () => {
    stubedProgramExecModel.returns({ executions: [] });

    const response = await request(server)
      .get('/program-exec/11-11-2001')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.text).equal("User doesn't has any declared executions");
    expect(response.statusCode).equal(403);
  });

  after(async () => {
    server.close();
    mongoose.disconnect();
    stubedProgramExecModel.restore();
  });
});

describe('get ExecutionsByRange route', () => {
  let stubedUserModel: SinonStub;

  before(() => {
    stubedUserModel = sinon.stub(User, 'findById');
  });

  it('responds with an unauthorized error', async () => {
    const response = await request(server).get('/program-exec/by-range');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should send an error response if range and date are invalid', async () => {
    const response = await request(server)
      .get('/program-exec/by-range/not-valid/not-valid')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.body.message).equal('Validation Failed');
    expect(response.statusCode).equal(422);
    expect(response.body.data[0].msg).equal(
      'a range can only be a week, a month, a year or all'
    );
    expect(response.body.data[0].value).equal('not-valid');
    expect(response.body.data[1].msg).equal('date is invalid');
    expect(response.body.data[1].value).equal('not-valid');
  });

  it('should move from validation middleware successfully ', async () => {
    stubedUserModel.returns({ hasProgram: false });

    const response = await request(server)
      .get('/program-exec/by-range/year/11-11-2001')
      .set({ Authorization: `Bearer ${token}` });

    expect(response.text).equal("This user doesn't has a full program yet");
    expect(response.statusCode).equal(403);
  });

  after(async () => {
    server.close();
    mongoose.disconnect();
    stubedUserModel.restore();
  });
});
