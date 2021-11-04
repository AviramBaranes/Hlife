import React, { useState } from 'react';

import classes from '../../styles/pages/program.module.scss';
import { ProgramObj } from '../../types/Program';
import DetailedExercise from '../home/DetailedExercise';
import { Exercise } from '../Registration/workout/Forms/Exercise';
import Modal from '../UI/Modal/Modal';

const ProgramTable: React.FC<{ fullProgram: ProgramObj[] }> = ({
  fullProgram,
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
    exercises && setExercises(exercises);
    description && setDescription(description);
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
        <tr>
          <th>Day</th>
          {/* <td>Sun</td>
          <td>Mon</td>
          <td>Tue</td>
          <td>Wed</td>
          <td>Thu</td>
          <td>Fri</td>
          <td>Sat</td> */}
          {fullProgram.map((program) => (
            <td
              onClick={() => detailedWorkoutHandler(program)}
              style={{ cursor: program.workout?.name ? 'pointer' : 'default' }}
            >
              {program.day.substring(0, 3)}
            </td>
          ))}
        </tr>
        <tr>
          <th>Name</th>
          {fullProgram.map((program) => (
            <td
              onClick={() => detailedWorkoutHandler(program)}
              style={{ cursor: program.workout?.name ? 'pointer' : 'default' }}
            >
              {program.workout?.name || 'Rest'}{' '}
            </td>
          ))}
        </tr>
        <tr>
          <th>Time</th>
          {fullProgram.map((program) => (
            <td
              onClick={() => detailedWorkoutHandler(program)}
              style={{ cursor: program.workout?.name ? 'pointer' : 'default' }}
            >
              {program.workout?.time ? `${program.workout?.time} (m)` : '-'}
            </td>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default ProgramTable;
