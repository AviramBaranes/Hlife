import React, { SetStateAction, useRef } from 'react';
import { StatsObjType } from '../../../types/Stats';

const GraphButtons: React.FC<{
  setDataToDisplay: React.Dispatch<
    SetStateAction<'weight' | 'fatPercentage' | 'musclesMass'>
  >;
  hasFatPercentageStats: boolean;
  hasMusclesMassStats: boolean;
}> = ({ setDataToDisplay, hasFatPercentageStats, hasMusclesMassStats }) => {
  return (
    <div>
      <button onClick={() => setDataToDisplay('weight')}>Weight</button>
      {hasFatPercentageStats && (
        <button onClick={() => setDataToDisplay('fatPercentage')}>
          Fat Percentage
        </button>
      )}
      {hasMusclesMassStats && (
        <button onClick={() => setDataToDisplay('musclesMass')}>
          Muscles Mass
        </button>
      )}
    </div>
  );
};

export default GraphButtons;
