import { AxiosRequestConfig } from 'axios';
import axiosInstance from '../../utils/axios/axiosInstance';
import protectRouteHandler from '../../utils/protectedRoutes/protectedRoutes';

describe('protected routes tests', () => {
  let mockedAxios: jest.SpyInstance<
    Promise<unknown>,
    [url: string, data?: any, config?: AxiosRequestConfig | undefined]
  >;

  beforeEach(() => {
    mockedAxios = jest
      .spyOn(axiosInstance, 'get')
      .mockImplementationOnce(async () => {
        throw new Error();
      })
      .mockImplementationOnce(async () => ({
        data: {},
      }))
      .mockImplementationOnce(async () => ({
        data: { isAuthenticated: true },
      }))
      .mockImplementationOnce(async () => ({
        data: { isAuthenticated: true, hasGoals: true },
      }))
      .mockImplementationOnce(async () => ({
        data: { isAuthenticated: true, hasGoals: true, hasInitialStats: true },
      }))
      .mockImplementationOnce(async () => ({
        data: { isAuthenticated: true, hasGoals: true, hasInitialStats: true },
      }))
      .mockImplementationOnce(async () => ({
        data: {
          isAuthenticated: true,
          hasGoals: true,
          hasInitialStats: true,
          hasAllWorkouts: true,
        },
      }))
      .mockImplementationOnce(async () => ({
        data: {
          isAuthenticated: true,
          hasGoals: true,
          hasAllWorkouts: true,
          hasInitialStats: true,
          hasProgram: true,
          grade: 100,
        },
      }));
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
  test('should send default path if fail', async () => {
    const { destination, grade } = await protectRouteHandler('' as any);

    expect(mockedAxios.mock.calls[0][0]).toEqual('/auth/isUser');
    expect(mockedAxios.mock.calls[0][1].headers.Cookie).toEqual('jon=jon;');
    expect(destination).toEqual('/auth/login');
    expect(grade).toEqual(null);
  });

  test("should return '/auth/login' for not authenticated user", async () => {
    const { destination, grade } = await protectRouteHandler('' as any);
    expect(destination).toEqual('/auth/login');
    expect(grade).toEqual(null);
  });

  test("should return '/auth/registration/set-goals' for user with no goals", async () => {
    const { destination, grade } = await protectRouteHandler('' as any);
    expect(destination).toEqual('/auth/registration/set-goals');
    expect(grade).toEqual(null);
  });

  test("should return '/auth/registration/set-initial-stats' user with no stats", async () => {
    const { destination, grade } = await protectRouteHandler('' as any);
    expect(destination).toEqual('/auth/registration/set-initial-stats');
    expect(grade).toEqual(null);
  });

  test("should return '/auth/registration/choose-workout' user with no stats", async () => {
    const { destination, grade } = await protectRouteHandler('' as any);
    expect(destination).toEqual('/auth/registration/choose-workout');
    expect(grade).toEqual(null);
  });
  test("should return '/auth/registration/create-workout' user with no stats", async () => {
    const { destination, grade } = await protectRouteHandler('' as any);
    expect(destination).toEqual('/auth/registration/create-workout');
    expect(grade).toEqual(null);
  });
  test("should return '/auth/registration/schedule-program' for user with no program", async () => {
    const { destination, grade } = await protectRouteHandler('' as any);
    expect(destination).toEqual('/auth/registration/schedule-program');
    expect(grade).toEqual(null);
  });

  test("should return '/' for user with full program", async () => {
    const { destination, grade } = await protectRouteHandler('' as any);

    expect(destination).toEqual('/');
    expect(grade).toEqual(100);
  });
});
