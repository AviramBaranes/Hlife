import router from "next/router";
import React from "react";
import { Dispatch } from "redux";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import { statsActions } from "../../../redux/slices/stats/statsSlice";
import axiosInstance from "../../axios/axiosInstance";

export const createStatsProps = (
  setShouldSkipFatPercentage: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch<any>,
  rank: string,
  weight: number,
  musclesMass: number,
  height: number,
  fatPercentage: number
) => {
  const buttonEventsForFatPercentageField = {
    skip() {
      setShouldSkipFatPercentage(true);
    },
    continue(fatPercentage: string) {
      dispatch(statsActions.addFatPercentageField({ fatPercentage }));
    },
  };

  const submitInitialStatsHandler = async () => {
    try {
      const bodyRequest = {
        weight,
      } as {
        weight: number;
        musclesMass: undefined | number;
        fatPercentage: undefined | number;
        height: undefined | number;
      };
      if (musclesMass) bodyRequest.musclesMass = musclesMass;
      if (height) bodyRequest.height = height;
      if (fatPercentage) bodyRequest.fatPercentage = fatPercentage;

      await axiosInstance.post("/stats/set-ranking", { selfRank: rank });
      const res = await axiosInstance.post("/stats", bodyRequest);

      dispatch(
        messagesActions.newMessage({
          messageTitle: "Initial Stats created!",
          message: res.data,
        })
      );

      router.push("/auth/registration/choose-workout");
    } catch (err: any) {
      dispatch(
        errorsActions.newError({
          errorTitle: "Creating initial stats failed",
          errorMessage: err.response.data,
          errorStatusCode: err.response.status,
        })
      );
    }
  };

  const buttonEventsForMuscleMassField = {
    skip: async () => {
      await submitInitialStatsHandler();
    },
    continue: async (desiredMusclesMass: string) => {
      dispatch(statsActions.addMusclesMassField({ desiredMusclesMass }));
      await submitInitialStatsHandler();
    },
  };

  return { buttonEventsForFatPercentageField, buttonEventsForMuscleMassField };
};
