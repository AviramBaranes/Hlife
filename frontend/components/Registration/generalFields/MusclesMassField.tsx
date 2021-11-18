import React, { useState } from 'react';
import Image from 'next/image';

import classes from '../../../styles/components/PhysicalGoalsFields.module.scss';
import slimBodyImage from '../../../assets/images/fat-percentage-images/fatPercentage5.png';
import bigBodyImage from '../../../assets/images/muscle-body.png';
import biggestBodyImage from '../../../assets/images/body-builder-body.png';

import RangeInput from '../../UI/RangeInput/RangeInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';

interface MusclesMassFieldProps {
  instructions: string | null;
  basicGoal?: string;
  shouldDisplay: boolean;
  title: string;
  buttonsEvents: {
    continue: (desiredMusclesMass: number) => void;
    skip: () => void;
  };
}

const MusclesMassField: React.FC<MusclesMassFieldProps> = ({
  instructions,
  basicGoal,
  shouldDisplay,
  title,
  buttonsEvents,
}) => {
  const [desiredMusclesMass, setDesiredMusclesMass] = useState('50');
  const [inputTouched, setInputTouched] = useState(false);
  const [currentImage, setCurrentImage] = useState(slimBodyImage);

  const allowedToSkip = basicGoal === 'lose fat' || basicGoal === undefined;

  function rangeInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (+value <= 55) {
      setCurrentImage(slimBodyImage);
    } else if (+value <= 95) {
      setCurrentImage(bigBodyImage);
    } else {
      setCurrentImage(biggestBodyImage);
    }
    setDesiredMusclesMass(e.target.value);
    setInputTouched(true);
  }

  return (
    <section
      className={classes.Main}
      style={{ display: `${shouldDisplay ? 'block' : 'none'}` }}
    >
      <h3>{title}</h3>
      <p>{instructions}</p>
      <div className={classes.Field}>
        {currentImage && (
          <Image src={currentImage} alt='muscles mass illustration' />
        )}
        <RangeInput
          testId='musclesMassInput'
          min='25'
          max='125'
          step='1'
          unit='Kg'
          value={desiredMusclesMass}
          onChange={rangeInputChangeHandler}
        />
        <h5>{desiredMusclesMass}Kg</h5>
      </div>
      <div className={classes.Buttons}>
        <button
          className='primary-button'
          type='button'
          disabled={!inputTouched}
          onClick={() => buttonsEvents.continue(+desiredMusclesMass)}
        >
          Continue
        </button>
        <button
          className='skip-button'
          style={{ display: `${allowedToSkip ? 'block' : 'none'}` }}
          type='button'
          disabled={!allowedToSkip}
          onClick={buttonsEvents.skip}
        >
          Skip
          <span>
            <FontAwesomeIcon icon={faForward} />
          </span>
        </button>
      </div>
    </section>
  );
};

export default MusclesMassField;
