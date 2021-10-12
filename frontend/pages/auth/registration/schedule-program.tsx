import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import CustomOrder from "../../../components/Registration/program/CustomOrder";
import RecommendedOrder from "../../../components/Registration/program/RecommendedOrder";
import axiosInstance from "../../../utils/axios/axiosInstance";
import protectRouteHandler from "../../../utils/protectedRoutes/protectedRoutes";

export interface Workout {
  name: string;
  trainingDayName: string;
}

const scheduleProgram: React.FC<{
  workouts: Workout[];
}> = ({ workouts }) => {
  const [order, setOrder] = useState("");

  useEffect(() => {
    setOrder(localStorage.getItem("order")!);
  }, []);
  return (
    <div>
      <section>
        <h2>Schedule your Program</h2>
        <h3>
          This is the final step! <br /> It will earn you 100 points!
        </h3>
      </section>
      {order && (
        <section>
          <RecommendedOrder
            order={order}
            setOrder={setOrder}
            workouts={workouts}
          />
        </section>
      )}
      <section>
        <CustomOrder workouts={workouts} />
      </section>
    </div>
  );
};

export default scheduleProgram;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const destination = await protectRouteHandler(ctx);
  if (destination === "/auth/registration/schedule-program") {
    try {
      const cookies = parseCookies(ctx);
      const { data } = await axiosInstance.get("/workout/all", {
        headers: {
          Cookie: `_csrf=${cookies._csrf}; jon=${cookies.jon}; XSRF-TOKEN=${cookies["XSRF_TOKEN"]};`,
        },
      });
      console.log(data);
      const workouts = data.map(({ name, trainingDayName }: Workout) => {
        return { name, trainingDayName };
      });
      console.log(workouts);
      return { props: { workouts } };
    } catch (err) {
      return { redirect: { destination: "/error-occur", permanent: false } };
    }
  } else {
    return { redirect: { destination, permanent: false } };
  }
};
