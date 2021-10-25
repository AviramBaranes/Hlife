import { program } from '@babel/types';
import { AxiosResponse } from 'axios';
import router from 'next/router';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from '../../../styles/pages/schedule-program.module.scss';
import { Workout } from '../../../pages/auth/registration/schedule-program';
import { errorsActions } from '../../../redux/slices/errors/errorsSlice';
import { messagesActions } from '../../../redux/slices/messages/messagesSlice';
import axiosInstance from '../../../utils/axios/axiosInstance';
import { loadingAction } from '../../../redux/slices/loading/loadingSlice';
import { handleAxiosError } from '../../../utils/errors/handleRequestErrors';

interface Program {
  day: string;
  trainingDayName?: string;
  name?: string;
}

type Days =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

const CustomOrder: React.FC<{ workouts: Workout[] }> = ({ workouts }) => {
  const dispatch = useDispatch();

  const days: Days[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const [activeInputs, setActiveInputs] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  const [programs, setPrograms] = useState<Program[]>([]);

  const selectWorkoutHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    const [name, trainingDayName] = value.split('trainingDayName:');
    const newProgramDay: Program = {
      day: id,
      name,
      trainingDayName,
    };

    //find if already has program at this day and update accordingly

    const currentProgramIndex = programs.findIndex(
      (program) => program.day === id
    );
    const updatedProgramsList = [...programs];

    if (currentProgramIndex > -1) {
      if (newProgramDay.trainingDayName) {
        updatedProgramsList[currentProgramIndex] = newProgramDay;
      } else {
        updatedProgramsList[currentProgramIndex] = { day: id };
      }
    } else {
      if (newProgramDay.trainingDayName) {
        updatedProgramsList.push(newProgramDay);
      } else {
        updatedProgramsList.push({ day: newProgramDay.day });
      }
    }
    setPrograms(updatedProgramsList);
    setActiveInputs((prev) => ({ ...prev, [id]: value !== '' }));
  };

  const scheduleProgramHandler = async (e: FormEvent) => {
    e.preventDefault();

    const postOne = (
      day: string,
      workoutName?: string,
      trainingDayName?: string
    ) => {
      if (trainingDayName && workoutName) {
        return axiosInstance.post(`/program/${day}`, {
          workoutName,
          trainingDayName,
        });
      }
      return axiosInstance.post(`/program/${day}`);
    };

    let p = Promise.resolve(undefined) as Promise<
      AxiosResponse<any> | undefined
    >;

    for (let program of programs) {
      const { day, trainingDayName, name } = program;

      p = p.then(() => {
        if (trainingDayName && name) {
          return postOne(day, name, trainingDayName);
        }
        return postOne(day);
      });
    }

    p.then(() => {
      dispatch(loadingAction.setToTrue());
      dispatch(
        messagesActions.newMessage({
          messageTitle: 'Congratulations',
          message: ' You finished all registration steps!',
        })
      );
      router.push('/');
    }).catch((err: any) => {
      handleAxiosError(err, dispatch, 'Schedule your program failed');
    });
    dispatch(loadingAction.setToFalse());
  };

  return (
    <section className={classes.CustomOrder}>
      <h3>Make your own schedule:</h3>
      <form onSubmit={scheduleProgramHandler}>
        {days.map((day) => {
          return (
            <div key={day} className='input-container'>
              <select onChange={selectWorkoutHandler} id={day}>
                <option value='' style={{ display: 'none' }}></option>
                <option value='rest'>rest</option>
                {workouts.map((workout) => (
                  <option
                    key={workout.name + workout.trainingDayName}
                    value={`${workout.name}trainingDayName:${workout.trainingDayName}`}
                  >
                    {workout.name} ({workout.trainingDayName})
                  </option>
                ))}
              </select>
              <label
                className={`${activeInputs[day] ? 'Active' : ''}`}
                htmlFor={day}
              >
                {day}
              </label>
            </div>
          );
        })}
        <div className={classes.CustomOrderBtn}>
          <button
            className='primary-button'
            type='submit'
            disabled={programs.length < 7}
          >
            Continue
          </button>
        </div>
      </form>
    </section>
  );
};

export default CustomOrder;
