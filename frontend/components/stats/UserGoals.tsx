import React from 'react';

import classes from '../../styles/pages/stats.module.scss';
import { GoalsType } from '../../types/Stats';

const UserGoals: React.FC<{ userGoals: GoalsType }> = ({ userGoals }) => {
  return (
    <section className={classes.GoalsSec}>
      <div>
        <p>
          <strong>Main goal: </strong>
          {userGoals.basicGoal}
        </p>
        <p>
          <strong>Desired weight: </strong>
          {userGoals.detailGoals.weight} Kg
        </p>
        {userGoals.detailGoals.fatPercentage && (
          <p>
            <strong>Desired Fat: </strong>
            {userGoals.detailGoals.fatPercentage} %
          </p>
        )}
        {userGoals.detailGoals.musclesMass && (
          <p>
            <strong>Desired Muscles mass: </strong>
            {userGoals.detailGoals.musclesMass} Kg
          </p>
        )}
      </div>
    </section>
  );
};

export default UserGoals;
