import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import classes from '../styles/pages/home.module.scss';
import DailyMission from '../components/home/DailyMission';
import ExecutionsGraph from '../components/home/ExecutionsGraph';
import TomorrowMission from '../components/home/TomorrowMission';
import UserScore from '../components/home/UserScore';
import { Exercise } from '../components/Registration/workout/Forms/Exercise';
import axiosInstance from '../utils/axios/axiosInstance';
import { dateToString } from '../utils/dates/dateToString';
import protectRouteHandler from '../utils/protectedRoutes/protectedRoutes';
import { WorkoutType } from '../types/Program';
import { getHeaders } from '../utils/axios/getHeaders';

type Execution = { rate: number; date: Date; workout?: WorkoutType };

export interface HomeProps {
  weeklyExecutions: Execution[];
  executionDeclared: boolean;
  grade: number;
  trainingDayName: string;
  exercises?: Exercise[];
  workoutName?: string;
  time: number | null;
}

const Home: React.FC<HomeProps> = ({
  grade,
  workoutName,
  time,
  exercises,
  trainingDayName,
  executionDeclared,
  weeklyExecutions,
}) => {
  return (
    <>
      <UserScore grade={grade} />

      <section className={classes.ExecutionSection}>
        {!executionDeclared ? (
          <DailyMission
            trainingDayName={trainingDayName}
            workoutName={workoutName}
            time={time}
            exercises={exercises}
          />
        ) : (
          <TomorrowMission
            workoutName={workoutName}
            trainingDayName={trainingDayName}
            exercises={exercises}
            time={time}
          />
        )}
        <ExecutionsGraph weeklyExecutions={weeklyExecutions} />
      </section>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { destination, grade } = await protectRouteHandler(ctx);

  if (destination === '/') {
    try {
      const headers = getHeaders(ctx);
      const props: HomeProps = {
        grade,
        trainingDayName: 'X',
        executionDeclared: false,
        time: null,
        weeklyExecutions: [],
      };

      const mutateProps = async (url: string, executionDeclared: boolean) => {
        const { data } = await axiosInstance.get(url, { headers });

        const { exercises, name, trainingDayName, time } = data;

        if (name && trainingDayName) {
          props.workoutName = name;
          props.trainingDayName = trainingDayName;
          props.time = time || null;
          props.exercises = exercises;
        }
        props.executionDeclared = executionDeclared;
      };

      // if status = 200 execution already declared and taking data for tomorrow mission
      // else execution is not declared yet so taking data for today mission
      try {
        await axiosInstance.get(`/program-exec/${dateToString(new Date())}`, {
          headers,
        });
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        await mutateProps(
          `/program-exec/exercises-to-do/${dateToString(tomorrow)}`,
          true
        );
      } catch {
        await mutateProps('/program-exec/exercises-to-do/', false);
      } finally {
        const { data, status } = await axiosInstance.get(
          `/program-exec/by-range/week/${dateToString(new Date())}`,
          { headers }
        );

        if (status === 204) {
          props.weeklyExecutions = [];
        } else if (status === 200) {
          let weeklyExecutions = data.map(
            (item: {
              date: Date;
              executionRate: number;
              workoutId?: WorkoutType;
            }) => {
              let execution: Execution = {
                date: item.date,
                rate: item.executionRate,
              };
              if (item.workoutId) execution.workout = item.workoutId;
              return execution;
            }
          );
          props.weeklyExecutions = weeklyExecutions;
        }
      }

      return { props };
    } catch (err: any) {
      return { redirect: { destination: '/error-occur', permanent: false } };
    }
  } else {
    return {
      redirect: { destination, permanent: false },
    };
  }
};
