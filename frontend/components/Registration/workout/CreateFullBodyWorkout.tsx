import React from "react";

import classes from '../../../styles/pages/create-workout.module.scss'
import CreateSingleWorkout from "./CreateSingleWorkout";

const CreateFullBodyWorkout: React.FC = () => {
  return (
    <div className={classes.FBWorkout} >
      <h3>Create A Full Body Workout</h3>
      <CreateSingleWorkout trainingDayName="FB" />
    </div>
  );
};

export default CreateFullBodyWorkout;
