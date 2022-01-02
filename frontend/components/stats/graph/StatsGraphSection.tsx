import React, { useState } from 'react';
import { StatsObjType } from '../../../types/Stats';
import GraphButtons from './GraphButtons';
import StatsGraph from './StatsGraph';

const StatsGraphSection: React.FC<{
  stats: StatsObjType[];
  basicGoal: string;
}> = ({ stats, basicGoal }) => {
  const [dataToDisplay, setDataToDisplay] = useState<
    'weight' | 'fatPercentage' | 'musclesMass'
  >('weight');
  const hasFatPercentageStats = stats.some((stat) => stat.fatPercentage);
  const hasMusclesMassStats = stats.some((stat) => stat.musclesMass);

  return (
    <div>
      <StatsGraph
        basicGoal={basicGoal}
        stats={stats}
        dataToDisplay={dataToDisplay}
      />
      {(hasFatPercentageStats || hasMusclesMassStats) && (
        <GraphButtons
          hasFatPercentageStats={hasFatPercentageStats}
          hasMusclesMassStats={hasMusclesMassStats}
          setDataToDisplay={setDataToDisplay}
        />
      )}
    </div>
  );
};

export default StatsGraphSection;
