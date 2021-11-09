import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import Program, { getServerSideProps } from '../../pages/program';
import store from '../../redux/store/reduxStore';
import { ProgramObj, WorkoutType } from '../../types/Program';
import axiosInstance from '../../utils/axios/axiosInstance';
import * as protectRouteHandler from '../../utils/protectedRoutes/protectedRoutes';

jest.mock('react-dom', () => {
  return {
    ...jest.requireActual('react-dom'),
    createPortal(Modal: any) {
      return Modal;
    },
  };
});

describe('get server side props tests', () => {
  let spiedAxios: jest.SpyInstance;
  beforeAll(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, 'get')
      .mockImplementationOnce(async () => ({ data: 'fullProgram' }))
      .mockImplementationOnce(async () => ({ data: 'allWorkouts' }))
      .mockImplementationOnce(async () => ({ status: 204 }))
      .mockImplementationOnce(async () => ({ data: 'fullProgram' }))
      .mockImplementationOnce(async () => ({ data: 'allWorkouts' }))
      .mockImplementationOnce(async () => ({
        status: 200,
        data: [
          { executionRate: 100, date: new Date('11-11-2001') },
          { date: new Date('11-13-2001'), executionRate: 50 },
        ],
      }));

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

  test('should return the correct props (no executions)', async () => {
    const { props } = (await getServerSideProps({} as any)) as any;

    expect(props.fullProgram).toBe('fullProgram');
    expect(props.allWorkouts).toBe('allWorkouts');
    expect(props.weeklyExecutions).toStrictEqual(Array(7).fill(null));
  });

  test('should return the correct props (with executions)', async () => {
    const { props } = (await getServerSideProps({} as any)) as any;

    expect(props.fullProgram).toBe('fullProgram');
    expect(props.allWorkouts).toBe('allWorkouts');
    expect(props.weeklyExecutions).toStrictEqual([
      true,
      null,
      false,
      null,
      null,
      null,
      null,
    ]);
  });

  test('test axios calls', () => {
    expect(spiedAxios.mock.calls[0][0]).toBe('/program/');
    expect(spiedAxios.mock.calls[0][1]).toStrictEqual({
      headers: { Cookie: `_csrf=_csrf; jon=jon; XSRF-TOKEN=token;` },
    });
    expect(spiedAxios.mock.calls[1][0]).toBe('/workout/all');
    expect(spiedAxios.mock.calls[1][1]).toStrictEqual({
      headers: { Cookie: `_csrf=_csrf; jon=jon; XSRF-TOKEN=token;` },
    });
  });
});

describe('Program page tests', () => {
  const A_workout: WorkoutType = {
    user: '',
    name: 'chest',
    trainingDayName: 'A',
    time: 150,
    description: 'best workout',
    exercises: [
      {
        name: 'pushups',
        reps: 12,
        sets: 3,
        muscles: ['chest'],
        description: 'best exercise',
      },
    ],
  };
  const B_workout: WorkoutType = {
    user: '',
    name: 'back',
    trainingDayName: 'B',
    time: 250,
    description: 'good workout',
    exercises: [
      {
        name: 'pull-ups',
        reps: 12,
        sets: 3,
        muscles: ['back'],
        description: 'good exercise',
      },
    ],
  };
  const FB_workout: WorkoutType = {
    name: 'my fb workout',
    time: 120,
    description: 'ny best workout',
    exercises: [
      {
        name: 'squat',
        reps: 12,
        sets: 3,
        description: 'a legs workout',
        muscles: ['Quads', 'Hamstrings'],
      },

      {
        name: 'bench-press',
        reps: 12,
        sets: 3,
        description: 'a chest workout',
        muscles: ['chest'],
      },
    ],
    trainingDayName: 'FB',
    user: '',
  };
  const aerobic_workouts: WorkoutType[] = [
    {
      name: 'boxing',
      trainingDayName: 'aerobic',
      description: 'boxing in the park',
      time: 120,
      user: '',
      exercises: [],
    },
    {
      name: 'running',
      trainingDayName: 'aerobic',
      description: 'running in the park',
      time: 60,
      user: '',
      exercises: [],
    },
  ];
  const fullProgram: ProgramObj[] = [
    { _id: '', day: 'Sunday', workout: A_workout },
    { _id: '', day: 'Monday', workout: B_workout },
    { _id: '', day: 'Tuesday', restDay: true },
  ];

  const weeklyExecutions = [null, false, true];
  test('should enter the data to a table correctly', () => {
    render(
      <Provider store={store}>
        <Program
          allWorkouts={[]}
          fullProgram={fullProgram}
          weeklyExecutions={weeklyExecutions}
        />
      </Provider>
    );

    const table = screen.getByRole('table').children[0];
    const daysRow = table.children[0];
    const namesRow = table.children[1];
    const timeRow = table.children[2];
    const executionsRow = table.children[3];

    expect(daysRow.children.length).toBe(4);
    expect(daysRow.children[0].textContent).toBe('Day');
    expect(daysRow.children[1].textContent).toBe('Sun');
    expect(daysRow.children[1]).toHaveStyle({ cursor: 'pointer' });
    expect(daysRow.children[2].textContent).toBe('Mon');
    expect(daysRow.children[2]).toHaveStyle({ cursor: 'pointer' });
    expect(daysRow.children[3].textContent).toBe('Tue');
    expect(daysRow.children[3]).toHaveStyle({ cursor: 'default' });

    expect(namesRow.children.length).toBe(4);
    expect(namesRow.children[0].textContent).toBe('Name');
    expect(namesRow.children[1].textContent).toBe('chest');
    expect(namesRow.children[1]).toHaveStyle({ cursor: 'pointer' });
    expect(namesRow.children[2].textContent).toBe('back');
    expect(namesRow.children[2]).toHaveStyle({ cursor: 'pointer' });
    expect(namesRow.children[3].textContent).toBe('Rest');
    expect(namesRow.children[3]).toHaveStyle({ cursor: 'default' });

    expect(timeRow.children.length).toBe(4);
    expect(timeRow.children[0].textContent).toBe('Time');
    expect(timeRow.children[1].textContent).toBe('150 (m)');
    expect(timeRow.children[1]).toHaveStyle({ cursor: 'pointer' });
    expect(timeRow.children[2].textContent).toBe('250 (m)');
    expect(timeRow.children[2]).toHaveStyle({ cursor: 'pointer' });
    expect(timeRow.children[3].textContent).toBe('-');
    expect(timeRow.children[3]).toHaveStyle({ cursor: 'default' });

    expect(executionsRow.children.length).toBe(4);
    expect(executionsRow.children[0].textContent).toBe('Executions');
    expect(executionsRow.children[1].textContent).toBe('-');
    expect(executionsRow.children[1]).toHaveStyle({ cursor: 'pointer' });
    expect(executionsRow.children[2].textContent).toBe('X');
    expect(executionsRow.children[2]).toHaveStyle({ cursor: 'pointer' });
    expect(executionsRow.children[3].children[0].tagName).toBe('svg');
    expect(executionsRow.children[3]).toHaveStyle({ cursor: 'default' });
  });

  test('should handle click events', () => {
    render(
      <Provider store={store}>
        <Program
          allWorkouts={[]}
          fullProgram={fullProgram}
          weeklyExecutions={weeklyExecutions}
        />
      </Provider>
    );

    const table = screen.getByRole('table').children[0];

    expect(screen.queryByTestId('workout-modal')).not.toBeInTheDocument();

    userEvent.click(table.children[0].children[1]);

    const modalElement = screen.getByTestId('workout-modal');

    expect(modalElement).toBeInTheDocument();
    expect(modalElement.children[0].children[0].textContent).toBe('chest (A)');
    expect(modalElement.children[0].children[1].textContent).toBe('2:30 (h)');
    expect(modalElement.children[1].textContent).toBe('best workout');
    expect(modalElement.children[3].children.length).toBe(1);
    expect(
      modalElement.children[3].children[0].children[0].children[0].textContent
    ).toBe('Name: pushups');
    expect(
      modalElement.children[3].children[0].children[0].children[1].textContent
    ).toBe('Reps: 12');
    expect(
      modalElement.children[3].children[0].children[0].children[2].textContent
    ).toBe('Sets: 3');
    expect(
      modalElement.children[3].children[0].children[0].children[3].textContent
    ).toBe('Description: best exercise');
    expect(
      modalElement.children[3].children[0].children[0].children[4].textContent
    ).toBe('Muscles: chest');
  });

  test('should render default workouts graph', () => {
    render(
      <Provider store={store}>
        <Program
          weeklyExecutions={weeklyExecutions}
          allWorkouts={[A_workout, B_workout]}
          fullProgram={fullProgram}
        />
      </Provider>
    );

    const svgGraph = screen.getByTestId('regular-graph').children[0];

    //test regular graph rendering
    expect(svgGraph.children.length).toBe(5);
    expect(svgGraph.children[0].children[0].tagName).toBe('circle');
    expect(svgGraph.children[1].children[0].tagName).toBe('circle');
    expect(svgGraph.children[2].children[0].tagName).toBe('circle');
    expect(svgGraph.children[3].children[0].tagName).toBe('circle');
    expect(svgGraph.children[3].children[1].textContent).toBe('pushups');
    expect(svgGraph.children[4].children[1].textContent).toBe('pull-ups');

    //test aerobic graph not rendering
    expect(screen.getByTestId('aerobic-graph').getAttribute('display')).toBe(
      'none'
    );
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  test('should handle click events (default workout)', () => {
    render(
      <Provider store={store}>
        <Program
          weeklyExecutions={weeklyExecutions}
          allWorkouts={[A_workout, B_workout]}
          fullProgram={fullProgram}
        />
      </Provider>
    );

    const svgGraph = screen.getByTestId('regular-graph').children[0];

    expect(screen.queryByTestId('regular-modal')).not.toBeInTheDocument();

    userEvent.click(svgGraph.children[4]);

    const modalElement = screen.getByTestId('regular-modal');
    expect(modalElement).toBeInTheDocument();
    expect(modalElement.children[0].textContent).toBe('Exercise: pull-ups');
    expect(modalElement.children[1].textContent).toBe('Reps: 12');
    expect(modalElement.children[2].textContent).toBe('Sets: 3');
    expect(modalElement.children[3].textContent).toBe(
      'Description: good exercise'
    );
    expect(modalElement.children[4].textContent).toBe('Muscles: back');
  });

  test('should render FB workout graph', () => {
    render(
      <Provider store={store}>
        <Program
          weeklyExecutions={weeklyExecutions}
          allWorkouts={[FB_workout]}
          fullProgram={fullProgram}
        />
      </Provider>
    );

    const svgGraph = screen.getByTestId('regular-graph').children[0];

    //test regular graph rendering
    expect(svgGraph.children.length).toBe(3);
    expect(svgGraph.children[0].children[0].tagName).toBe('circle');
    expect(svgGraph.children[1].children[0].tagName).toBe('circle');
    expect(svgGraph.children[2].children[0].tagName).toBe('circle');
    expect(svgGraph.children[1].children[1].textContent).toBe('squat');
    expect(svgGraph.children[2].children[1].textContent).toBe('bench-press');

    // //test aerobic graph not rendering
    expect(screen.getByTestId('aerobic-graph').getAttribute('display')).toBe(
      'none'
    );
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  test('should handle click events (fb workout)', () => {
    render(
      <Provider store={store}>
        <Program
          weeklyExecutions={weeklyExecutions}
          allWorkouts={[FB_workout]}
          fullProgram={fullProgram}
        />
      </Provider>
    );

    const svgGraph = screen.getByTestId('regular-graph').children[0];

    expect(screen.queryByTestId('regular-modal')).not.toBeInTheDocument();

    userEvent.click(svgGraph.children[1]);

    const modalElement = screen.getByTestId('regular-modal');
    expect(modalElement).toBeInTheDocument();
    expect(modalElement.children[0].textContent).toBe('Exercise: squat');
    expect(modalElement.children[1].textContent).toBe('Reps: 12');
    expect(modalElement.children[2].textContent).toBe('Sets: 3');
    expect(modalElement.children[3].textContent).toBe(
      'Description: a legs workout'
    );
    expect(modalElement.children[4].textContent).toBe(
      'Muscles: Quads, Hamstrings'
    );
  });

  test('should render aerobic workouts graph', () => {
    render(
      <Provider store={store}>
        <Program
          weeklyExecutions={weeklyExecutions}
          allWorkouts={aerobic_workouts}
          fullProgram={fullProgram}
        />
      </Provider>
    );

    const svgGraph = screen.getByTestId('aerobic-graph').children[0];

    //test regular graph rendering
    expect(svgGraph.children.length).toBe(3);
    expect(svgGraph.children[0].children[0].tagName).toBe('circle');
    expect(svgGraph.children[1].children[0].tagName).toBe('circle');
    expect(svgGraph.children[2].children[0].tagName).toBe('circle');
    expect(svgGraph.children[1].children[1].textContent).toBe('boxing');
    expect(svgGraph.children[2].children[1].textContent).toBe('running');

    // //test aerobic graph not rendering
    expect(screen.getByTestId('regular-graph').getAttribute('display')).toBe(
      'none'
    );
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  test('should handle click events (aerobic workout)', () => {
    render(
      <Provider store={store}>
        <Program
          weeklyExecutions={weeklyExecutions}
          allWorkouts={aerobic_workouts}
          fullProgram={fullProgram}
        />
      </Provider>
    );

    const svgGraph = screen.getByTestId('aerobic-graph').children[0];

    expect(screen.queryByTestId('aerobic-modal')).not.toBeInTheDocument();

    userEvent.click(svgGraph.children[2]);

    const modalElement = screen.getByTestId('aerobic-modal');
    expect(modalElement).toBeInTheDocument();
    expect(modalElement.children[0].textContent).toBe('Workout: running');
    expect(modalElement.children[1].textContent).toBe('Time: 60 (Minutes)');
    expect(modalElement.children[2].textContent).toBe(
      'Description: running in the park'
    );
  });

  test('should render aerobic and FB workouts graph and toggle them', () => {
    render(
      <Provider store={store}>
        <Program
          weeklyExecutions={weeklyExecutions}
          allWorkouts={[...aerobic_workouts, FB_workout]}
          fullProgram={fullProgram}
        />
      </Provider>
    );
    const svgRegularGraph = screen.getByTestId('regular-graph').children[0];

    expect(screen.getByTestId('aerobic-graph').getAttribute('display')).toBe(
      'none'
    );
    expect(screen.getByTestId('regular-graph').getAttribute('display')).toBe(
      'block'
    );

    expect(svgRegularGraph.children.length).toBe(3);
    expect(svgRegularGraph.children[0].children[0].tagName).toBe('circle');
    expect(svgRegularGraph.children[1].children[0].tagName).toBe('circle');
    expect(svgRegularGraph.children[2].children[0].tagName).toBe('circle');
    expect(svgRegularGraph.children[1].children[1].textContent).toBe('squat');
    expect(svgRegularGraph.children[2].children[1].textContent).toBe(
      'bench-press'
    );

    userEvent.click(screen.getByRole('checkbox'));

    expect(screen.getByTestId('aerobic-graph').getAttribute('display')).toBe(
      'block'
    );
    expect(screen.getByTestId('regular-graph').getAttribute('display')).toBe(
      'none'
    );
    const svgAerobicGraph = screen.getByTestId('aerobic-graph').children[0];

    //test regular graph rendering
    expect(svgAerobicGraph.children.length).toBe(3);
    expect(svgAerobicGraph.children[0].children[0].tagName).toBe('circle');
    expect(svgAerobicGraph.children[1].children[0].tagName).toBe('circle');
    expect(svgAerobicGraph.children[2].children[0].tagName).toBe('circle');
    expect(svgAerobicGraph.children[1].children[1].textContent).toBe('boxing');
    expect(svgAerobicGraph.children[2].children[1].textContent).toBe('running');

    userEvent.click(screen.getByRole('checkbox'));
  });
});
