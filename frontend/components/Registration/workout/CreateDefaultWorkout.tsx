import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CreateSingleWorkout from "./CreateSingleWorkout";
import { Exercise } from "./Forms/Exercise";
import WorkoutExerciseForm from "./Forms/WorkoutExerciseForm";
import WorkoutGeneralInfoForm from "./Forms/WorkoutGeneralInfoForm";

const CreateDefaultWorkout: React.FC<{ trainingDayName: string }> = ({
  trainingDayName,
}) => {
  return (
    <div>
      <h3>{trainingDayName} Workout:</h3>
      <CreateSingleWorkout />
    </div>
  );
};

export default CreateDefaultWorkout;
