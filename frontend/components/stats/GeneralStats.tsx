import React from 'react';

import classes from '../../styles/pages/stats.module.scss';

interface GeneralStatsProps {
  age: number;
  name: string;
  rank: string;
}
const GeneralStats: React.FC<GeneralStatsProps> = ({ age, name, rank }) => {
  return (
    <section className={classes.StatsSec}>
      <h3>Your Stats & Goals</h3>
      <div>
        <p>
          <strong>Name: </strong>
          {name}
        </p>
        <p>
          <strong>Age: </strong>
          {age}
        </p>
        <p>
          <strong>Rank: </strong>
          {rank}
        </p>
      </div>
    </section>
  );
};

export default GeneralStats;
