import '@testing-library/jest-dom';

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import router from 'next/router';
import { Provider } from 'react-redux';
import * as FatPercentageField from '../../../components/Registration/generalFields/FatPercentageField';
import * as MusclesMassField from '../../../components/Registration/generalFields/MusclesMassField';
import * as UploadPhoto from '../../../components/Registration/statsFields/UploadPhoto';
import * as WeightField from '../../../components/stats/WeightField';

import AddStats, { getServerSideProps } from '../../../pages/stats/add-stats';
import { statsActions } from '../../../redux/slices/stats/statsSlice';
import store from '../../../redux/store/reduxStore';
import axiosInstance from '../../../utils/axios/axiosInstance';
import * as protectRouteHandler from '../../../utils/protectedRoutes/protectedRoutes';

jest.mock(
  '../../../utils/registration/fields/fatPercentageFieldHelpers',
  () => ({
    fatPercentageChangeHandler: jest.fn(),
  })
);

describe('getServerSideProps tests', () => {
  beforeAll(() => {
    jest
      .spyOn(protectRouteHandler, 'default')
      .mockImplementationOnce(async () => ({
        destination: 'wrong path',
        grade: null,
      }))
      .mockImplementation(async () => ({ destination: '/', grade: null }));
  });
  test('should handle redirect', async () => {
    const { redirect } = (await getServerSideProps({} as any)) as any;

    expect(redirect.destination).toBe('wrong path');
  });

  test('should extract goal from query', async () => {
    const { props } = (await getServerSideProps({
      query: { goal: 'goal' },
    } as any)) as any;

    expect(props).toStrictEqual({ goal: 'goal' });
  });

  test('should handle empty query', async () => {
    const { redirect } = (await getServerSideProps({
      query: {},
    } as any)) as any;

    expect(redirect.destination).toBe('/stats');
  });
});
describe('set-initial-stats page tests', () => {
  const testFile = new File(['(⌐□_□)'], 'photo.png', {
    type: 'image/png',
  });
  let spiedWeightField: jest.SpyInstance;
  let spiedFatPercentageField: jest.SpyInstance;
  let spiedMusclesMassField: jest.SpyInstance;
  let spiedUploadPhotoField: jest.SpyInstance;
  let spiedAxiosInstance: jest.SpyInstance;
  let spiedRouter: jest.SpyInstance;

  beforeEach(() => {
    global.URL.createObjectURL = jest.fn();
    spiedWeightField = jest.spyOn(WeightField, 'default');
    spiedFatPercentageField = jest.spyOn(FatPercentageField, 'default');
    spiedMusclesMassField = jest.spyOn(MusclesMassField, 'default');
    spiedUploadPhotoField = jest.spyOn(UploadPhoto, 'default');
    spiedAxiosInstance = jest
      .spyOn(axiosInstance, 'post')
      .mockImplementation(async () => ({ data: { grade: 40 } }));
    spiedRouter = jest.spyOn(router, 'push');
  });

  afterEach(() => {
    store.dispatch(statsActions.resetState());
    jest.restoreAllMocks();
  });

  test('should render the correct dom', () => {
    render(
      <Provider store={store}>
        <AddStats goal='increase-mass' />
      </Provider>
    );

    expect(screen.getByText('Weight Progress')).toBeInTheDocument();
    expect(
      screen.getByText('What is your current fat percentage?')
    ).toBeInTheDocument();
    expect(
      screen.getByText('What is your current muscles mass?')
    ).toBeInTheDocument();
    expect(screen.getByText('Upload an image')).toBeInTheDocument();
  });

  test('should display only one field each time in chronological order and change the state accordingly', async () => {
    render(
      <Provider store={store}>
        <AddStats goal='lose' />
      </Provider>
    );

    const weightFieldCalls = spiedWeightField.mock.calls;
    const fatPercentageFieldCalls = spiedFatPercentageField.mock.calls;
    const musclesMassFieldCalls = spiedMusclesMassField.mock.calls;
    const uploadPhotoCalls = spiedUploadPhotoField.mock.calls;

    expect(weightFieldCalls[0][0].shouldDisplay).toEqual(true);
    expect(fatPercentageFieldCalls[0][0].shouldDisplay).toEqual(false);
    expect(musclesMassFieldCalls[0][0].shouldDisplay).toEqual(false);
    expect(uploadPhotoCalls[0][0].shouldDisplay).toEqual(false);
    //display only fatPercentageField

    //filling the weight fields
    const continueButtons = screen.getAllByText('Continue');
    const weightFieldInput = screen.getByTestId('weight-field');

    fireEvent.change(weightFieldInput, {
      target: { value: '70' },
    });
    userEvent.click(continueButtons[0]);

    expect(store.getState().statsReducer.weight).toEqual(70);
    expect(
      weightFieldCalls[weightFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(false);
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .shouldDisplay
    ).toEqual(true);
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(false);
    expect(
      uploadPhotoCalls[uploadPhotoCalls.length - 1][0].shouldDisplay
    ).toEqual(false);

    //change fat percentage
    const fatPercentageRangInput = screen.getByTestId('fatPercentageInput');

    fireEvent.change(fatPercentageRangInput, {
      target: { value: '30' },
    });
    userEvent.click(continueButtons[1]);

    expect(store.getState().statsReducer.fatPercentage).toEqual(30);
    expect(
      weightFieldCalls[weightFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(false);
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .shouldDisplay
    ).toEqual(false);
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(true);
    expect(
      uploadPhotoCalls[uploadPhotoCalls.length - 1][0].shouldDisplay
    ).toEqual(false);

    //change musclesMass input
    const muscleMassFieldInput = screen.getByTestId('musclesMassInput');

    fireEvent.change(muscleMassFieldInput, { target: { value: '100' } });
    userEvent.click(continueButtons[2]);

    expect(store.getState().statsReducer.musclesMass).toEqual(100);
    expect(
      weightFieldCalls[weightFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(false);
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .shouldDisplay
    ).toEqual(false);
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(false);
    expect(
      uploadPhotoCalls[uploadPhotoCalls.length - 1][0].shouldDisplay
    ).toEqual(true);

    //uploading file

    const uploadPhotoFieldInput = screen.getByTestId('uploadPhotoInput');
    userEvent.upload(uploadPhotoFieldInput, testFile);
    userEvent.click(continueButtons[3]);

    await waitFor(() => {
      const requestData = spiedAxiosInstance.mock.calls[0][1];
      expect(spiedAxiosInstance.mock.calls[0][0]).toEqual('/stats');
      expect(requestData.get('weight')).toEqual('70');
      expect(requestData.get('musclesMass')).toEqual('100');
      expect(requestData.get('fatPercentage')).toEqual('30');
      expect(requestData.get('file')).toBeInstanceOf(File);
    });

    const expectedMessageState = {
      messageTitle: 'Stats added!',
      message: 'You just gain 40 points!',
      newMessage: true,
    };

    await waitFor(() => {
      expect(store.getState().messagesReducer).toStrictEqual(
        expectedMessageState
      );
      expect(spiedRouter.mock.calls[0][0]).toEqual('/stats');
    });
  });

  test('should render the fields with the appropriate props (goal is lose fat)', () => {
    render(
      <Provider store={store}>
        <AddStats goal='lose fat' />
      </Provider>
    );

    const fatPercentageFieldCalls = spiedFatPercentageField.mock.calls;
    const musclesMassFieldCalls = spiedMusclesMassField.mock.calls;

    expect(fatPercentageFieldCalls[0][0].basicGoal).toEqual('lose fat');
    expect(musclesMassFieldCalls[0][0].basicGoal).toEqual('lose fat');
  });

  test('should allow to skip the optional fields', async () => {
    render(
      <Provider store={store}>
        <AddStats goal='increase-mass' />
      </Provider>
    );

    const weightFieldInput = screen.getByTestId('weight-field');
    const muscleMassFieldInput = screen.getByTestId('musclesMassInput');
    const continueButtons = screen.getAllByText('Continue');
    const skipButtons = screen.getAllByText('Skip');

    expect(skipButtons[0].style.display).toBe('block');
    expect(skipButtons[1].style.display).toBe('none');
    expect(skipButtons[2].style.display).toBe('');

    fireEvent.change(weightFieldInput, {
      target: { value: '70' },
    });
    userEvent.click(continueButtons[0]);
    userEvent.click(skipButtons[0]);
    fireEvent.change(muscleMassFieldInput, { target: { value: '100' } });
    userEvent.click(continueButtons[2]);
    userEvent.click(skipButtons[2]);

    await waitFor(() => {
      const requestData = spiedAxiosInstance.mock.calls[0][1];
      expect(spiedAxiosInstance.mock.calls[0][0]).toEqual('/stats');
      expect(requestData.get('weight')).toEqual('70');
      expect(requestData.get('musclesMass')).toEqual('100');
      expect(requestData.get('fatPercentage')).toEqual(null);
      expect(requestData.get('file')).toEqual(null);
    });

    const expectedMessageState = {
      messageTitle: 'Stats added!',
      message: 'You just gain 40 points!',
      newMessage: true,
    };

    await waitFor(() => {
      expect(store.getState().messagesReducer).toStrictEqual(
        expectedMessageState
      );
      expect(spiedRouter.mock.calls[0][0]).toEqual('/stats');
    });
  });
});
