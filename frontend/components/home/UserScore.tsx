import React, { useEffect, useState } from 'react';

import classes from '../.././styles/pages/home.module.scss';
import Line from '../UI/SVGs/title-line';

const UserScore: React.FC<{ grade: number }> = ({ grade }) => {
  const [displayedScore, setDisplayedScore] = useState(Math.floor(grade * 0.8));
  const [displayAnimation, setDisplayAnimation] = useState(false);

  useEffect(() => {
    if (displayedScore >= grade) {
      setDisplayAnimation(true);
      setTimeout(() => {
        setDisplayAnimation(false);
      }, 400);
      return;
    }
    setTimeout(() => {
      setDisplayedScore((prev) => ++prev);
    }, 3000 / grade);
  }, [displayedScore]);

  return (
    <div className={classes.UserScore}>
      <h3>Current Score:</h3>
      <div
        className={
          displayAnimation ? classes.AnimationStart : classes.AnimationEnd
        }
      >
        <p>{displayedScore}</p>
        <Line />
      </div>
    </div>
  );
};

export default UserScore;
