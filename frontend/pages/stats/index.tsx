import { GetServerSideProps } from 'next';
import React from 'react';
import UserGoals from '../../components/stats/UserGoals';
import UserStats from '../../components/stats/UserStats';

import { GoalsType, PhysicalStatsType } from '../../types/Stats';
import axiosInstance from '../../utils/axios/axiosInstance';
import { getHeaders } from '../../utils/axios/getHeaders';
import protectRouteHandler from '../../utils/protectedRoutes/protectedRoutes';

interface StatsProps {
  userGoals: GoalsType;
  userStats: PhysicalStatsType;
}

const Stats: React.FC<StatsProps> = ({ userGoals, userStats }) => {
  return (
    <div>
      <UserGoals userGoals={userGoals} />
      <UserStats basicGoal={userGoals.basicGoal} userStats={userStats} />
    </div>
  );
};

export default Stats;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { destination } = await protectRouteHandler(ctx);
  if (destination === '/') {
    try {
      const headers = getHeaders(ctx);
      const userGoals = (await axiosInstance.get('/goals/', { headers })).data;
      const userStats = (await axiosInstance.get('/stats', { headers })).data;

      return { props: { userGoals, userStats } };
    } catch (err) {
      return { redirect: { destination: '/error-occur', permanent: false } };
    }
  } else {
    return { redirect: { destination, permanent: false } };
  }
};
