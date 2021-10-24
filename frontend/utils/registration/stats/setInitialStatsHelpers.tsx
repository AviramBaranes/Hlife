import router from "next/router";
import React from "react";
import { Dispatch } from "redux";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import { statsActions } from "../../../redux/slices/stats/statsSlice";
import axiosInstance from "../../axios/axiosInstance";
import { handleAxiosError } from "../../errors/handleRequestErrors";

export const createStatsProps = (
  setShouldSkipFatPercentage: React.Dispatch<React.SetStateAction<boolean>>,
  setShouldSkipMusclesMass: React.Dispatch<React.SetStateAction<boolean>>,
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
    continue(fatPercentage: number) {
      dispatch(statsActions.addFatPercentageField({ fatPercentage }));
    },
  };

  const buttonEventsForMuscleMassField = {
    skip: async () => {
      setShouldSkipMusclesMass(true);
    },
    continue: async (musclesMass: number) => {
      dispatch(statsActions.addMusclesMassField({ musclesMass }));
    },
  };

  const buttonEventsForPhotoField = {
    skip: async () => {
      await submitInitialStatsHandler();
    },
    continue: async (photo: File) => {
      await submitInitialStatsHandler(photo);
    },
  };

  const submitInitialStatsHandler = async (photo?: File) => {
    try {
      const formData = new FormData();

      formData.append("weight", weight.toString());
      if (musclesMass) formData.append("musclesMass", musclesMass.toString());
      if (height) formData.append("height", height.toString());
      if (fatPercentage)
        formData.append("fatPercentage", fatPercentage.toString());
      if (photo) formData.append("file", photo);

      await axiosInstance.post("/stats/set-ranking", { selfRank: rank });
      await axiosInstance.post("/stats", formData);

      dispatch(
        messagesActions.newMessage({
          messageTitle: "Initial Stats created!",
          message: 'Your stats have been successfully uploaded',
        })
      );

      router.push("/auth/registration/choose-workout");
    } catch (err: any) {
      handleAxiosError(err,dispatch,"Creating initial stats failed")
    }
  };

  return {
    buttonEventsForFatPercentageField,
    buttonEventsForMuscleMassField,
    buttonEventsForPhotoField,
  };
};
