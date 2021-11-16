import router from 'next/router';
import React from 'react';
import { Dispatch } from 'redux';

import { loadingAction } from '../../redux/slices/loading/loadingSlice';
import { messagesActions } from '../../redux/slices/messages/messagesSlice';
import { statsActions } from '../../redux/slices/stats/statsSlice';
import axiosInstance from '../axios/axiosInstance';
import { handleAxiosError } from '../errors/handleRequestErrors';

export const createStatsProps = (
  setShouldSkipFatPercentage: React.Dispatch<React.SetStateAction<boolean>>,
  setShouldSkipMusclesMass: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch<any>,
  weight: number,
  musclesMass: number,
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

      formData.append('weight', weight.toString());
      if (musclesMass) formData.append('musclesMass', musclesMass.toString());
      if (fatPercentage)
        formData.append('fatPercentage', fatPercentage.toString());
      if (photo) formData.append('file', photo);

      dispatch(loadingAction.setToTrue());
      const { data } = await axiosInstance.post('/stats', formData);

      const message = `You just gain ${data.grade} points!`;

      dispatch(
        messagesActions.newMessage({
          messageTitle: 'Stats added!',
          message,
        })
      );

      router.push('/stats');
      dispatch(loadingAction.setToFalse());
    } catch (err: any) {
      handleAxiosError(err, dispatch, 'Adding stats failed');
    }
  };

  return {
    buttonEventsForFatPercentageField,
    buttonEventsForMuscleMassField,
    buttonEventsForPhotoField,
  };
};
