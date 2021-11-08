import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';
import ProgramGraph from '../components/program/ProgramGraph';
import ProgramTable from '../components/program/ProgramTable';
import { ProgramObj, WorkoutType } from '../types/Program';
import axiosInstance from '../utils/axios/axiosInstance';
import protectRouteHandler from '../utils/protectedRoutes/protectedRoutes';

interface ProgramProps {
  fullProgram: ProgramObj[];
  allWorkouts: WorkoutType[];
}

const Program: React.FC<ProgramProps> = ({ fullProgram, allWorkouts }) => {
  return (
    <div>
      <ProgramTable fullProgram={fullProgram} />
      <ProgramGraph allWorkouts={allWorkouts} />
    </div>
  );
};

export default Program;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { destination } = await protectRouteHandler(ctx);

  if (destination === '/') {
    try {
      const cookies = parseCookies(ctx);
      const headers = {
        Cookie: `_csrf=${cookies._csrf}; jon=${cookies.jon}; XSRF-TOKEN=${cookies['XSRF_TOKEN']};`,
      };

      const fullProgram = (await axiosInstance.get('/program/', { headers }))
        .data;
      const allWorkouts = (await axiosInstance.get('/workout/all', { headers }))
        .data;

      return { props: { fullProgram, allWorkouts } };
    } catch (err: any) {
      return { redirect: { destination: '/error-occur', permanent: false } };
    }
  } else {
    return {
      redirect: { destination, permanent: false },
    };
  }
};
