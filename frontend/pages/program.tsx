import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';
import ProgramGraph from '../components/program/ProgramGraph';
import ProgramTable from '../components/program/ProgramTable';
import { ProgramObj, WorkoutType } from '../types/Program';
import axiosInstance from '../utils/axios/axiosInstance';
import { dateToString } from '../utils/dates/dateToString';
import protectRouteHandler from '../utils/protectedRoutes/protectedRoutes';

interface ProgramProps {
  fullProgram: ProgramObj[];
  allWorkouts: WorkoutType[];
  weeklyExecutions: (boolean | null)[];
}

const Program: React.FC<ProgramProps> = ({
  fullProgram,
  allWorkouts,
  weeklyExecutions,
}) => {
  return (
    <div>
      <ProgramTable
        fullProgram={fullProgram}
        weeklyExecutions={weeklyExecutions}
      />
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
      const { data, status } = await axiosInstance.get(
        `/program-exec/by-range/week/${dateToString(new Date())}`,
        { headers }
      );

      let weeklyExecutions = Array(7).fill(null);
      if (status === 200)
        data.forEach(
          (item: { executionRate: number; date: Date }) =>
            (weeklyExecutions[new Date(item.date).getDay()] =
              item.executionRate === 100)
        );
      return { props: { fullProgram, allWorkouts, weeklyExecutions } };
    } catch (err: any) {
      return { redirect: { destination: '/error-occur', permanent: false } };
    }
  } else {
    return {
      redirect: { destination, permanent: false },
    };
  }
};
