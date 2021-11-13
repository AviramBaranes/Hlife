import React from 'react';

import classes from '../../styles/pages/stats.module.scss';
import { GoalsType } from '../../types/Stats';

const UserGoals: React.FC<{ userGoals: GoalsType }> = ({ userGoals }) => {
  return (
    <section className={classes.GoalsSec}>
      <h3>Your Goals</h3>
      <div>
        <p>
          <strong>Main: </strong>
          {userGoals.basicGoal}
        </p>
        <p>
          <strong>weight: </strong>
          {userGoals.detailGoals.weight} Kg
        </p>
        {userGoals.detailGoals.fatPercentage && (
          <p>
            <strong>Fat Percentage: </strong>
            {userGoals.detailGoals.fatPercentage} %
          </p>
        )}
        {userGoals.detailGoals.musclesMass && (
          <p>
            <strong>Muscles mass: </strong>
            {userGoals.detailGoals.musclesMass} Kg
          </p>
        )}
      </div>
    </section>
  );
};

export default UserGoals;
