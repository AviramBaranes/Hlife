import router from "next/router";
import React from "react";
import { Dispatch } from "redux";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import { statsActions } from "../../../redux/slices/stats/statsSlice";
import axiosInstance from "../../axios/axiosInstance";

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
    continue(fatPercentage: string) {
      dispatch(statsActions.addFatPercentageField({ fatPercentage }));
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

      console.log(formData.get("file"));

      await axiosInstance.post("/stats/set-ranking", { selfRank: rank });
      const res = await axiosInstance.post("/stats", formData, {
        headers: { "content-type": "multipart/form-data" },
      });

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
      setShouldSkipMusclesMass(true);
    },
    continue: async (musclesMass: string) => {
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

  return {
    buttonEventsForFatPercentageField,
    buttonEventsForMuscleMassField,
    buttonEventsForPhotoField,
  };
};
