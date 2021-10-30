import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Exercise } from '../Registration/workout/Forms/Exercise';
import Modal from '../UI/Modal/Modal';

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
    <div>
      {showModal && exercises?.length && workoutName && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>
            {workoutName} <time>{tomorrow}</time>
          </h1>
          <h3>Exercises:</h3>
          <ul>
            {exercises.map((exercise) => (
              <li>
                <div>
                  <p>
                    <strong>Name:</strong>
                    {exercise.name}
                  </p>
                  <p>
                    <strong>Reps:</strong>
                    {exercise.reps}
                  </p>
                  <p>
                    <strong>Sets:</strong>
                    {exercise.sets}
                  </p>
                  {exercise.description && (
                    <p>
                      <strong>Description:</strong>
                      {exercise.description}
                    </p>
                  )}
                  {exercise.muscles && (
                    <p>
                      <strong>Muscles:</strong>
                      {exercise.muscles}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
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
        <p>(You already did and declared your workout for today.)</p>
      </div>
      {exercises?.length && workoutName && (
        <button className='skip-button' onClick={() => setShowModal(true)}>
          More
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </button>
      )}
    </div>
  );
};

export default TomorrowMission;
