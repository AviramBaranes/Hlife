import router from "next/router";
import { Dispatch } from "react";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { goalsActions } from "../../../redux/slices/goals/goalsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import axiosInstance from "../../axios/axiosInstance";

export const getDisplayRequirements = (
  basicGoal: string,
  desiredWeight: number | null,
  desiredFatPercentage: number | null,
  shouldSkipFatPercentage: boolean
) => {
  const result = {
    shouldDisplayRequiredFields: true,
    shouldDisplayFatPercentageField: true,
    shouldDisplayMusclesMassField: true,
  };
  basicGoal && desiredWeight && (result.shouldDisplayRequiredFields = false);
  result.shouldDisplayFatPercentageField = Boolean(
    basicGoal &&
      desiredWeight &&
      !desiredFatPercentage &&
      !shouldSkipFatPercentage
  );
  result.shouldDisplayMusclesMassField = !!(
    (basicGoal && desiredWeight && desiredFatPercentage) ||
    (basicGoal && desiredWeight && shouldSkipFatPercentage)
  );
  return result;
};

export const createGoalsFieldsProps = (
  setShouldSkipFatPercentage: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch<any>,
  basicGoal: string,
  desiredWeight: number | null,
  desiredMusclesMass: number | null,
  desiredFatPercentage: number | null
) => {
  const buttonEventsForFatPercentageField = {
    skip() {
      setShouldSkipFatPercentage(true);
    },
    continue(desiredFatPercentage: string) {
      dispatch(goalsActions.addFatPercentageField({ desiredFatPercentage }));
    },
  };
  const buttonEventsForMuscleMassField = {
    skip: async () => {
      await submitGoalsHandler();
    },
    continue: async (desiredMusclesMass: string) => {
      dispatch(goalsActions.addMusclesMassField({ desiredMusclesMass }));
      await submitGoalsHandler();
    },
  };
  const fatPercentageInstructions =
    basicGoal === "lose fat"
      ? "This field is required"
      : "This field is optional";
  const musclesMassInstructions =
    basicGoal === "lose fat"
      ? "This field is optional"
      : "This field is required";
  const submitGoalsHandler = async () => {
    const bodyRequest = {
      basicGoal,
      weight: desiredWeight,
    } as {
      basicGoal: string;
      weight: number;
      musclesMass: undefined | number;
      fatPercentage: undefined | number;
    };

    if (desiredMusclesMass) bodyRequest.musclesMass = desiredMusclesMass;
    if (desiredFatPercentage) bodyRequest.fatPercentage = desiredFatPercentage;

    try {
      const res = await axiosInstance.post("/goals", bodyRequest);

      dispatch(
        messagesActions.newMessage({
          messageTitle: "Goals created!",
          message: res.data,
        })
      );

      router.push("/auth/registration/set-initial-stats");
    } catch (err: any) {
      dispatch(
        errorsActions.newError({
          errorTitle: "Creating goals failed",
          errorMessage: err.response.data,
          errorStatusCode: err.response.status,
        })
      );
    }
  };
  return {
    buttonEventsForFatPercentageField,
    buttonEventsForMuscleMassField,
    fatPercentageInstructions,
    musclesMassInstructions,
  };
};
