import React, { useEffect, useState } from "react";
import CreateAerobicWorkout from "../../../components/Registration/workout/CreateAerobicWorkout";

const CreateWorkout: React.FC = () => {
  const [programStyle, setProgramStyle] = useState<null | string>(null);
  const [isMultiProgramStyles, setIsMultiProgramStyles] = useState(false);

  useEffect(() => {
    setIsMultiProgramStyles(!!localStorage.getItem("multiProgramStyles"));
    setProgramStyle(localStorage.getItem("programStyle") as string);
  }, []);

  const isAerobic = programStyle === "aerobic";
  const isFullBody = programStyle === "FB";
  const isDefault = !isAerobic && !isFullBody;

  //multiWorkout!
  return (
    <>
      <h3>Create a workout program</h3>
      <p>Choose your exercises for your workouts</p>
      {isMultiProgramStyles && (
        <>
          <CreateAerobicWorkout />
          <CreateFullBodyWorkout />
        </>
      )}
      {isAerobic && <CreateAerobicWorkout />}
      {isFullBody && <CreateFullBodyWorkout />}
      {isDefault &&
        [...programStyle!.split("")].map((char) => {
          return <CreateDefaultWorkout trainingDayName={char} key={char} />;
        })}
    </>
  );
};

export default CreateWorkout;
