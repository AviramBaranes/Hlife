import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FatPercentageField from "../../../components/Registration/generalFields/FatPercentageField";
import MusclesMassField from "../../../components/Registration/generalFields/MusclesMassField";
import RequiredFields from "../../../components/Registration/goalsFields/RequiredFields";
import { RootState } from "../../../redux/store/reduxStore";
import protectRouteHandler from "../../../utils/protectedRoutes/protectedRoutes";
import {
  createGoalsFieldsProps,
  getDisplayRequirements,
} from "../../../utils/registration/goals/setGoalsHelper";

const setGoals: React.FC = () => {
  //state
  const dispatch = useDispatch();

  const { basicGoal, desiredFatPercentage, desiredWeight } = useSelector(
    (state: RootState) => state.goalsReducer
  );
  const [shouldSkipFatPercentage, setShouldSkipFatPercentage] = useState(false);

  //booleans
  const {
    shouldDisplayFatPercentageField,
    shouldDisplayRequiredFields,
    shouldDisplayMusclesMassField,
  } = getDisplayRequirements(
    basicGoal,
    desiredWeight,
    desiredFatPercentage,
    shouldSkipFatPercentage
  );

  //props for children
  const {
    buttonEventsForFatPercentageField,
    buttonEventsForMuscleMassField,
    fatPercentageInstructions,
    musclesMassInstructions,
  } = createGoalsFieldsProps(
    setShouldSkipFatPercentage,
    dispatch,
    basicGoal,
    desiredWeight
  );
  return (
    <>
      <h1>Create Your Goals</h1>
      <p>
        this will help us create for you a program that suits you, and to track
        your progress
      </p>
      <RequiredFields shouldDisplay={shouldDisplayRequiredFields} />

      <FatPercentageField
        instructions={fatPercentageInstructions}
        basicGoal={basicGoal}
        shouldDisplay={shouldDisplayFatPercentageField}
        title="What is your desired fat percentage?"
        buttonsEvents={buttonEventsForFatPercentageField}
      />

      <MusclesMassField
        instructions={musclesMassInstructions}
        basicGoal={basicGoal}
        shouldDisplay={shouldDisplayMusclesMassField}
        title="What is your desired muscles mass?"
        buttonsEvents={buttonEventsForMuscleMassField}
      />
    </>
  );
};

export default setGoals;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const destination = await protectRouteHandler(ctx);

  if (destination === "/auth/registration/set-goals") {
    return {
      props: {},
    };
  } else {
    return {
      redirect: { permanent: false, destination },
    };
  }
};
