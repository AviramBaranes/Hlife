import request from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';

import server from '../app';
import User from '../models/User';
import sinon from 'sinon';
import Goals from '../models/Goals';
import PhysicalStats from '../models/PhysicalStats';

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

describe('post stats route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).post('/stats');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should send an error response for failing validation ', async () => {
    const payload = JSON.stringify({
      weight: 34,
      height: 251,
      fatPercentage: 8.5,
      musclesMass: 34.5,
    });

    const response = await request(server)
      .post('/stats')
      .set('Cookie', [`jon=${token}`])
      .set('Content-type', 'application/json')
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal('Validation Failed');
    expect(response.body.data[0].value).equal(34);
    expect(response.body.data[0].msg).equal(
      'Weight needs to be in range 35kg-250kg'
    );
    expect(response.body.data[1].value).equal(251);
    expect(response.body.data[1].msg).equal(
      'Height needs to be in a range of 100cm-250cm'
    );
    expect(response.body.data[2].value).equal(8.5);
    expect(response.body.data[2].msg).equal(
      'Fat Percentage needs to be lower than 40%'
    );
    expect(response.body.data[3].value).equal(34.5);
    expect(response.body.data[3].msg).equal(
      'Muscles mass needs to be in a range of 10kg-200kg'
    );
  });

  it('should move from validation middleware successfully', async () => {
    const stubedGoalsModel = sinon.stub(Goals, 'findOne');
    stubedGoalsModel.returns(false);

    const payload = JSON.stringify({
      weight: 35,
      height: 250,
      fatPercentage: 35,
      musclesMass: 34,
    });

    const response = await request(server)
      .post('/stats')
      .set('Cookie', [`jon=${token}`])
      .set('Content-type', 'application/json')
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal("User's goals not found");

    stubedGoalsModel.restore();
  });
});

describe('get all stats dates route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).get('/stats/all-stats-dates');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should move from validation middleware successfully', async () => {
    const stubedPhysicalStatsModel = sinon.stub(PhysicalStats, 'findOne');
    stubedPhysicalStatsModel.returns(false);

    const response = await request(server)
      .get('/stats/all-stats-dates')
      .set('Cookie', [`jon=${token}`]);

    expect(response.statusCode).equal(403);
    expect(response.text).equal('No stats were found for this user');

    stubedPhysicalStatsModel.restore();
  });
});

describe('get stats by date route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).get('/stats/date');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should send an error response for failing validation ', async () => {
    const response = await request(server)
      .get('/stats/date')
      .set('Cookie', [`jon=${token}`]);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal('Validation Failed');
    expect(response.body.data[0].value).equal('date');
    expect(response.body.data[0].msg).equal('invalid date');
  });

  it('should move from validation middleware successfully', async () => {
    const stubedPhysicalStatsModel = sinon.stub(PhysicalStats, 'findOne');
    stubedPhysicalStatsModel.returns(false);

    const response = await request(server)
      .get('/stats/11-11-2001')
      .set('Cookie', [`jon=${token}`]);

    expect(response.statusCode).equal(403);
    expect(response.text).equal('No stats were found for this user');

    stubedPhysicalStatsModel.restore();
  });
});

describe('get all stats route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).get('/stats');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should move from validation middleware successfully', async () => {
    const stubedPhysicalStatsModel = sinon.stub(PhysicalStats, 'findOne');
    stubedPhysicalStatsModel.returns({
      populate() {
        return false;
      },
    });

    const response = await request(server)
      .get('/stats')
      .set('Cookie', [`jon=${token}`]);

    expect(response.statusCode).equal(403);
    expect(response.text).equal('No stats were found for this user');

    stubedPhysicalStatsModel.restore();
  });
});

describe('change stats route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).put('/stats');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should send an error response for failing validation ', async () => {
    const payload = JSON.stringify({
      weight: 34,
      height: 251,
      fatPercentage: 8.5,
      musclesMass: 34.5,
      bodyImageUrl: 'not a url',
    });

    const response = await request(server)
      .put('/stats')
      .set('Cookie', [`jon=${token}`])
      .set('Content-type', 'application/json')
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal('Validation Failed');
    expect(response.body.data[0].value).equal(34);
    expect(response.body.data[0].msg).equal(
      'Weight needs to be in range 35kg-250kg'
    );
    expect(response.body.data[1].value).equal(251);
    expect(response.body.data[1].msg).equal(
      'Height needs to be in a range of 100cm-250cm'
    );
    expect(response.body.data[2].value).equal(8.5);
    expect(response.body.data[2].msg).equal(
      'Fat Percentage needs to be lower than 80%'
    );
    expect(response.body.data[3].value).equal(34.5);
    expect(response.body.data[3].msg).equal(
      'Muscles mass needs to be in a range of 10kg-200kg'
    );
    expect(response.body.data[4].value).equal('not a url');
    expect(response.body.data[4].msg).equal('Image is invalid');
  });

  it('should move from validation middleware successfully', async () => {
    const stubedPhysicalStatsModel = sinon.stub(PhysicalStats, 'findOne');
    stubedPhysicalStatsModel.returns(false);

    const payload = JSON.stringify({
      weight: 35,
      height: 250,
      fatPercentage: 75,
      musclesMass: 34,
    });

    const response = await request(server)
      .put('/stats')
      .set('Cookie', [`jon=${token}`])
      .set('Content-type', 'application/json')
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal('No stats were found for this user');

    stubedPhysicalStatsModel.restore();
  });
});

describe('delete last stats route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).delete('/stats');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should move from validation middleware successfully', async () => {
    const stubedPhysicalStatsModel = sinon.stub(PhysicalStats, 'findOne');
    stubedPhysicalStatsModel.returns(false);

    const response = await request(server)
      .delete('/stats')
      .set('Cookie', [`jon=${token}`]);

    expect(response.statusCode).equal(403);
    expect(response.text).equal('No stats were found for this user');

    stubedPhysicalStatsModel.restore();
  });
});

describe('post ranking route', () => {
  it('should send an error response if unauthorized', async () => {
    const response = await request(server).post('/stats/set-ranking');

    expect(response.statusCode).equal(401);
    expect(response.body.message).equal('Unauthorized cookie is invalid');
  });

  it('should send an error response for failing validation ', async () => {
    const payload = JSON.stringify({
      selfRank: 'not valid',
    });

    const response = await request(server)
      .post('/stats/set-ranking')
      .set('Cookie', [`jon=${token}`])
      .set('Content-type', 'application/json')
      .send(payload);

    expect(response.statusCode).equal(422);
    expect(response.body.message).equal('Validation Failed');
    expect(response.body.data[0].value).equal('not valid');
    expect(response.body.data[0].msg).equal('Ranking is invalid');
  });

  it('should move from validation middleware successfully', async () => {
    const stubedPhysicalStatsModel = sinon.stub(PhysicalStats, 'findOne');
    stubedPhysicalStatsModel.returns(false);

    const payload = JSON.stringify({
      selfRank: 'Beginner',
    });

    const response = await request(server)
      .post('/stats/set-ranking')
      .set('Cookie', [`jon=${token}`])
      .set('Content-type', 'application/json')
      .send(payload);

    expect(response.statusCode).equal(403);
    expect(response.text).equal(
      "Something went wrong... Couldn't find stats that match the user"
    );

    stubedPhysicalStatsModel.restore();
  });
});
