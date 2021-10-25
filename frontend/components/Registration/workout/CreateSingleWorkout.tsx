import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import router from 'next/router';
import React, { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from '../../../styles/pages/create-workout.module.scss';
import { errorsActions } from '../../../redux/slices/errors/errorsSlice';
import { messagesActions } from '../../../redux/slices/messages/messagesSlice';
import axiosInstance from '../../../utils/axios/axiosInstance';
import { Exercise } from './Forms/Exercise';
import WorkoutExerciseForm from './Forms/WorkoutExerciseForm';
import WorkoutGeneralInfoForm from './Forms/WorkoutGeneralInfoForm';
import { loadingAction } from '../../../redux/slices/loading/loadingSlice';
import { handleAxiosError } from '../../../utils/errors/handleRequestErrors';

const CreateSingleWorkout: React.FC<{
  trainingDayName: string;
  setSubmitCount?: React.Dispatch<SetStateAction<number>>;
  last?: boolean;
}> = ({ trainingDayName, setSubmitCount, last }) => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [workoutName, setWorkoutName] = useState('');

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [numberOfFields, setNumberOfFields] = useState([1, 2, 3]);

  async function submitWorkoutHandler(e: React.FormEvent) {
    e.preventDefault();

    const [hours, minutes] = totalTime.split(':');
    const time = +hours * 60 + +minutes;

    try {
      const bodyRequest: {
        trainingDayName: string;
        name: string;
        time: number;
        exercises: Exercise[];
        description?: string;
      } = {
        trainingDayName,
        name: workoutName,
        time,
        exercises,
      };

      if (description) bodyRequest.description = description;

      dispatch(loadingAction.setToTrue());
      await axiosInstance.post('/workout', bodyRequest);

      if (setSubmitCount) {
        window.scrollTo(0, 0);
        setSubmitCount((prevState) => ++prevState);
      }

      if (trainingDayName === 'FB' || last) {
        const { data } = await axiosInstance.post('/workout/hasAllWorkout');
        dispatch(
          messagesActions.newMessage({
            messageTitle: 'Created workout successfully',
            message: data,
          })
        );
        dispatch(loadingAction.setToFalse());
        router.push('/auth/registration/schedule-program');
      }
    } catch (err: any) {
      handleAxiosError(err, dispatch, 'Failed to create workout');
    }
  }

  return (
    <div className={classes.CreateSingleWorkout}>
      <form onSubmit={submitWorkoutHandler}>
        <WorkoutGeneralInfoForm
          description={description}
          setDescription={setDescription}
          totalTime={totalTime}
          setTotalTime={setTotalTime}
          workoutName={workoutName}
          setWorkoutName={setWorkoutName}
        />

        {numberOfFields.map((field, i) => {
          return (
            <div className={classes.ExerciseSection} key={field * i}>
              <h4>{field}</h4>
              <hr />
              <WorkoutExerciseForm setExercises={setExercises} />
            </div>
          );
        })}

        <div className={classes.Buttons}>
          <button
            type='button'
            className={`skip-button ${classes.skipButton}`}
            onClick={() =>
              setNumberOfFields((prevState) => [
                ...prevState,
                prevState[prevState.length - 1] + 1,
              ])
            }
          >
            More
            <span>
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </button>

          <button
            className='primary-button'
            type='submit'
            disabled={!exercises.length || !totalTime || !workoutName}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSingleWorkout;
