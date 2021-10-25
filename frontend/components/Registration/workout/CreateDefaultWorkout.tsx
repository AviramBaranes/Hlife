import React, { useEffect, useState } from "react";

import classes from '../../../styles/pages/create-workout.module.scss'
import CreateSingleWorkout from "./CreateSingleWorkout";

const CreateDefaultWorkout: React.FC<{ programStyle: string }> = ({
  programStyle,
}) => {
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(()=>{
    return ()=>{
      setSubmitCount(0)
    }
  },[])

  return (
    <>
      {programStyle.split("").map((char, i, arr) => {
        return (
          <div key={char}>
          {i === submitCount&&(
          <div
          className={classes.DefaultWorkout}
          >
            <h3>Create {char}-Workout :</h3>
            <CreateSingleWorkout
              trainingDayName={char}
              setSubmitCount={setSubmitCount}
              last={i === arr.length - 1}
            />
          </div>
      )}
          </div>
        );
      })}
    </>
  );
};

export default CreateDefaultWorkout;
