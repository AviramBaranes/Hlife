import React, { SetStateAction, useEffect, useState } from "react";
import Input from "../../../UI/Input/Input";

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

  return (
    <div data-testid="GeneralForm">
      <Input
        htmlFor="workoutName"
        inValid={workoutName.length < 4}
        label="Workout Name"
        inputChangeHandler={(e) => {
          setWorkoutName(e.target.value);
          setTouched((prevState) => ({ ...prevState, workoutName: true }));
        }}
        touched={touched.workoutName}
        type="text"
        value={workoutName}
      />
      <Input
        htmlFor="totalTime"
        inValid={!totalTime}
        label="Total Time"
        inputChangeHandler={(e) => {
          setTotalTime(e.target.value);
          setTouched((prevState) => ({ ...prevState, totalTime: true }));
        }}
        touched={touched.totalTime}
        type="time"
        value={totalTime!}
      />
      <label htmlFor="description">Description:</label>
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
