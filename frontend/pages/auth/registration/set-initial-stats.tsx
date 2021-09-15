import { GetServerSideProps } from "next";
import router from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FatPercentageField from "../../../components/Registration/generalFields/FatPercentageField";
import MusclesMassField from "../../../components/Registration/generalFields/MusclesMassField";
import RequiredFields from "../../../components/Registration/statsFields/RequiredFields";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import { statsActions } from "../../../redux/slices/stats/statsSlice";
import { RootState } from "../../../redux/store/reduxStore";
import axiosInstance from "../../../utils/axios/axiosInstance";
import protectRouteHandler from "../../../utils/protectedRoutes/protectedRoutes";
import { createStatsProps } from "../../../utils/registration/stats/setInitialStatsHelpers";

const setStats: React.FC<{ displayRequiredFields: boolean }> = ({}) => {
  //state
  const dispatch = useDispatch();
  const { statsReducer } = useSelector((state: RootState) => state);
  const { fatPercentage, musclesMass, weight, rank, height } = statsReducer;
  const [shouldSkipFatPercentage, setShouldSkipFatPercentage] = useState(false);

  //booleans
  const displayRequiredFields = !(weight && rank);
  const shouldDisplayFatPercentageField = Boolean(
    weight && rank && !fatPercentage && !shouldSkipFatPercentage
  );
  const shouldDisplayMusclesMassField = Boolean(
    (weight && rank && fatPercentage) ||
      (weight && rank && shouldSkipFatPercentage)
  );

  const { buttonEventsForFatPercentageField, buttonEventsForMuscleMassField } =
    createStatsProps(
      setShouldSkipFatPercentage,
      dispatch,
      rank,
      weight,
      musclesMass,
      height,
      fatPercentage
    );

  return (
    <>
      <h1>Create your initial stats</h1>
      <p>This action will gain you 15 points!</p>
      {<RequiredFields shouldDisplay={displayRequiredFields} />}

      <FatPercentageField
        instructions="This field is optional"
        shouldDisplay={shouldDisplayFatPercentageField}
        title="What is your current fat percentage?"
        buttonEvents={buttonEventsForFatPercentageField}
      />

      <MusclesMassField
        instructions="This field is optional"
        shouldDisplay={shouldDisplayMusclesMassField}
        title="What is your current muscles mass?"
        buttonEvents={buttonEventsForMuscleMassField}
      />
    </>
  );
};

export default setStats;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const destination = await protectRouteHandler(ctx);

  if (destination === "/auth/registration/set-stats") {
    return { props: { displayRequiredFields: true } };
  } else {
    return { redirect: { destination }, props: {} };
  }
};
