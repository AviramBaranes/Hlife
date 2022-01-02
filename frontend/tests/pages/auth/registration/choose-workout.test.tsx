import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import router from 'next/router';
import axiosInstance from '../../../../utils/axios/axiosInstance';

import ChooseWorkoutPage, {
  getServerSideProps,
} from '../../../../pages/auth/registration/choose-workout';
import store from '../../../../redux/store/reduxStore';
import * as protectedRouteHandler from '../../../../utils/protectedRoutes/protectedRoutes';
import * as calculateRecommendationWorkout from '../../../../utils/registration/workout/chooseWorkoutHelper';
import CustomWorkout from '../../../../components/Registration/workout/CustomWorkout';

describe('choose workout get server side props test', () => {
  beforeAll(() => {
    jest
      .spyOn(protectedRouteHandler, 'default')
      .mockImplementationOnce(async () => ({
        grade: null,
        destination: 'wrong destination',
      }))
      .mockImplementation(async () => ({
        grade: null,
        destination: '/auth/registration/choose-workout',
      }));

    jest
      .spyOn(calculateRecommendationWorkout, 'calculateRecommendationWorkout')
      .mockImplementation(async () => ({
        order: 'order',
        description: 'description',
        programStyle: 'programStyle',
        restDaysPerWeek: 1,
        workoutDaysPerWeek: 'workoutDaysPerWeek',
        multiProgramStyles: true,
      }));
  });

  test('should handle redirect', async () => {
    const { redirect } = (await getServerSideProps({} as any)) as any;

    expect(redirect.destination).toBe('wrong destination');
  });

  test('should return recommendation in props', async () => {
    const result = (await getServerSideProps({
      req: { url: '' },
    } as any)) as any;

    expect(result.props.order).toBe('order');
    expect(result.props.description).toBe('description');
    expect(result.props.restDaysPerWeek).toBe(1);
  });
});

describe('choose workout tests', () => {
  const props = {
    programStyle: 'programStyle',
    description: 'description',
    workoutDaysPerWeek: 5,
    restDaysPerWeek: 0,
    order: 'order',
    multiProgramStyles: true,
  };
  let spiedAxios: jest.SpyInstance;
  let spiedRouter: jest.SpyInstance;

  beforeEach(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, 'get')
      .mockImplementation(async () => {});
    spiedRouter = jest.spyOn(router, 'push');
  });

  test('transition between ChooseWorkout to CustomWorkout', () => {
    render(
      <Provider store={store}>
        <ChooseWorkoutPage {...props} />
      </Provider>
    );

    const changePageBtn = screen.getByText('Yes');
    let recommendedWorkoutTitle = screen.getByText('Choose a workout program');
    let customWorkoutTitle = screen.queryByText('Create a workout program');

    expect(recommendedWorkoutTitle).toBeInTheDocument();
    expect(customWorkoutTitle).not.toBeInTheDocument();

    userEvent.click(changePageBtn);
    customWorkoutTitle = screen.getByText('Create a workout program');

    expect(recommendedWorkoutTitle).not.toBeInTheDocument();
    expect(customWorkoutTitle).toBeInTheDocument();

    const backBtn = screen.getByText('Back');
    userEvent.click(backBtn);
    recommendedWorkoutTitle = screen.getByText('Choose a workout program');

    expect(recommendedWorkoutTitle).toBeInTheDocument();
    expect(customWorkoutTitle).not.toBeInTheDocument();
  });

  test('should handle recommendation workout submission', async () => {
    render(
      <Provider store={store}>
        <ChooseWorkoutPage {...props} />
      </Provider>
    );

    const confirmBtn = screen.getByText('Confirm');
    userEvent.click(confirmBtn);

    await waitFor(() => {
      expect(localStorage.getItem('programStyle')).toBe('programStyle');
      expect(localStorage.getItem('timesPerWeek')).toBe('5');
      expect(localStorage.getItem('order')).toBe('order');
      expect(localStorage.getItem('multiProgramStyles')).toBe('true');
      expect(spiedRouter.mock.calls[0][0]).toBe(
        '/auth/registration/create-workout'
      );
    });
  });

  test('Custom workout should handle invalidity', () => {
    render(
      <Provider store={store}>
        <CustomWorkout setDisplay={() => {}} />
      </Provider>
    );

    const submitBtn = screen.getByText('Continue');

    expect(submitBtn).toBeDisabled();

    userEvent.type(screen.getByLabelText('Times per week') as Element, '4');

    expect(submitBtn).toBeDisabled();

    userEvent.clear(screen.getByLabelText('Times per week') as Element);
    userEvent.selectOptions(screen.getByRole('listbox'), 'AB');

    expect(submitBtn).toBeDisabled();

    userEvent.type(screen.getByLabelText('Times per week') as Element, '4');
    expect(submitBtn).not.toBeDisabled();
  });

  test('should handle custom workout submission', async () => {
    render(
      <Provider store={store}>
        <ChooseWorkoutPage {...props} />
      </Provider>
    );

    userEvent.click(screen.getByText('Yes'));
    userEvent.selectOptions(screen.getByRole('listbox'), 'AB');
    userEvent.type(screen.getByLabelText('Times per week') as Element, '4');
    userEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(localStorage.getItem('programStyle')).toBe('AB');
      expect(localStorage.getItem('timesPerWeek')).toBe('4');
      expect(spiedRouter.mock.calls[0][0]).toBe(
        '/auth/registration/create-workout'
      );
    });
  });
});
