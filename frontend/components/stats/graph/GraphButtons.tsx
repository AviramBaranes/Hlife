import React, { SetStateAction } from 'react';

import classes from '../../../styles/pages/stats.module.scss';

const GraphButtons: React.FC<{
  setDataToDisplay: React.Dispatch<
    SetStateAction<'weight' | 'fatPercentage' | 'musclesMass'>
  >;
  hasFatPercentageStats: boolean;
  hasMusclesMassStats: boolean;
}> = ({ setDataToDisplay, hasFatPercentageStats, hasMusclesMassStats }) => {
  function buttonClickHandler(e: any) {
    setDataToDisplay(e.target.name);
    e.target.parentNode.childNodes.forEach(
      (child: any) => (child.className = '')
    );
    e.target.classList.add(classes.ActiveBtn);
  }

  return (
    <div className={classes.ButtonsSec}>
      <h4>Choose progress to display:</h4>
      <div className={classes.Buttons}>
        <button
          name='weight'
          className={classes.ActiveBtn}
          onClick={buttonClickHandler}
        >
          Weight
        </button>
        {hasFatPercentageStats && (
          <button name='fatPercentage' onClick={buttonClickHandler}>
            Fat Percentage
          </button>
        )}
        {hasMusclesMassStats && (
          <button name='musclesMass' onClick={buttonClickHandler}>
            Muscles Mass
          </button>
        )}
      </div>
    </div>
  );
};

export default GraphButtons;
