import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import classes from '../../styles/pages/program.module.scss';
import { ProgramObj } from '../../types/Program';
import DetailedExercise from '../home/DetailedExercise';
import { Exercise } from '../Registration/workout/Forms/Exercise';
import Modal from '../UI/Modal/Modal';

interface ProgramTableProps {
  fullProgram: ProgramObj[];
  weeklyExecutions: (boolean | null)[];
}

const ProgramTable: React.FC<ProgramTableProps> = ({
  fullProgram,
  weeklyExecutions,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutName, setWorkoutName] = useState('');
  const [trainingDayName, setTrainingDayName] = useState('');
  const [description, setDescription] = useState('');

  function detailedWorkoutHandler(program: ProgramObj) {
    if (!program.workout) return;
    const { description, exercises, name, time, trainingDayName } =
      program.workout;

    setWorkoutName(name);
    setTrainingDayName(trainingDayName);
    setDescription(description || '');
    exercises && setExercises(exercises);
    time &&
      setTime(
        `${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')} (h)`
      );
    setShowModal(true);
  }

  return (
    <div className={classes.ProgramTable}>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DetailedExercise
            description={description}
            time={time}
            exercises={exercises}
            trainingDayName={trainingDayName}
            workoutName={workoutName}
          />
        </Modal>
      )}
      <h3>Your Program</h3>
      <p>You can press on the workout name for more details</p>
      <table>
        <tbody>
          <tr>
            <th>Day</th>
            {fullProgram.map((program, i) => (
              <td
                key={program.day}
                onClick={() => detailedWorkoutHandler(program)}
                style={{
                  cursor: program.workout?.name ? 'pointer' : 'default',
                }}
              >
                {program.day.substring(0, 3)}
              </td>
            ))}
          </tr>
          <tr>
            <th>Name</th>
            {fullProgram.map((program) => (
              <td
                key={program.day}
                onClick={() => detailedWorkoutHandler(program)}
                style={{
                  cursor: program.workout?.name ? 'pointer' : 'default',
                }}
              >
                {program.workout?.name || 'Rest'}
              </td>
            ))}
          </tr>
          <tr>
            <th>Time</th>
            {fullProgram.map((program) => (
              <td
                key={program.day}
                onClick={() => detailedWorkoutHandler(program)}
                style={{
                  cursor: program.workout?.name ? 'pointer' : 'default',
                }}
              >
                {program.workout?.time ? `${program.workout?.time} (m)` : '-'}
              </td>
            ))}
          </tr>
          <tr>
            <th>Executions</th>
            {fullProgram.map((program, i) => (
              <td
                key={program.day}
                onClick={() => detailedWorkoutHandler(program)}
                style={{
                  cursor: program.workout?.name ? 'pointer' : 'default',
                }}
              >
                {weeklyExecutions[i] === true && (
                  <FontAwesomeIcon icon={faStar} />
                )}
                {weeklyExecutions[i] === null && '-'}
                {weeklyExecutions[i] === false && (
                  <FontAwesomeIcon icon={faStarHalfAlt} />
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProgramTable;
