import React from "react";
import CreateSingleWorkout from "./CreateSingleWorkout";

const CreateFullBodyWorkout: React.FC = () => {
  return (
    <div>
      <h3>Full Body Workout:</h3>
      <CreateSingleWorkout />
    </div>
  );
};

export default CreateFullBodyWorkout;
