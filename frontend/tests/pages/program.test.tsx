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
      .mockImplementationOnce(async () => ({ data: 'allWorkouts' }));

    jest
      .spyOn(protectRouteHandler, 'default')
      .mockImplementationOnce(async () => ({
        destination: 'wrong path',
        grade: null,
      }))
      .mockImplementationOnce(async () => ({ destination: '/', grade: null }));
  });

  test('should handle redirect', async () => {
    const { redirect } = (await getServerSideProps({} as any)) as any;

    expect(redirect.destination).toBe('wrong path');
  });

  test('should return the correct props', async () => {
    const { props } = (await getServerSideProps({} as any)) as any;

    expect(props.fullProgram).toBe('fullProgram');
    expect(props.allWorkouts).toBe('allWorkouts');
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
  const fullProgram: ProgramObj[] = [
    { _id: '', day: 'Sunday', workout: A_workout },
    { _id: '', day: 'Monday', workout: B_workout },
    { _id: '', day: 'Tuesday', restDay: true },
  ];
  test('should enter the data to a table correctly', () => {
    render(
      <Provider store={store}>
        <Program allWorkouts={[]} fullProgram={fullProgram} />
      </Provider>
    );

    const table = screen.getByRole('table').children[0];
    const daysRow = table.children[0];
    const namesRow = table.children[1];
    const timeRow = table.children[2];

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
  });
  test('should handle click events', () => {
    render(
      <Provider store={store}>
        <Program allWorkouts={[]} fullProgram={fullProgram} />
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
});
