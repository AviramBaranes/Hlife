import React from 'react';
import { PhysicalStatsType } from '../../types/Stats';
import GeneralStats from './GeneralStats';
import StatsGraphSection from './graph/StatsGraphSection';

const UserStats: React.FC<{ userStats: PhysicalStatsType; basicGoal: string }> =
  ({ userStats, basicGoal }) => {
    const { age, name, rank, stats } = userStats;
    return (
      <div>
        <GeneralStats
          basicGoal={basicGoal}
          age={age}
          name={name}
          rank={rank}
          stats={stats}
        />
        <StatsGraphSection stats={stats} basicGoal={basicGoal} />
      </div>
    );
  };

export default UserStats;
