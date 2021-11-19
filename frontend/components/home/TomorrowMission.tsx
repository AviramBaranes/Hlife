import React, { useState } from 'react';
import Image from 'next/image';

import classes from '../../styles/pages/home.module.scss';
import plusIcon from '../../public/icons/plus-icon.svg';
import { Exercise } from '../Registration/workout/Forms/Exercise';
import Modal from '../UI/Modal/Modal';
import DetailedExercise from './DetailedExercise';

interface TomorrowMissionProps {
  trainingDayName: string;
  exercises?: Exercise[];
  workoutName?: string;
  time: number | null;
}

const TomorrowMission: React.FC<TomorrowMissionProps> = ({
  trainingDayName,
  exercises,
  time,
  workoutName,
}) => {
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const tomorrow =
    today.getDate() +
    1 +
    '-' +
    (today.getMonth() + 1) +
    '-' +
    today.getFullYear();

  return (
    <div className={classes.TomorrowMission}>
      {showModal && exercises?.length && workoutName && (
        <Modal onClose={() => setShowModal(false)}>
          <DetailedExercise
            exercises={exercises}
            time={tomorrow}
            trainingDayName={trainingDayName}
            workoutName={workoutName}
          />
        </Modal>
      )}
      <h3>Tomorrow Mission:</h3>
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
        <p>(You already did and declared your workout for today)</p>
      </div>
      {!!exercises?.length && workoutName && (
        <button className='skip-button' onClick={() => setShowModal(true)}>
          More
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
      )}
    </div>
  );
};

export default TomorrowMission;
