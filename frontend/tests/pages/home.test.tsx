import Home, { getServerSideProps } from '../../pages';
import axiosInstance from '../../utils/axios/axiosInstance';
import * as protectRouteHandler from '../../utils/protectedRoutes/protectedRoutes';

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
