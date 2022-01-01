import { expect } from 'chai';

import Goals from '../models/Goals';
import User from '../models/User';

describe('Goals model tests', () => {
  it('should be invalid if required fields are empty', () => {
    const goals = new Goals();

    goals.validate((err: any) => {
      expect(err.errors.user.properties.message).equal(
        'Path `user` is required.'
      );
      expect(err.errors.basicGoal.properties.message).equal(
        'Path `basicGoal` is required.'
      );
      expect(err.errors['detailGoals.weight'].properties.message).equal(
        'Path `detailGoals.weight` is required.'
      );
    });
  });
  it('should be invalid if fields are not correct', () => {
    const goalsFields = {
      user: '-',
      basicGoal: '-',
    };
    const goals = new Goals(goalsFields);

    goals.validate((err: any) => {
      expect(err.errors.basicGoal.properties.message).equal(
        '`-` is not a valid enum value for path `basicGoal`.'
      );
      expect(err.errors.user.reason.message).equal(
        'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'
      );
    });
  });

  it('should be a valid model', () => {
    const userFields = {
      name: '-',
      username: '-',
      email: '-',
      password: '-',
      gender: 'male',
      dateOfBirth: '01/01/2005',
    };

    const user = new User(userFields);

    const goalsFields = {
      user: user._id,
      basicGoal: 'lose fat',
      detailGoals: { weight: 70 },
    };
    const goals = new Goals(goalsFields);

    goals.validate((err: any) => {
      expect(err).equal(null);
    });
  });
});
