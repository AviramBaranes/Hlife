import { GetServerSideProps } from 'next';
import React from 'react';
import Head from 'next/head';

import classes from '../../styles/pages/stats.module.scss';
import GeneralStats from '../../components/stats/GeneralStats';
import StatsGraphSection from '../../components/stats/graph/StatsGraphSection';
import UserGoals from '../../components/stats/UserGoals';
import { GoalsType, PhysicalStatsType } from '../../types/Stats';
import axiosInstance from '../../utils/axios/axiosInstance';
import { getHeaders } from '../../utils/axios/getHeaders';
import protectRouteHandler from '../../utils/protectedRoutes/protectedRoutes';
import AddStatsButton from '../../components/stats/AddStatsButton';

interface StatsProps {
  userGoals: GoalsType;
  userStats: PhysicalStatsType;
}

const Stats: React.FC<StatsProps> = ({ userGoals, userStats }) => {
  const { age, name, rank, stats } = userStats;
  const { basicGoal } = userGoals;

  const date = new Date(new Date().setHours(0, 0, 0, 0));

  const isDeclaredAlready = stats.find(
    (stat) => new Date(stat.date).getDay() === new Date(date).getDay()
  );

  return (
    <>
      <Head>
        <title>Stats</title>
        <meta name='description' content='Displaying stats in a graph' />
      </Head>
      <div className={classes.Main}>
        <div className={classes.InfoSec}>
          <GeneralStats age={age} name={name} rank={rank} />
          <UserGoals userGoals={userGoals} />
        </div>
        <StatsGraphSection stats={stats} basicGoal={basicGoal} />
      </div>
      {!isDeclaredAlready && (
        <div data-testid='add-stats-btn' className={classes.StatsDisplay}>
          <AddStatsButton basicGoal={basicGoal} />
        </div>
      )}
    </>
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
