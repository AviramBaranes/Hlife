import React, { SetStateAction, useEffect, useState } from "react";

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
    workoutName: "",
    totalTime: "",
  });
  const [touched, setTouched] = useState({
    workoutName: false,
    totalTime: false,
  });

  useEffect(() => {
    if (formSubmitted) {
      setTouched({
        workoutName: false,
        totalTime: false,
      });
    }
    setFormSubmitted && setFormSubmitted(false);
  }, [formSubmitted]);

  useEffect(() => {
    if (touched.workoutName && workoutName.length < 4) {
      setInputClasses((prevState) => ({
        ...prevState,
        workoutName: "inValid",
      }));
    } else {
      setInputClasses((prevState) => ({
        ...prevState,
        workoutName: "",
      }));
    }

    if (touched.totalTime && !totalTime) {
      setInputClasses((prevState) => ({
        ...prevState,
        totalTime: "inValid",
      }));
    } else {
      setInputClasses((prevState) => ({
        ...prevState,
        totalTime: "",
      }));
    }
  }, [workoutName, totalTime]);

  return (
    <div data-testid="GeneralForm">
      <div>
        <input
          className={inputClasses.workoutName}
          required
          id="workoutName"
          onChange={(e) => {
            setWorkoutName(e.target.value);
            setTouched((prevState) => ({ ...prevState, workoutName: true }));
          }}
          type="text"
          value={workoutName}
        />
        <label htmlFor="workoutName">Workout name</label>
      </div>

      <div>
        <input
          className={inputClasses.totalTime}
          required
          id="totalTime"
          onChange={(e) => {
            setTotalTime(e.target.value);
            setTouched((prevState) => ({ ...prevState, totalTime: true }));
          }}
          type="time"
          value={totalTime!}
        />
        <label htmlFor="totalTime">Total time</label>
      </div>

      <label htmlFor="description">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="description"
        cols={30}
        rows={5}
      ></textarea>
    </div>
  );
};

export default WorkoutGeneralInfoForm;
