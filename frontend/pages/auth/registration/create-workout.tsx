import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import CreateAerobicWorkout from "../../../components/Registration/workout/CreateAerobicWorkout";
import CreateDefaultWorkout from "../../../components/Registration/workout/CreateDefaultWorkout";
import CreateFullBodyWorkout from "../../../components/Registration/workout/CreateFullBodyWorkout";
import protectRouteHandler from "../../../utils/protectedRoutes/protectedRoutes";

const CreateWorkout: React.FC = () => {
  const [shouldDisplaySecondForm, setShouldDisplaySecondForm] = useState(false);
  const [programStyle, setProgramStyle] = useState<null | string>(null);
  const [isMultiProgramStyles, setIsMultiProgramStyles] = useState(false);

  useEffect(() => {
    setIsMultiProgramStyles(!!localStorage.getItem("multiProgramStyles"));
    setProgramStyle(localStorage.getItem("programStyle") as string);
  }, []);

  const isAerobic = programStyle === "aerobic";
  const isFullBody = programStyle === "FB";
  const isDefault = !isAerobic && !isFullBody && !isMultiProgramStyles;

  //multiWorkout!
  return (
    <>
      <h3>Create a workout program</h3>
      <p>Choose your exercises for your workouts</p>
      {isMultiProgramStyles && (
        <>
          {!shouldDisplaySecondForm ? (
            <CreateAerobicWorkout
              setShouldDisplaySecondForm={setShouldDisplaySecondForm}
            />
          ) : (
            <CreateFullBodyWorkout />
          )}
        </>
      )}
      {isAerobic && <CreateAerobicWorkout />}
      {isFullBody && <CreateFullBodyWorkout />}
      {isDefault &&
        programStyle &&
        [...programStyle!.split("")].map((char) => {
          return <CreateDefaultWorkout trainingDayName={char} key={char} />;
        })}
    </>
  );
};
//finished
export default CreateWorkout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const destination = await protectRouteHandler(ctx);

  if (destination === "/auth/registration/create-workout") {
    return {
      props: {},
    };
  } else
    return {
      props: {},
      redirect: {
        permanent: false,
        destination,
      },
    };
};
