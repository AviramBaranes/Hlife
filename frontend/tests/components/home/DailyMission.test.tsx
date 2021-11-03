import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import DailyMission from '../../../components/home/DailyMission';
import store from '../../../redux/store/reduxStore';
import axiosInstance from '../../../utils/axios/axiosInstance';

jest.mock('react-dom', () => {
  return {
    ...jest.requireActual('react-dom'),
    createPortal(Modal: any) {
      return Modal;
    },
  };
});

jest.mock('next/router', () => ({
  reload: jest.fn(),
}));

describe('Daily Mission tests', () => {
  const props = {
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
  };

  let spiedAxios: jest.SpyInstance;
  beforeEach(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, 'post')
      .mockImplementation(async () => ({ data: '' }));
  });

  afterEach(() => jest.restoreAllMocks());

  test('should render DailyMission when not aerobic or rest', async () => {
    render(
      <Provider store={store}>
        <DailyMission {...props} />
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
        <DailyMission {...newProps} />
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
    const newProps: any = { ...props };
    newProps.trainingDayName = 'X';
    delete newProps.workoutName;
    render(
      <Provider store={store}>
        <DailyMission {...newProps} />
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
});
