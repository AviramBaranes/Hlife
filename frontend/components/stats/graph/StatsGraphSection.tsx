import React, { useState } from 'react';
import { StatsObjType } from '../../../types/Stats';
import axiosInstance from '../../../utils/axios/axiosInstance';
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
      {(hasFatPercentageStats || hasMusclesMassStats) && (
        <GraphButtons
          hasFatPercentageStats={hasFatPercentageStats}
          hasMusclesMassStats={hasMusclesMassStats}
          setDataToDisplay={setDataToDisplay}
        />
      )}
      <StatsGraph
        basicGoal={basicGoal}
        stats={stats}
        dataToDisplay={dataToDisplay}
      />
    </div>
  );
};

export default StatsGraphSection;
