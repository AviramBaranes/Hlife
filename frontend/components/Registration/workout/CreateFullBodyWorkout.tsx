import React from "react";
import CreateSingleWorkout from "./CreateSingleWorkout";

const CreateFullBodyWorkout: React.FC = () => {
  return (
    <div>
      <h3>Create Full Body Workout</h3>
      <CreateSingleWorkout trainingDayName="FB" />
    </div>
  );
};

export default CreateFullBodyWorkout;
