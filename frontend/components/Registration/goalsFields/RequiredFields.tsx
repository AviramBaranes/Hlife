import React, { useState } from 'react';
import Image from 'next/image';

import classes from '../../../styles/pages/set-goals.module.scss';
import slimBody from '../../../assets/images/fat-percentage-images/fatPercentage5.png';
import muscleBody from '../../../assets/images/muscle-body.png';
import RangeInput from '../../UI/RangeInput/RangeInput';
import { useDispatch } from 'react-redux';
import { goalsActions } from '../../../redux/slices/goals/goalsSlice';

const RequiredFields: React.FC<{ shouldDisplay: boolean }> = ({
  shouldDisplay,
}) => {
  const dispatch = useDispatch();

  const [basicGoal, setBasicGoal] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('80');
  const [touched, setTouched] = useState(false);
  const [active, setActive] = useState({
    loseFatOption: false,
    gainMuscleOption: false,
  });

  const rangeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    setDesiredWeight(e.target.value);
  };

  const basicGoalChangeHandler = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    let basicGoal: 'lose fat' | 'increase muscles mass';

    if (e.currentTarget.children[0].textContent === 'Lose Fat') {
      basicGoal = 'lose fat';
      setActive({ loseFatOption: true, gainMuscleOption: false });
    }
    if (e.currentTarget.children[0].textContent === 'Gain Muscle') {
      basicGoal = 'increase muscles mass';
      setActive({ loseFatOption: false, gainMuscleOption: true });
    }

    setBasicGoal(basicGoal!);
  };

  const submitFieldsHandler = () => {
    dispatch(
      goalsActions.addRequiredFields({
        basicGoal,
        desiredWeight: +desiredWeight,
      })
    );
  };

  return (
    <>
      <section
        className={classes.RequiredField}
        style={{ display: `${shouldDisplay ? 'block' : 'none'}` }}
      >
        <section className={classes.Title}>
          <h1>Fill Your Goals</h1>
          <p>
            This will help us create for you a program that suits you, And to
            track your progress
          </p>
        </section>
        <h3>
          What is your basic goal ?<span>*</span>
        </h3>
        <div className={classes.GoalOptions}>
          <div
            className={`${classes.Option} ${
              active.loseFatOption ? classes.Active : ''
            }`}
            onClick={basicGoalChangeHandler}
          >
            <h4>Lose Fat</h4>
            {slimBody && <Image src={slimBody} alt='slim body illustration' />}
          </div>
          <div
            className={`${classes.Option} ${
              active.gainMuscleOption ? classes.Active : ''
            }`}
            onClick={basicGoalChangeHandler}
          >
            <h4>Gain Muscle</h4>
            {muscleBody && (
              <Image src={muscleBody} alt='muscular body illustration' />
            )}
          </div>
        </div>
        <div className={classes.WeightSection}>
          <h3>
            What is your desired weight ?<span>*</span>
          </h3>
          <RangeInput
            testId='goalsRequiredFields'
            min='30'
            name='desired-weight'
            max='225'
            step='1'
            value={desiredWeight}
            onChange={rangeChangeHandler}
          />
          <h5>{desiredWeight}</h5>
        </div>
        <button
          className='primary-button'
          disabled={!basicGoal && !touched}
          type='button'
          onClick={submitFieldsHandler}
        >
          Continue
        </button>
      </section>
    </>
  );
};

export default RequiredFields;
