import { AxiosResponse } from "axios";
import router from "next/router";
import React, { SetStateAction, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Workout } from "../../../pages/auth/registration/schedule-program";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import axiosInstance from "../../../utils/axios/axiosInstance";

const RecommendedOrder: React.FC<{
  order: string;
  setOrder: React.Dispatch<SetStateAction<string|null>>;
  workouts: Workout[];
}> = ({ order, setOrder, workouts }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let newFormattedOrder = "\n";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let programDay: string;
    const programOrderList = order.split(",");
    let lastWorkoutMemory: Workout[] = [];

    const workoutsCopy = [...workouts];
    days.forEach((day, i) => {
      const workoutItemIndex = workoutsCopy.findIndex(
        (workout) => workout.trainingDayName === programOrderList[i]
      );

      //aerobic depends on workout name
      if (workoutItemIndex >= 0) {
        programDay = `${workoutsCopy[workoutItemIndex].name} (${workoutsCopy[workoutItemIndex].trainingDayName})`;
        if (workoutsCopy[workoutItemIndex].trainingDayName === "aerobic") {
          lastWorkoutMemory.push(workoutsCopy.splice(workoutItemIndex, 1)[0]);
        }
      } else {
        if (programOrderList[i] === "X") {
          programDay = "rest (X)";
        } else {
          // if enough items shift else use the last and keep it
          console.log(lastWorkoutMemory)
          let item: Workout;
          item =
            lastWorkoutMemory.length > 1
              ? lastWorkoutMemory.shift()!
              : lastWorkoutMemory[0];
          programDay = `${item.name} (${item.trainingDayName})`;
        }
      }
      newFormattedOrder += `${day}: ${programDay}\n`;
    });
    setOrder(newFormattedOrder);
  }, []);

  const getDay = (dayShortCut: string) => {
    let result: string;
    switch (dayShortCut) {
      case "Sun":
        result = "Sunday";
        break;
      case "Mon":
        result = "Monday";
        break;
      case "Tue":
        result = "Tuesday";
        break;
      case "Wed":
        result = "Wednesday";
        break;
      case "Thu":
        result = "Thursday";
        break;
      case "Fri":
        result = "Friday";
        break;
      case "Sat":
        result = "Saturday";
        break;
      default:
        result = "";
    }
    return result;
  };

  function postOne(
    day: string,
    workoutName?: string,
    trainingDayName?: string
  ) {
    let requestBody: { workoutName?: string; trainingDayName?: string } = {};
    if (workoutName) requestBody.workoutName = workoutName;
    if (trainingDayName) requestBody.trainingDayName = trainingDayName;
    return axiosInstance.post(`/program/${day}`, requestBody);
  }

  function submitScheduleHandler() {
    //sequence promises
    const dataToSend: {
      day: string;
      workoutName?: string;
      trainingDayName?: string;
    }[] = [];

    const orderList = order.split("\n");
    orderList.pop();
    orderList.shift();
    for (let dataGroup of orderList) {
      const day = getDay(dataGroup.split(":")[0]);
      const workoutName = dataGroup.split(":")[1].split(" (")[0].slice(1);
      const trainingDayName = dataGroup
        .split(":")[1]
        .split(" (")[1]
        .split(")")[0];

      trainingDayName === "X"
        ? dataToSend.push({ day })
        : dataToSend.push({ workoutName, trainingDayName, day });
    }

    let p = Promise.resolve(undefined) as Promise<
      AxiosResponse<any> | undefined
    >;
    for (let data of dataToSend) {
      p = p.then(() => {
        const { day, trainingDayName, workoutName } = data;
        if (trainingDayName && workoutName)
          return postOne(day, workoutName, trainingDayName);
        return postOne(day);
      });
    }

    p.then(() => {
      dispatch(
        messagesActions.newMessage({
          messageTitle: "Congratulations",
          message: " You finished all registration steps!",
        })
      );
      router.push("/");
    }).catch((err) => {
      dispatch(
        errorsActions.newError({
          errorTitle: "Schedule program failed",
          errorMessage: err.response.data,
        })
      );
    });
  }

  return (
    <div data-testid="recommended-order">
      <h4>
        <strong>Recommended: </strong>
        {order}
      </h4>
      <button onClick={submitScheduleHandler}>Continue</button>
    </div>
  );
};

export default RecommendedOrder;
