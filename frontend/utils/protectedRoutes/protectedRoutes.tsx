import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import axiosInstance from '../axios/axiosInstance';
import { getHeaders } from '../axios/getHeaders';

const protectRouteHandler = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = parseCookies(ctx);

    const { data } = await axiosInstance.get('/auth/isUser', {
      headers: getHeaders(cookies.jon),
    });

    const {
      isAuthenticated,
      hasProgram,
      hasInitialStats,
      hasGoals,
      hasAllWorkouts,
      grade,
    } = data;

    const returnValue = {
      destination: '/auth/login',
      grade: null,
    };

    // case cookie deleted
    if (hasProgram) {
      return { destination: '/', grade };
    }

    if (!isAuthenticated) {
      returnValue.destination = '/auth/login';
    } else if (!hasGoals) {
      returnValue.destination = '/auth/registration/set-goals';
    } else if (!hasInitialStats) {
      returnValue.destination = '/auth/registration/set-initial-stats';
    } else if (!cookies.choseWorkout) {
      returnValue.destination = '/auth/registration/choose-workout';
    } else if (!hasAllWorkouts) {
      returnValue.destination = '/auth/registration/create-workout';
    } else if (!hasProgram) {
      returnValue.destination = '/auth/registration/schedule-program';
    } else {
      returnValue.destination = '/';
    }

    return returnValue;
  } catch (err) {
    return {
      destination: '/auth/login',
      grade: null,
    };
  }
};

export default protectRouteHandler;
