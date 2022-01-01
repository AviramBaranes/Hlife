import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

//test tools
import sinon, { SinonStub } from 'sinon';
import { expect } from 'chai';

//packages
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

//controller to test
import * as authController from '../controller/auth';

//models and connections
import User from '../models/User';
import PhysicalStats from '../models/PhysicalStats';
// import Diet from "../models/Diet";
// import DietExecution from "../models/DietExecution";
import Program from '../models/Program';
import ProgramExecution from '../models/ProgramExecution';

import createCustomResponseObj from '../utils/helpers/forTests/responseDefaultObj';
import { CustomError } from '../types/error';

interface CreatedModelsArgs {
  _id: {};
  name: string;
  username: string;
  email: string;
  gender: string;
  grade: number;
  dateOfBirth: Date;
  age: number;
  user: {};
  stats: [];
  ingredients: [];
  goals: {};
  program: [];
  diet: {};
  executions: [];
}

let stubedPhysicalStats: SinonStub,
  stubedProgramExecution: SinonStub,
  stubedProgram: SinonStub,
  stubedBcrypt: SinonStub;
// stubedDietModel: SinonStub;

describe('signup Controller error handling', () => {
  let stubedUser: SinonStub;
  const req = {
    body: {
      name: 'Avirambr',
      username: 'aviramSport2',
      email: 'test@test.com',
      password: 'testpass123',
      passwordConfirmation: 'testpass12',
      gender: 'male',
      dateOfBirth: '02/01/2000',
    },
  };
  const res = createCustomResponseObj();

  it('should throw an error if user exist', async function () {
    stubedUser = sinon.stub(User, 'findOne');
    stubedUser.returns(true);

    await authController.signup(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('user already exist with this email!');
  });

  it('should throw an error if password do not match', async function () {
    stubedUser.returns(false);

    await authController.signup(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('passwords do not match');
  });

  it('should throw a default error', async function () {
    const error = (await authController.signup(
      {} as any,
      {} as any,
      () => {}
    )) as CustomError;

    expect(error.statusCode).equal(500);

    stubedUser.restore();
  });
});

describe('signup Controller creating the correct models', () => {
  let stubedUser: SinonStub, stubedUserPrototype: SinonStub;
  let createdUserArgs: CreatedModelsArgs,
    createdPhysicalStatsArgs: CreatedModelsArgs,
    // createdDietArgs: CreatedModelsArgs,
    createdProgramArgs: CreatedModelsArgs,
    createdProgramExecutionArgs: CreatedModelsArgs;
  // createdDietExecutionArgs: CreatedModelsArgs;
  before(async () => {
    const res = createCustomResponseObj();
    const req = {
      body: {
        name: 'Avirambr',
        username: 'aviramSport2',
        email: 'test2@test.com',
        password: 'testpass123',
        passwordConfirmation: 'testpass123',
        gender: 'male',
        dateOfBirth: '02/01/2000',
      },
    };

    stubedPhysicalStats = sinon.stub(PhysicalStats.prototype, 'save');
    // stubedDietExecution = sinon.stub(DietExecution.prototype, "save");
    stubedProgramExecution = sinon.stub(ProgramExecution.prototype, 'save');
    stubedProgram = sinon.stub(Program.prototype, 'save');
    stubedBcrypt = sinon.stub(bcrypt, 'hash');
    // stubedDietModel = sinon.stub(Diet.prototype, "save");

    stubedUser = sinon.stub(User, 'findOne');
    stubedUserPrototype = sinon.stub(User.prototype, 'save');

    stubedBcrypt.returns('123456');
    stubedUser.returns(false);
    stubedUserPrototype.returns({ _id: 1 });
    // stubedDietModel.returns({ _id: 1 });

    await authController.signup(req as any, res as any, () => {});

    createdUserArgs = stubedUserPrototype.firstCall.thisValue;
    createdPhysicalStatsArgs = stubedPhysicalStats.firstCall.thisValue;
    // createdDietArgs = stubedDietModel.firstCall.thisValue;
    createdProgramArgs = stubedProgram.firstCall.thisValue;
    createdProgramExecutionArgs = stubedProgramExecution.firstCall.thisValue;
    // createdDietExecutionArgs = stubedDietExecution.firstCall.thisValue;
  });

  it('should create a user model with the right arguments', async () => {
    expect(createdUserArgs._id).to.be.an('object');
    expect(createdUserArgs.name).equal('Avirambr');
    expect(createdUserArgs.email).equal('test2@test.com');
    expect(createdUserArgs.gender).equal('male');
    expect(createdUserArgs.grade).equal(0);
    expect(createdUserArgs.dateOfBirth).eql(new Date('02/01/2000'));
  });

  it('should create a PhysicalStats model', async () => {
    expect(createdPhysicalStatsArgs._id).to.be.an('object');
    expect(createdPhysicalStatsArgs.user).eql(createdUserArgs._id);
    expect(createdPhysicalStatsArgs.age).equal(
      new Date(Date.now()).getFullYear() - 2000
    );
    expect(createdPhysicalStatsArgs.stats).eql([]);
  });

  // it("should create a Diet model", async () => {
  //   expect(createdDietArgs._id).to.be.an("object");
  //   expect(createdDietArgs.user).eql(createdUserArgs._id);
  //   expect(createdDietArgs.ingredients).eql([]);
  // });

  it('should create a Program model', async () => {
    expect(createdProgramArgs._id).to.be.an('object');
    expect(createdProgramArgs.user).eql(createdUserArgs._id);
    expect(createdProgramArgs.program).eql([]);
  });

  it('should create a ProgramExecution model', async () => {
    expect(createdProgramExecutionArgs._id).to.be.an('object');
    expect(createdProgramExecutionArgs.user).eql(createdUserArgs._id);
    expect(createdProgramExecutionArgs.executions).eql([]);
  });

  // it("should create a UserDietExecution model", async () => {
  //   expect(createdDietExecutionArgs._id).to.be.an("object");
  //   expect(createdDietExecutionArgs.user).eql(createdUserArgs._id);
  //   expect(createdDietExecutionArgs.diet).eql(createdDietArgs._id);
  //   expect(createdDietExecutionArgs.executions).eql([]);
  // });

  after(() => {
    stubedUser.restore();
    stubedUserPrototype.restore();
  });
});

describe('signup controller testing respones', () => {
  let stubedUser: SinonStub, stubedUserPrototype: SinonStub;
  const req = {
    body: {
      name: 'Avirambr',
      username: 'aviramSport2',
      email: 'test@test.com',
      password: 'testpass123',
      passwordConfirmation: 'testpass123',
      gender: 'male',
      dateOfBirth: '02/01/2000',
    },
  };

  const res = createCustomResponseObj();

  before(async () => {
    stubedUser = sinon.stub(User, 'findOne');
    stubedUserPrototype = sinon.stub(User.prototype, 'save');
    stubedUser.returns(false);
    stubedUserPrototype.returns({ _id: 1 });
    await authController.signup(req as any, res as any, () => {});
  });
  it('should send the correct response', () => {
    expect(res.statusCode).equal(200);
  });

  it('should set the correct token', async () => {
    const userData = stubedUserPrototype.firstCall.thisValue;
    const tokenTester = jwt.verify(
      res.jsonObj.token,
      process.env.JWT_SECRET as string
    ) as { userId: string };

    expect(tokenTester.userId).equal(userData._id.toString());
  });

  // it('should set the correct cookie configs', () => {
  //   expect(res.cookieConfig.sameSite).equal('strict');
  //   expect(res.cookieConfig.path).equal('/');
  //   const currentDate = new Date(
  //     new Date().getTime() + 24 * 3600 * 1000 * 2 + 100
  //   );
  //   const currentTime = currentDate.getTime();
  //   const cookieExperetionTime = res.cookieConfig.expires.getTime();
  //   expect(cookieExperetionTime).below(currentTime);
  //   expect(res.cookieConfig.httpOnly).equal(true);
  // });

  it('should send the correct message and data', () => {
    expect(res.jsonObj.message).equal('Avirambr Sign Up Successfully');
  });

  after(() => {
    stubedUserPrototype.restore();
    stubedUser.restore();
    stubedPhysicalStats.restore();
    // stubedDietExecution.restore();
    stubedProgramExecution.restore();
    stubedProgram.restore();
    stubedBcrypt.restore();
    // stubedDietModel.restore();
  });
});
//14
describe('login controller error handling tests', () => {
  let stubedUser: sinon.SinonStub;
  const req = {
    body: { email: 'fakeEmail@fake.com', password: '123456' },
  };
  const res = createCustomResponseObj();
  it('should return an error response if email not exist', async function () {
    stubedUser = sinon.stub(User, 'findOne');

    stubedUser.returns({
      select: sinon.stub().returns(false),
    });

    await authController.login(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('User not found, Make sure the email is correct');
  });

  it('should return an error response if password is incorrect', async () => {
    req.body.email = 'test@test.com';
    req.body.password = '123456';

    const stubedBcrypt = sinon.stub(bcrypt, 'compare') as sinon.SinonStub;

    stubedUser.returns({
      select: sinon.stub().returns(true),
    });
    stubedBcrypt.returns(false);

    await authController.login(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('Password is invalid');

    stubedBcrypt.restore();
  });

  it('should throw a default error', async () => {
    stubedUser.throws();

    const error = (await authController.login(
      req as any,
      {} as any,
      () => {}
    )) as CustomError;

    expect(error.statusCode).equal(500);

    stubedUser.restore();
  });
});

describe('login controller testing response', () => {
  let stubedUser, req;
  const res = createCustomResponseObj();

  it('should return 200 status code', async () => {
    req = {
      body: {
        email: 'test@test.com',
        password: '123456',
      },
    };
    stubedUser = sinon.stub(User, 'findOne');
    const stubedBcrypt = sinon.stub(bcrypt, 'compare') as sinon.SinonStub;

    stubedUser.returns({
      select: sinon.stub().returns({
        name: 'aviram',
        _id: 1,
        username: 'avi123',
        hasProgram: true,
        hasDiet: false,
      }),
    });
    stubedBcrypt.returns(true);

    await authController.login(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);

    stubedUser.restore();
    stubedBcrypt.restore();
  });

  it('should return the correct cookie', () => {
    const { userId } = jwt.verify(
      res.jsonObj.token,
      process.env.JWT_SECRET as string
    ) as { userId: string };
    expect(userId).equal(1);
  });

  // it('should return the correct cookie settings', function () {
  //   expect(res.cookieConfig.sameSite).equal('strict');
  //   expect(res.cookieConfig.path).equal('/');
  //   const currentDate = new Date(new Date().getTime() + 24 * 3600 * 1000 * 2);
  //   const currentTime = currentDate.getTime();
  //   const cookieExperetionTime = res.cookieConfig.expires.getTime();
  //   expect(cookieExperetionTime).below(currentTime);
  //   expect(res.cookieConfig.httpOnly).equal(true);
  // });
  it('should send the correct message and data', function () {
    expect(res.jsonObj.message).equal('aviram Logged In Successfully!');
    expect(res.jsonObj.hasProgram).equal(true);
  });
});

interface UserForTest {
  name: string;
  resetToken: string;
  tokenExpiration: Date;
  password: string;
}

describe('resetPassword in settings tests', () => {
  const req = {
    body: {
      userId: 1,
      currentPassword: null,
      newPassword: '1234567',
      newPasswordConfirmation: 'not match',
    },
  };

  const res = createCustomResponseObj();
  let stubedUser: sinon.SinonStub;
  it('should response with 401 if user not found', async function () {
    stubedUser = sinon.stub(User, 'findOne');

    stubedUser.returns({
      select: sinon.stub().returns(false),
    });

    await authController.resetPassword(req as any, res as any, () => {});

    expect(res.statusCode).equal(401);
    expect(res.msg).equal('Unauthorized');
  });

  it('should response with 403 if passwords do not match', async function () {
    stubedUser.returns({
      select: sinon.stub().returns(true),
    });

    await authController.resetPassword(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('Passwords do not match');
  });

  it('should fail to compare passwords', async function () {
    req.body.newPasswordConfirmation = '1234567';

    const stubedBcrypt = sinon.stub(bcrypt, 'compare') as sinon.SinonStub;
    stubedBcrypt.returns(false);
    stubedUser.returns({
      select: sinon.stub().returns(true),
    });

    await authController.resetPassword(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('Password is invalid');

    stubedBcrypt.restore();
  });

  it('should change user password and send correct response', async function () {
    req.body.newPasswordConfirmation = '1234567';

    const stubedBcryptCompare = sinon.stub(
      bcrypt,
      'compare'
    ) as sinon.SinonStub;
    const stubedBcryptHash = sinon.stub(bcrypt, 'hash') as sinon.SinonStub;

    stubedBcryptCompare.returns(true);

    stubedUser.returns({
      select: sinon.stub().returns({ password: '', save: sinon.stub() }),
    });

    stubedBcryptHash.returns('new password');

    await authController.resetPassword(req as any, res as any, () => {});

    const user = User.findOne().select();

    expect(user.password).equal('new password');
    expect(res.statusCode).equal(200);
    expect(res.msg).equal('password reseted successfully!');

    stubedUser.restore();
    stubedBcryptCompare.restore();
    stubedBcryptHash.restore();
  });
});

describe('sendResetEmail tests', function () {
  let user: UserForTest;
  let stubedUser: sinon.SinonStub;
  let stubedNodemailer: sinon.SinonStub;
  const req = {
    body: { email: 'fakeEmail@fake.com' },
    headers: { cookie: 'not a csrf cookie' },
  };
  const res = createCustomResponseObj();

  before(() => {
    stubedNodemailer = sinon.stub(nodemailer, 'createTransport');
  });

  after(() => {
    stubedNodemailer.restore();
  });

  it('should send a csrf error if cant find token in cookie', async function () {
    await authController.sendResetEmail(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('CSRF ERROR');
  });

  it('should send a User not found error if user not found', async function () {
    req.headers.cookie = 'XSRF-TOKEN=123';

    stubedUser = sinon.stub(User, 'findOne');

    stubedUser.returns(false);

    await authController.sendResetEmail(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('User not found, Make sure the email is correct');
  });

  it('should set a reset token', async function () {
    stubedNodemailer.returns({ sendMail: sinon.spy() });

    stubedUser.returns({ name: 'aviram', save: sinon.stub() });

    await authController.sendResetEmail(req as any, res as any, () => {});

    user = await User.findOne();

    expect(user.resetToken.length).equal(64);
    expect(user.tokenExpiration).below(new Date(Date.now() + 36000000));
    stubedUser.restore();
  });

  it('should call sendgrid.send with the right message', async () => {
    const link = `http://localhost:3000/auth/reset-password/${user.resetToken}`;
    const html = `<p>Hey ${user.name.toString()}, Please visit this <a href=${link}>link</a> in order to reset your Hlife account Password.</p><p>This token is valid for only 1 hour.</p>`;

    expect(stubedNodemailer().sendMail.firstCall.args[0].to).equal(
      'fakeEmail@fake.com'
    );
    expect(stubedNodemailer().sendMail.firstCall.args[0].subject).equal(
      'Hlife reset password'
    );
    expect(stubedNodemailer().sendMail.firstCall.args[0].html).equal(html);
  });

  it('should response 200', async function () {
    expect(res.statusCode).equal(200);
    expect(res.msg).equal('Reset Email Sent!');
  });
});

describe('resetPasswordViaToken tests', function () {
  let user: UserForTest;
  let stubedUser: sinon.SinonStub;
  const res = createCustomResponseObj();
  const req = {
    body: {
      password: 'they are',
      passwordConfirmation: 'not a match',
      resetToken: 'token',
    },
  };

  beforeEach(() => {
    stubedUser = sinon.stub(User, 'findOne');
  });

  it('should send an error response for not matching passwords', async function () {
    await authController.resetPasswordViaToken(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('Passwords do not match');
  });

  it('should send an error response for wrong token', async function () {
    req.body = {
      password: 'they match',
      passwordConfirmation: 'they match',
      resetToken: 'token',
    };

    stubedUser.returns(false);

    await authController.resetPasswordViaToken(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('Invalid Token');
  });

  it('should send an error response for expired token', async function () {
    stubedUser.returns({
      tokenExpiration: {
        getTime() {
          return -Infinity;
        },
      },
    });

    await authController.resetPasswordViaToken(
      req as any,
      res as any,
      () => {}
    );

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('Token Expired');
  });

  it("should update the user's token", async function () {
    const stubedDate = sinon.stub(Date, 'now');
    const stubedBcrypt = sinon.stub(bcrypt, 'hash') as sinon.SinonStub;

    stubedDate.returns(-Infinity); //'isExpired' will be false
    stubedUser.returns({
      save: sinon.spy(),
      name: 'aviram',
      tokenExpiration: {
        getTime() {
          return -Infinity;
        },
      },
    });
    stubedBcrypt.returns('123456');

    await authController.resetPasswordViaToken(
      req as any,
      res as any,
      () => {}
    );

    user = User.findOne();

    expect(user.resetToken).equal('');
    expect(user.tokenExpiration).equal(undefined);

    stubedDate.restore();
    stubedBcrypt.restore();
  });

  it('should update the user password', async function () {
    expect(user.password).equal('123456');
  });

  it('should return a 200 response', async function () {
    expect(res.statusCode).equal(200);
    expect(res.msg).equal(`${user.name}'s password successfully changed!`);
  });

  afterEach(() => {
    stubedUser.restore();
  });
});

describe('validateResetToken tests', function () {
  const req = {
    params: { token: 'not match' },
  };
  const res = createCustomResponseObj();
  let stubedUser: sinon.SinonStub;

  beforeEach(() => {
    stubedUser = sinon.stub(User, 'findOne');
  });

  afterEach(() => {
    stubedUser.restore();
  });

  it('should send an error response for invalid token', async function () {
    stubedUser.returns(false);

    await authController.validateResetToken(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('Invalid Token');
  });

  it('should send an error response for expired token', async function () {
    req.params.token = '123456';

    stubedUser.returns({
      tokenExpiration: {
        getTime() {
          return -Infinity;
        },
      },
    });

    await authController.validateResetToken(req as any, res as any, () => {});

    expect(res.statusCode).equal(403);
    expect(res.msg).equal('Token Expired');
  });

  it('should return a 200 response', async function () {
    stubedUser.returns({
      tokenExpiration: {
        getTime() {
          return Infinity;
        },
      },
    });

    await authController.validateResetToken(req as any, res as any, () => {});

    expect(res.statusCode).equal(200);
    expect(res.msg).equal('Token Verified Successfully');
  });
});

describe('validateUser tests', () => {
  const req = { userId: 1 };
  const res = createCustomResponseObj();

  let stubedUser: sinon.SinonStub;

  before(async () => {
    stubedUser = sinon.stub(User, 'findById');
    stubedUser.returns({
      username: 'aviram',
      hasProgram: false,
      hasInitialStats: true,
      hasGoals: true,
    });
    await authController.validateUser(req as any, res as any, () => {});
  });

  it('should set the right status code in res', () => {
    expect(res.statusCode).equal(200);
  });

  it('should set the right json data in res', () => {
    expect(res.jsonObj.isAuthenticated).equal(true);
    expect(res.jsonObj.hasProgram).equal(false);
    expect(res.jsonObj.hasInitialStats).equal(true);
    expect(res.jsonObj.hasGoals).equal(true);
  });

  after(() => {
    stubedUser.restore();
  });
});
