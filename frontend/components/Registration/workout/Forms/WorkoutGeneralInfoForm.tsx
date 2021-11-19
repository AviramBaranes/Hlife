import React, { SetStateAction, useEffect, useState } from 'react';

import classes from '../../../../styles/pages/create-workout.module.scss';

interface WorkoutGeneralInfoFormProps {
  workoutName: string;
  setWorkoutName: React.Dispatch<SetStateAction<string>>;
  totalTime: string;
  setTotalTime: React.Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<SetStateAction<string>>;
  formSubmitted?: boolean;
  setFormSubmitted?: React.Dispatch<SetStateAction<boolean>>;
}

const WorkoutGeneralInfoForm: React.FC<WorkoutGeneralInfoFormProps> = ({
  setTotalTime,
  totalTime,
  workoutName,
  setWorkoutName,
  description,
  setDescription,
  formSubmitted,
  setFormSubmitted,
}) => {
  const [inputClasses, setInputClasses] = useState({
    workoutName: '',
    totalTime: '',
  });
  const [touched, setTouched] = useState({
    workoutName: false,
    totalTime: false,
  });
  const [activeInputs, setActiveInputs] = useState({
    name: false,
    time: false,
    desc: false,
  });

  useEffect(() => {
    if (formSubmitted) {
      setTouched({
        workoutName: false,
        totalTime: false,
      });
    }
    setFormSubmitted && setFormSubmitted(false);
  }, [formSubmitted, setFormSubmitted]);

  useEffect(() => {
    if (touched.workoutName && workoutName.length < 4 && !formSubmitted) {
      setInputClasses((prevState) => ({
        ...prevState,
        workoutName: 'inValid',
      }));
    } else {
      setInputClasses((prevState) => ({
        ...prevState,
        workoutName: '',
      }));
    }

    if (touched.totalTime && !totalTime && !formSubmitted) {
      setInputClasses((prevState) => ({
        ...prevState,
        totalTime: 'inValid',
      }));
    } else {
      setInputClasses((prevState) => ({
        ...prevState,
        totalTime: '',
      }));
    }
  }, [workoutName, totalTime, touched, formSubmitted]);

  return (
    <div className={classes.GeneralInfo} data-testid='GeneralForm'>
      <div className={classes.GI_Inputs}>
        <div className='input-container'>
          <input
            className={inputClasses.workoutName}
            required
            id='workoutName'
            onChange={(e) => {
              setActiveInputs((prev) => ({
                ...prev,
                name: e.target.value !== '',
              }));
              setWorkoutName(e.target.value);
              setTouched((prevState) => ({ ...prevState, workoutName: true }));
            }}
            type='text'
            value={workoutName}
          />
          <label
            className={activeInputs.name ? 'Active' : ''}
            htmlFor='workoutName'
          >
            Workout name
          </label>
        </div>

        <div className='input-container'>
          <input
            className={inputClasses.totalTime}
            required
            id='totalTime'
            onChange={(e) => {
              setActiveInputs((prev) => ({
                ...prev,
                time: e.target.value !== '',
              }));
              setTotalTime(e.target.value);
              setTouched((prevState) => ({ ...prevState, totalTime: true }));
            }}
            type='time'
            value={totalTime!}
          />
          <label
            className={activeInputs.time ? 'Active' : ''}
            htmlFor='totalTime'
          >
            Total time
          </label>
        </div>
      </div>

      <div className={classes.GI_Inputs}>
        <div className='input-container'>
          <textarea
            value={description}
            onChange={(e) => {
              setActiveInputs((prev) => ({
                ...prev,
                desc: e.target.value !== '',
              }));
              setDescription(e.target.value);
            }}
            id='description'
            cols={30}
            rows={5}
          ></textarea>
          <label
            className={activeInputs.desc ? 'Active' : ''}
            htmlFor='description'
          >
            Description
          </label>
        </div>
      </div>
    </div>
  );
};

export default WorkoutGeneralInfoForm;
