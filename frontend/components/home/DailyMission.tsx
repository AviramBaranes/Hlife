import router from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from '../../styles/pages/home.module.scss';
import { loadingAction } from '../../redux/slices/loading/loadingSlice';
import { messagesActions } from '../../redux/slices/messages/messagesSlice';
import axiosInstance from '../../utils/axios/axiosInstance';
import { handleAxiosError } from '../../utils/errors/handleRequestErrors';
import { Exercise } from '../Registration/workout/Forms/Exercise';
import Modal from '../UI/Modal/Modal';
import { getAuthHeader } from '../../utils/axios/getHeaders';

interface DailyMissionProps {
  trainingDayName: string;
  exercises?: Exercise[];
  workoutName?: string;
  time: number | null;
}

const DailyMission: React.FC<DailyMissionProps> = ({
  trainingDayName,
  exercises,
  time,
  workoutName,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(
    exercises?.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.name]: false,
      }),
      {} as { [name: string]: boolean }
    )
  );

  const today = new Date();
  const date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  async function completeBtnClickedHandler() {
    if (trainingDayName === 'aerobic' || trainingDayName === 'X') {
      dispatch(loadingAction.setToTrue());
      try {
        const { data } = await axiosInstance.post(
          '/program-exec/',
          {
            isAerobic: trainingDayName === 'aerobic',
          },
          { headers: getAuthHeader() }
        );
        dispatch(loadingAction.setToFalse());
        dispatch(
          messagesActions.newMessage({
            messageTitle: 'Execution Submitted',
            message: data,
          })
        );
        router.reload();
      } catch (err) {
        err;
        handleAxiosError(err, dispatch, 'Failed to submit');
      }
    } else {
      setShowModal(true);
    }
  }

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, checked } = e.target;
    setCompletedExercises((prev) => ({ ...prev, [id]: checked }));
  }

  async function submitFormHandler(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(
        '/program-exec/',
        {
          exercises: completedExercises,
        },
        { headers: getAuthHeader() }
      );
      dispatch(loadingAction.setToFalse());
      dispatch(
        messagesActions.newMessage({
          messageTitle: 'Execution Submitted',
          message: data,
        })
      );
      router.reload();
    } catch (err) {
      handleAxiosError(err, dispatch, 'Failed to submit');
    } finally {
      setShowModal(false);
    }
  }

  return (
    <div className={classes.DailyMission}>
      {showModal && workoutName && exercises?.length && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={classes.DailyMissionModal}>
            <div className={classes.ModalTitle}>
              <h2>
                <strong>{workoutName}</strong> ({trainingDayName})
              </h2>
              <time>{date}</time>
            </div>
            <h4>Exercises: </h4>
            <form onSubmit={submitFormHandler}>
              {exercises.map((exercise, i) => (
                <div key={exercise.name + i} className={classes.Form}>
                  <input
                    onChange={inputChangeHandler}
                    type='checkbox'
                    id={exercise.name}
                  />
                  <div className={classes.Exercise} key={exercise.name + i}>
                    <label htmlFor={exercise.name}>
                      <strong>Name: </strong>
                      {exercise.name}
                    </label>
                    <div>
                      {exercise.description && (
                        <p>
                          <strong>Description: </strong>
                          {exercise.description}
                        </p>
                      )}
                      <p>
                        <strong>Reps: </strong>
                        {exercise.reps}
                      </p>
                      <p>
                        <strong>Sets: </strong>
                        {exercise.sets}
                      </p>

                      {exercise.muscles && (
                        <p>
                          <strong>Muscles: </strong>
                          {exercise.muscles.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <button className='success-button' type='submit'>
                Submit
              </button>
            </form>
          </div>
        </Modal>
      )}
      <h3>Daily Mission:</h3>
      <div>
        {workoutName ? (
          <>
            <p>
              <strong>Workout: </strong>
              {workoutName} ({trainingDayName})
            </p>
            {time && (
              <p>
                <strong>Time: </strong>
                {time} (minutes)
              </p>
            )}
          </>
        ) : (
          <p>
            <strong>Workout: </strong>Rest Day (X)
          </p>
        )}
        <p>
          <strong>Max Points: </strong>
          10
        </p>
      </div>
      <button className='primary-button' onClick={completeBtnClickedHandler}>
        Complete
      </button>
    </div>
  );
};

export default DailyMission;
