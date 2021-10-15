import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import ChooseWorkout from "../../../components/Registration/workout/ChooseWorkout";
import protectRouteHandler from "../../../utils/protectedRoutes/protectedRoutes";
import { calculateRecommendationWorkout } from "../../../utils/registration/workout/chooseWorkoutHelper";
import { useDispatch } from "react-redux";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import CustomWorkout from "../../../components/Registration/workout/CustomWorkout";
import { redirectedError } from "../../../utils/errors/redirectedError";

interface ChooseWorkoutProps {
  programStyle: string;
  description: string;
  workoutDaysPerWeek: number;
  restDaysPerWeek: number;
  order: string;
  multiProgramStyles?: boolean;
  error?: boolean;
  redirected: boolean;
}

const ChooseWorkoutPage: React.FC<ChooseWorkoutProps> = (props) => {
  const dispatch = useDispatch();
  const [displayRecommendations, setDisplayRecommendations] = useState(true);

  if (props.redirected) {
    dispatch(errorsActions.newError(redirectedError));
  }

  if (props.error) {
    dispatch(
      errorsActions.newError({
        errorTitle: "Something went wrong",
        errorMessage: "Try to refresh",
      })
    );
  }

  if (!displayRecommendations) {
    return <CustomWorkout setDisplay={setDisplayRecommendations} />;
  }

  return <ChooseWorkout {...props} setDisplay={setDisplayRecommendations} />;
};

export default ChooseWorkoutPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const destination = await protectRouteHandler(ctx);

  if (destination !== "/auth/registration/choose-workout") {
    return {
      redirect: { permanent: false, destination },
    };
  }
  const cookies = parseCookies(ctx);

  const recommendation = await calculateRecommendationWorkout(cookies);
  const { url } = ctx.req;
  let redirected = false;

  if (url !== destination) redirected = true;

  return {
    props: { ...recommendation, redirected },
  };
};
