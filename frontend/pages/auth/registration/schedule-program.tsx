import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';

import classes from '../../../styles/pages/schedule-program.module.scss';
import CustomOrder from '../../../components/Registration/program/CustomOrder';
import RecommendedOrder from '../../../components/Registration/program/RecommendedOrder';
import axiosInstance from '../../../utils/axios/axiosInstance';
import protectRouteHandler from '../../../utils/protectedRoutes/protectedRoutes';
import { getHeaders } from '../../../utils/axios/getHeaders';

export interface Workout {
  name: string;
  trainingDayName: string;
}

const scheduleProgram: React.FC<{
  workouts: Workout[];
}> = ({ workouts }) => {
  const [order, setOrder] = useState<string | null>(null);

  useEffect(() => {
    setOrder(localStorage.getItem('order'));
  }, []);

  return (
    <div className={classes.Page}>
      <section className={classes.Title}>
        <h3>Schedule Your Program</h3>
        <p>This is the final step. It will earn you 100 points!</p>
      </section>
      {order && (
        <RecommendedOrder
          order={order}
          setOrder={setOrder}
          workouts={workouts}
        />
      )}
      <section>
        <CustomOrder workouts={workouts} />
      </section>
    </div>
  );
};

export default scheduleProgram;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { destination } = await protectRouteHandler(ctx);
  if (destination === '/auth/registration/schedule-program') {
    try {
      const headers = getHeaders(ctx);
      const { data } = await axiosInstance.get('/workout/all', {
        headers,
      });

      const workouts = data.map(({ name, trainingDayName }: Workout) => {
        return { name, trainingDayName };
      });

      return { props: { workouts } };
    } catch (err) {
      return { redirect: { destination: '/error-occur', permanent: false } };
    }
  } else {
    return { redirect: { destination, permanent: false } };
  }
};
