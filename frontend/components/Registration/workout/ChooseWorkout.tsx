import router from 'next/router';
import React, { Dispatch } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';

import classes from '../../../styles/pages/choose-workout.module.scss';
import { errorsActions } from '../../../redux/slices/errors/errorsSlice';
import axiosInstance from '../../../utils/axios/axiosInstance';
import { loadingAction } from '../../../redux/slices/loading/loadingSlice';
import { getAuthHeader } from '../../../utils/axios/getHeaders';

interface ChooseWorkoutProps {
  programStyle: string;
  description: string;
  workoutDaysPerWeek: number;
  restDaysPerWeek: number;
  order: string;
  setDisplay: Dispatch<React.SetStateAction<boolean>>;
  multiProgramStyles?: boolean;
}

const ChooseWorkout: React.FC<ChooseWorkoutProps> = ({
  programStyle,
  description,
  workoutDaysPerWeek,
  restDaysPerWeek,
  order,
  setDisplay,
  multiProgramStyles,
}) => {
  const dispatch = useDispatch();

  const ConfirmBtnHandler = async () => {
    try {
      dispatch(loadingAction.setToTrue());

      multiProgramStyles && localStorage.setItem('multiProgramStyles', 'true');
      localStorage.setItem('programStyle', programStyle);
      localStorage.setItem('timesPerWeek', workoutDaysPerWeek.toString());
      localStorage.setItem('order', order);
      document.cookie += ';choseWorkout=true;path=/;';

      await router.push('/auth/registration/create-workout');
      dispatch(loadingAction.setToFalse());
    } catch (err) {
      dispatch(
        errorsActions.newError({
          errorTitle: 'Something went wrong',
          errorMessage: 'Try to refresh',
        })
      );
      dispatch(loadingAction.setToFalse());
    }
  };

  return (
    <div>
      <Head>
        <title>Registration</title>
        <meta name='description' content='Choose your workout' />
      </Head>
      <section className={classes.Title}>
        <h3>Choose a workout program</h3>
        <p>You can follow our recommendations or create a custom program.</p>
      </section>
      <section className={classes.Recommendations}>
        <h4>Recommendations:</h4>
        <h5>
          <strong>Program Style: </strong>
          {programStyle}
        </h5>
        <h5>
          <strong>Description: </strong>
          {description}
        </h5>
        <h5>
          <strong>Times Per Week: </strong>
          {workoutDaysPerWeek} workout days, and {restDaysPerWeek} rest days.
        </h5>
        <h5>
          <strong>Order: </strong>
          {order}
        </h5>
      </section>
      <div className={classes.Button}>
        <button
          className='primary-button'
          onClick={ConfirmBtnHandler}
          disabled={false}
          type='button'
        >
          Confirm
        </button>
      </div>
      <section className={classes.Footer}>
        <h5>
          <strong>Do you want to make your own custom workout?</strong>
        </h5>
        <button
          className='success-button'
          disabled={false}
          type='button'
          onClick={() => {
            setDisplay(false);
          }}
        >
          Yes
        </button>
      </section>
    </div>
  );
};

export default ChooseWorkout;
