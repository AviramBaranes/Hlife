import router from 'next/router';
import React, { SetStateAction, useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import classes from '../../../styles/pages/create-workout.module.scss';
import plusIcon from '../../../public/icons/plus-icon.svg';
import { messagesActions } from '../../../redux/slices/messages/messagesSlice';
import axiosInstance from '../../../utils/axios/axiosInstance';
import Modal from '../../UI/Modal/Modal';
import WorkoutGeneralInfoForm from './Forms/WorkoutGeneralInfoForm';
import { loadingAction } from '../../../redux/slices/loading/loadingSlice';
import { handleAxiosError } from '../../../utils/errors/handleRequestErrors';

interface Workout {
  name: string;
  time: number;
  description?: string;
}
interface CreateAerobicWorkoutProps {
  setShouldDisplaySecondForm?: React.Dispatch<SetStateAction<boolean>>;
}

const CreateAerobicWorkout: React.FC<CreateAerobicWorkoutProps> = ({
  setShouldDisplaySecondForm,
}) => {
  const dispatch = useDispatch();
  const isMultiProgram = !!localStorage.getItem('multiProgramStyles');
  let timesPerWeek = +localStorage.getItem('timesPerWeek')!;
  isMultiProgram && timesPerWeek--;

  const [showModal, setShowModal] = useState(true);
  const [workout, setWorkout] = useState<Workout[]>([]);
  const [description, setDescription] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const createWorkoutHandler = async () => {
    try {
      dispatch(loadingAction.setToTrue());
      workout.forEach(async (singleWorkout) => {
        const requestBody = {
          trainingDayName: 'aerobic',
          name: singleWorkout.name,
          time: singleWorkout.time,
          exercises: [],
        } as {
          trainingDayName: string;
          name: string;
          description?: string;
          time: number;
        };

        if (singleWorkout.description)
          requestBody.description = singleWorkout.description;

        await axiosInstance.post('/workout/', requestBody);
      });

      // the last workout is not in the state so I need to post it manually
      const [hours, minutes] = totalTime.split(':');
      const time = +hours * 60 + +minutes;

      const requestBody = {
        trainingDayName: 'aerobic',
        name: workoutName,
        time,
        exercises: [],
      } as {
        trainingDayName: string;
        name: string;
        description?: string;
        time: number;
      };

      if (description) requestBody.description = description;

      const { data } = await axiosInstance.post('/workout/', requestBody);

      if (!setShouldDisplaySecondForm) {
        const { data } = await axiosInstance.post('/workout/hasAllWorkout');

        dispatch(
          messagesActions.newMessage({
            messageTitle: 'Workout created successfully!',
            message: data,
          })
        );
        router.push('/auth/registration/schedule-program');
      }

      if (setShouldDisplaySecondForm) {
        dispatch(
          messagesActions.newMessage({
            messageTitle: 'Workout created successfully!',
            message: data,
          })
        );
        setShouldDisplaySecondForm(true);
      }
      dispatch(loadingAction.setToFalse());
    } catch (err: any) {
      handleAxiosError(err, dispatch, 'Create Workout Failed');
    }
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setWorkout((prevState) => {
      const [hours, minutes] = totalTime.split(':');
      const time = +hours * 60 + +minutes;
      return [
        ...prevState,
        {
          name: workoutName,
          time,
          description: description,
        },
      ];
    });
    setWorkoutName('');
    setTotalTime('');
    setDescription('');
    setFormSubmitted(true);

    dispatch(
      messagesActions.newMessage({
        messageTitle: 'Workout Added',
        message: 'Workout added successfully you can now enter another one',
      })
    );
  };

  return (
    <div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={classes.ModalMsg}>
            <p>
              While creating workout dont refresh the page or data you entered
              will be lost.
            </p>
            <button
              className='success-button'
              type='button'
              disabled={false}
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </Modal>
      )}
      <h3>Create aerobic workout</h3>
      <h4>Workout {workout.length + 1}:</h4>
      <form onSubmit={submitFormHandler}>
        <WorkoutGeneralInfoForm
          totalTime={totalTime}
          description={description}
          setDescription={setDescription}
          setTotalTime={setTotalTime}
          setWorkoutName={setWorkoutName}
          workoutName={workoutName}
          formSubmitted={formSubmitted}
          setFormSubmitted={setFormSubmitted}
        />

        <button
          className={`skip-button ${classes.skipButton}`}
          disabled={
            workoutName.length < 4 ||
            !totalTime ||
            workout.length + 1 >= timesPerWeek!
          }
          type='submit'
          style={{
            display: `${
              workout.length + 1 >= timesPerWeek! ? 'none' : 'block'
            }`,
          }}
        >
          Add another
          <span>
            {plusIcon && (
              <Image
                src={plusIcon}
                width={12.5}
                height={12.5}
                alt='plus icon'
              />
            )}
          </span>
        </button>
      </form>

      <div className={classes.AerobicButton}>
        <button
          className='primary-button'
          onClick={createWorkoutHandler}
          type='submit'
          disabled={workoutName.length < 4 || !totalTime}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateAerobicWorkout;
