import router from 'next/router';
import { Dispatch } from 'react';
import { goalsActions } from '../../../redux/slices/goals/goalsSlice';
import { loadingAction } from '../../../redux/slices/loading/loadingSlice';
import { messagesActions } from '../../../redux/slices/messages/messagesSlice';
import axiosInstance from '../../axios/axiosInstance';
import { handleAxiosError } from '../../errors/handleRequestErrors';

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

let fatPercentage: number; // keep track on fat percentage for the last call
export const createGoalsFieldsProps = (
  setShouldSkipFatPercentage: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch<any>,
  basicGoal: string,
  desiredWeight: number | null
) => {
  let musclesMass: number;
  const buttonEventsForFatPercentageField = {
    skip() {
      setShouldSkipFatPercentage(true);
    },
    continue(desiredFatPercentage: number) {
      fatPercentage = desiredFatPercentage;
      dispatch(goalsActions.addFatPercentageField({ desiredFatPercentage }));
    },
  };
  const buttonEventsForMuscleMassField = {
    skip: async () => {
      await submitGoalsHandler();
    },
    continue: async (desiredMusclesMass: number) => {
      musclesMass = desiredMusclesMass;
      dispatch(goalsActions.addMusclesMassField({ desiredMusclesMass }));
      await submitGoalsHandler();
    },
  };
  const fatPercentageInstructions =
    basicGoal === 'lose fat'
      ? 'This field is required'
      : 'This field is optional';
  const musclesMassInstructions =
    basicGoal === 'lose fat'
      ? 'This field is optional'
      : 'This field is required';

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

    if (musclesMass) bodyRequest.musclesMass = musclesMass;
    if (fatPercentage) bodyRequest.fatPercentage = fatPercentage;

    try {
      dispatch(loadingAction.setToTrue());
      await axiosInstance.post('/goals', bodyRequest);

      await router.push('/auth/registration/set-initial-stats');
      dispatch(
        messagesActions.newMessage({
          messageTitle: 'Goals created!',
          message: 'Great job! We submitted your goals',
        })
      );

      dispatch(loadingAction.setToFalse());
    } catch (err: any) {
      handleAxiosError(err, dispatch, 'Creating goals failed');
    }
  };
  return {
    buttonEventsForFatPercentageField,
    buttonEventsForMuscleMassField,
    fatPercentageInstructions,
    musclesMassInstructions,
  };
};
