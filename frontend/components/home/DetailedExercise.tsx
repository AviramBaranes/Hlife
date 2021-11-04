import React from 'react';

import classes from '../../styles/pages/home.module.scss';
import { Exercise } from '../Registration/workout/Forms/Exercise';

interface DetailedExerciseProps {
  workoutName: string;
  trainingDayName: string;
  time: string;
  exercises?: Exercise[];
  description?: string;
}

const DetailedExercise: React.FC<DetailedExerciseProps> = ({
  workoutName,
  exercises,
  trainingDayName,
  time,
  description,
}) => {
  return (
    <div className={classes.TomorrowMissionModal}>
      <div className={classes.ModalTitle}>
        <h2>
          <strong>{workoutName}</strong> ({trainingDayName})
        </h2>
        <time>{time}</time>
      </div>
      {description && <p>{description}</p>}
      {exercises && exercises.length && (
        <>
          <h4>Exercises:</h4>
          <ul>
            {exercises.map((exercise, i) => (
              <li key={exercise.name + i}>
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
                      {exercise.muscles.join(', ')}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DetailedExercise;
