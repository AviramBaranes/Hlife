import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import Home, { getServerSideProps, HomeProps } from '../../pages';
import store from '../../redux/store/reduxStore';
import axiosInstance from '../../utils/axios/axiosInstance';
import * as protectRouteHandler from '../../utils/protectedRoutes/protectedRoutes';

jest.mock('next/router', () => ({
  reload: jest.fn(),
}));

jest.mock('react-dom', () => {
  return {
    ...jest.requireActual('react-dom'),
    createPortal(Modal: any) {
      return Modal;
    },
  };
});

jest.mock('nookies', () => ({
  parseCookies: jest.fn().mockImplementation(() => ({
    _csrf: '_csrf',
    jon: 'jon',
    XSRF_TOKEN: 'token',
  })),
}));

describe('home getServerSideProps tests', () => {
  let spiedAxios: jest.SpyInstance;

  beforeAll(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, 'get')
      .mockImplementationOnce(async () => '')
      .mockImplementationOnce(async () => ({ data: {} }))
      .mockImplementationOnce(async () => ({ data: {}, status: 204 }))
      .mockImplementationOnce(async () => {
        throw 'error';
      })
      .mockImplementationOnce(async () => ({
        data: {
          name: 'name',
          trainingDayName: 'A',
          time: 120,
          exercises: [{ reps: 3, sets: 3, exercise: 'exercise' }],
        },
      }))
      .mockImplementationOnce(async () => ({ data: {}, status: 204 }))
      .mockImplementationOnce(async () => '')
      .mockImplementationOnce(async () => ({
        data: {
          name: 'name',
          trainingDayName: 'A',
          time: 120,
          exercises: [{ reps: 3, sets: 3, exercise: 'exercise' }],
        },
      }))
      .mockImplementationOnce(async () => ({ data: {}, status: 204 }))
      .mockImplementationOnce(async () => '')
      .mockImplementationOnce(async () => ({
        data: {
          name: 'name',
          trainingDayName: 'A',
          time: 120,
          exercises: [{ reps: 3, sets: 3, exercise: 'exercise' }],
        },
      }))
      .mockImplementationOnce(async () => ({
        data: [
          { date: 'date', executionRate: 100, data: 'data' },
          { date: 'date2', executionRate: 200, data: 'data2' },
        ],
        status: 200,
      }));
    jest
      .spyOn(protectRouteHandler, 'default')
      .mockImplementationOnce(async () => ({
        destination: 'wrong path',
        grade: null,
      }))
      .mockImplementation(async () => ({
        destination: '/',
        grade: 100,
      }));
  });
  test('should handle redirect', async () => {
    const { redirect } = (await getServerSideProps({} as any)) as any;

    expect(redirect.destination).toEqual('wrong path');
    expect(redirect.permanent).toEqual(false);
  });
  test('should send default props', async () => {
    const { props } = (await getServerSideProps({} as any)) as any;

    expect(props).toStrictEqual({
      grade: 100,
      trainingDayName: 'X',
      executionDeclared: true,
      time: null,
      weeklyExecutions: [],
    });
  });
  test('should send props when daily workout not declared', async () => {
    const { props } = (await getServerSideProps({} as any)) as any;

    expect(props).toStrictEqual({
      grade: 100,
      trainingDayName: 'A',
      workoutName: 'name',
      executionDeclared: false,
      time: 120,
      exercises: [{ exercise: 'exercise', reps: 3, sets: 3 }],
      weeklyExecutions: [],
    });
  });
  test('should send props when daily workout declared', async () => {
    const { props } = (await getServerSideProps({} as any)) as any;

    expect(props).toStrictEqual({
      grade: 100,
      trainingDayName: 'A',
      workoutName: 'name',
      executionDeclared: true,
      time: 120,
      exercises: [{ exercise: 'exercise', reps: 3, sets: 3 }],
      weeklyExecutions: [],
    });
  });
  test('should handle 200 status code', async () => {
    const { props } = (await getServerSideProps({} as any)) as any;

    expect(props).toStrictEqual({
      grade: 100,
      trainingDayName: 'A',
      workoutName: 'name',
      executionDeclared: true,
      time: 120,
      exercises: [{ exercise: 'exercise', reps: 3, sets: 3 }],
      weeklyExecutions: [
        { date: 'date', rate: 100 },
        { date: 'date2', rate: 200 },
      ],
    });
  });
});

describe('Home page tests', () => {
  const props: HomeProps = {
    executionDeclared: false,
    grade: 100,
    time: 120,
    trainingDayName: 'A',
    workoutName: 'Chest',
    exercises: [
      { name: 'pushups', reps: 20, sets: 7 },
      {
        name: 'pull-ups',
        reps: 12,
        sets: 3,
        muscles: ['back', 'chest'],
        description: 'a good exercise',
      },
    ],
    weeklyExecutions: [],
  };

  let spiedAxios: jest.SpyInstance;
  beforeEach(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, 'post')
      .mockImplementation(async () => ({ data: '' }));
  });

  afterEach(() => jest.restoreAllMocks());

  test('should render userScore', async () => {
    render(
      <Provider store={store}>
        <Home {...props} />
      </Provider>
    );

    const initialNumberOnScreen = screen.getByText('80');
    const betweenNumber = await screen.findByText('90');
    const finalNumber = await screen.findByText('100');

    expect(initialNumberOnScreen).toBeInTheDocument();
    expect(betweenNumber).toBeInTheDocument();
    expect(finalNumber).toBeInTheDocument();
  });
  test('should render DailyMission when not aerobic or rest', async () => {
    render(
      <Provider store={store}>
        <Home {...props} />
      </Provider>
    );

    // should not render tomorrow mission
    expect(screen.queryByText('Tomorrow Mission:')).not.toBeInTheDocument();
    //renders according to props:
    expect(screen.getByText('Daily Mission:')).toBeInTheDocument();
    expect(screen.getByText('Chest (A)')).toBeInTheDocument();
    expect(screen.getByText('120 (minutes)')).toBeInTheDocument();

    //open modal:
    userEvent.click(screen.getByText('Complete'));
    const inputs = screen.getAllByRole('checkbox');
    expect(inputs.length).toEqual(2);
    expect(screen.getByText('pushups').tagName).toBe('LABEL');
    expect(screen.getByText('pull-ups').tagName).toBe('LABEL');
    expect(screen.getByText('a good exercise')).toBeInTheDocument();
    expect(screen.getByText('back, chest')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();

    userEvent.click(inputs[1]);
    act(() => {
      userEvent.click(screen.getByText('Submit'));
    });

    expect(spiedAxios.mock.calls[0][0]).toBe('/program-exec/');
    expect(spiedAxios.mock.calls[0][1]).toStrictEqual({
      exercises: { pushups: false, 'pull-ups': true },
    });

    await waitFor(() => {
      expect(screen.queryByText('a good exercise')).not.toBeInTheDocument();
    });
  });

  test('should render DailyMission when aerobic', async () => {
    const newProps = { ...props };
    newProps.trainingDayName = 'aerobic';
    render(
      <Provider store={store}>
        <Home {...newProps} />
      </Provider>
    );

    //renders according to props:
    expect(screen.getByText('Daily Mission:')).toBeInTheDocument();
    expect(screen.getByText('Chest (aerobic)')).toBeInTheDocument();
    expect(screen.getByText('120 (minutes)')).toBeInTheDocument();

    userEvent.click(screen.getByText('Complete'));

    expect(spiedAxios.mock.calls[0][0]).toBe('/program-exec/');
    expect(spiedAxios.mock.calls[0][1]).toStrictEqual({
      isAerobic: true,
    });
  });

  test('should render DailyMission when rest', async () => {
    const newProps = { ...props };
    newProps.trainingDayName = 'X';
    delete newProps.workoutName;
    render(
      <Provider store={store}>
        <Home {...newProps} />
      </Provider>
    );

    //renders according to props:
    expect(screen.getByText('Daily Mission:')).toBeInTheDocument();
    expect(screen.getByText('Rest Day (X)')).toBeInTheDocument();

    userEvent.click(screen.getByText('Complete'));

    expect(spiedAxios.mock.calls[0][0]).toBe('/program-exec/');
    expect(spiedAxios.mock.calls[0][1]).toStrictEqual({
      isAerobic: false,
    });
  });

  test('should render TomorrowMission and showModal', () => {
    const newProps = { ...props };
    newProps.executionDeclared = true;

    render(
      <Provider store={store}>
        <Home {...newProps} />
      </Provider>
    );

    // should not render tomorrow mission
    expect(screen.queryByText('Daily Mission:')).not.toBeInTheDocument();
    //renders according to props:
    expect(screen.getByText('Tomorrow Mission:')).toBeInTheDocument();
    expect(screen.getByText('Chest (A)')).toBeInTheDocument();
    expect(screen.getByText('120 (minutes)')).toBeInTheDocument();

    //open modal:
    userEvent.click(screen.getByText('More'));
    expect(screen.getByText('pushups')).toBeInTheDocument();
    expect(screen.getByText('pull-ups')).toBeInTheDocument();
    expect(screen.getByText('a good exercise')).toBeInTheDocument();
    expect(screen.getByText('back, chest')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  test('should render TomorrowMission and to not showModal', () => {
    const newProps = { ...props };
    newProps.executionDeclared = true;
    newProps.exercises = [];
    delete newProps.workoutName;

    render(
      <Provider store={store}>
        <Home {...newProps} />
      </Provider>
    );

    // should not render tomorrow mission
    expect(screen.queryByText('Daily Mission:')).not.toBeInTheDocument();
    //renders according to props:
    expect(screen.getByText('Tomorrow Mission:')).toBeInTheDocument();
    expect(screen.getByText('Rest Day (X)')).toBeInTheDocument();

    expect(screen.queryByText('More')).not.toBeInTheDocument();
  });

  test('should render the graph', async () => {
    const newProps = { ...props };
    newProps.weeklyExecutions = [{ rate: 100, date: new Date('11-11-2001') }];

    render(
      <Provider store={store}>
        <Home {...newProps} />
      </Provider>
    );

    const barChart = screen.getByTestId('bar-chart');

    expect(barChart).toBeInTheDocument();
    expect(barChart.children[0].tagName).toBe('g');
    expect(barChart.children[0].children.length).toBe(1);
    expect(barChart.children[0].children[0].tagName).toBe('rect');
  });
});
