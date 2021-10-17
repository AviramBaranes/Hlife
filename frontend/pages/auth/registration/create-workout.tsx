import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreateAerobicWorkout from "../../../components/Registration/workout/CreateAerobicWorkout";
import CreateDefaultWorkout from "../../../components/Registration/workout/CreateDefaultWorkout";
import CreateFullBodyWorkout from "../../../components/Registration/workout/CreateFullBodyWorkout";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { redirectedError } from "../../../utils/errors/redirectedError";
import protectRouteHandler from "../../../utils/protectedRoutes/protectedRoutes";

const CreateWorkout: React.FC<{ redirected: boolean }> = ({ redirected }) => {
  if (redirected) {
    const dispatch = useDispatch();
    dispatch(errorsActions.newError(redirectedError));
  }

  const [shouldDisplaySecondForm, setShouldDisplaySecondForm] = useState(false);
  const [programStyle, setProgramStyle] = useState<null | string>(null);
  const [isMultiProgramStyles, setIsMultiProgramStyles] = useState(false);

  useEffect(() => {
    setIsMultiProgramStyles(!!localStorage.getItem("multiProgramStyles"));
    setProgramStyle(localStorage.getItem("programStyle") as string);
  }, []);

  const isAerobic = programStyle === "aerobic" && !isMultiProgramStyles;
  const isFullBody = programStyle === "FB" && !isMultiProgramStyles;
  const isDefault = !isAerobic && !isFullBody && !isMultiProgramStyles;

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
      {isDefault && programStyle && (
        <CreateDefaultWorkout programStyle={programStyle} />
      )}
    </>
  );
};
export default CreateWorkout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const destination = await protectRouteHandler(ctx);

  if (destination === "/auth/registration/create-workout") {
    let redirected = false;
    const cookies = parseCookies(ctx);

    if (cookies.redirected) redirected = true;
    destroyCookie(ctx, "redirected", {
      path: "/",
    });

    return {
      props: { redirected },
    };
  } else {
    ctx.res.setHeader("set-cookie", "redirected=true");
    return {
      redirect: { permanent: false, destination },
    };
  }
};
