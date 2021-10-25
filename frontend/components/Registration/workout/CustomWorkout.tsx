import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import router from 'next/router';
import React, { SetStateAction, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { loadingAction } from '../../../redux/slices/loading/loadingSlice';

import classes from '../../../styles/pages/choose-workout.module.scss';
import axiosInstance from '../../../utils/axios/axiosInstance';
import { handleAxiosError } from '../../../utils/errors/handleRequestErrors';

interface FormState {
  programStyle: string;
  timesPerWeek: string;
  isFormValid: boolean;
  selectActive: boolean;
  timesPerWeekActive: boolean;
}

type FormAction =
  | { type: 'PROGRAM_SELECT'; programStyle: string }
  | { type: 'TIMES_PER_WEEK'; timesPerWeek: string }
  | { type: 'FORM_VALIDITY' };

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case 'PROGRAM_SELECT':
      return {
        ...state,
        programStyle: action.programStyle,
        selectActive: action.programStyle !== '',
      };
    case 'TIMES_PER_WEEK':
      return {
        ...state,
        timesPerWeek: action.timesPerWeek,
        timesPerWeekActive: action.timesPerWeek !== '',
      };
    case 'FORM_VALIDITY':
      if (
        state.programStyle &&
        +state.timesPerWeek < 8 &&
        +state.timesPerWeek > 0
      ) {
        return { ...state, isFormValid: true };
      }
      return { ...state };
    default:
      return { ...state };
  }
};

const formInitialState: FormState = {
  programStyle: '',
  timesPerWeek: '',
  isFormValid: false,
  selectActive: false,
  timesPerWeekActive: false,
};

const CustomWorkout: React.FC<{
  setDisplay: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setDisplay }) => {
  //
  const dispatch = useDispatch();
  const [formState, dispatchFormAction] = useReducer(
    formReducer,
    formInitialState
  );

  const programStyleSelectHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatchFormAction({
      type: 'PROGRAM_SELECT',
      programStyle: e.target.value,
    });
    dispatchFormAction({ type: 'FORM_VALIDITY' });
  };

  const timesPerWeekChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatchFormAction({
      type: 'TIMES_PER_WEEK',
      timesPerWeek: e.target.value,
    });
    dispatchFormAction({ type: 'FORM_VALIDITY' });
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchFormAction({ type: 'FORM_VALIDITY' });

    if (!formState.isFormValid) return;
    try {
      dispatch(loadingAction.setToTrue());
      await axiosInstance.get('/chose-workout');

      localStorage.setItem('programStyle', formState.programStyle);
      localStorage.setItem('timesPerWeek', formState.timesPerWeek);

      await router.push('/auth/registration/create-workout');
      dispatch(loadingAction.setToFalse());
    } catch (err: any) {
      handleAxiosError(err, dispatch, 'Something went wrong');
    }
  };

  return (
    <div>
      <section className={classes.Title}>
        <h3>Create a workout program</h3>
        <p>create your own custom workout program</p>
      </section>
      <form className={classes.Form} onSubmit={formSubmitHandler}>
        <div className='input-container'>
          <select
            role='listbox'
            value={formState.programStyle}
            onChange={programStyleSelectHandler}
            id='programSelect'
            name='program-style'
          >
            <option value='' style={{ display: 'none' }}></option>
            <option value='FB'>FB</option>
            <option value='aerobic'>aerobic</option>
            <option value='AB'>AB</option>
            <option value='ABC'>ABC</option>
            <option value='ABCD'>ABCD</option>
          </select>
          <label
            className={formState.selectActive ? 'Active' : ''}
            htmlFor='programSelect'
          >
            Program style
          </label>
        </div>

        <div className='input-container'>
          <input
            value={formState.timesPerWeek.toString()}
            onChange={timesPerWeekChangeHandler}
            type='number'
            id='times-per-week'
            min={1}
            max={7}
            step={1}
          />
          <label
            className={formState.timesPerWeekActive ? 'Active' : ''}
            htmlFor='times-per-week'
          >
            Times per week
          </label>
        </div>
        <button
          className='primary-button'
          type='submit'
          disabled={!formState.isFormValid}
        >
          Continue
        </button>
      </form>
      <div className={classes.Button}>
        <button
          className='danger-button'
          disabled={false}
          type='button'
          onClick={() => setDisplay(true)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CustomWorkout;
