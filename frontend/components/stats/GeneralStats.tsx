import React from 'react';
import Link from 'next/link';

import classes from '../../styles/pages/stats.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { StatsObjType } from '../../types/Stats';

interface GeneralStatsProps {
  age: number;
  name: string;
  rank: string;
  basicGoal: string;
  stats: StatsObjType[];
}
const GeneralStats: React.FC<GeneralStatsProps> = ({
  age,
  name,
  rank,
  basicGoal,
  stats,
}) => {
  const date = new Date(new Date().setHours(0, 0, 0, 0));

  const isDeclaredAlready = stats.find(
    (stat) => new Date(stat.date).getTime() === new Date(date).getTime()
  );

  return (
    <section className={classes.StatsSec}>
      <h3>Stats:</h3>
      <div className={classes.StatsDisplay}>
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
        <div>
          {!isDeclaredAlready && (
            <Link
              href={{
                pathname: 'stats/add-stats',
                query: {
                  goal: `${
                    basicGoal === 'lose fat' ? 'lose-fat' : 'increase-mass'
                  }`,
                },
              }}
            >
              <button className='skip-button'>
                Add Stats
                <span>
                  <FontAwesomeIcon icon={faClipboard} />
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default GeneralStats;
