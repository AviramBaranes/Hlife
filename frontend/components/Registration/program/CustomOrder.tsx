import { program } from "@babel/types";
import { AxiosResponse } from "axios";
import router from "next/router";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Workout } from "../../../pages/auth/registration/schedule-program";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import axiosInstance from "../../../utils/axios/axiosInstance";

interface Program {
  day: string;
  trainingDayName?: string;
  name?: string;
}

const CustomOrder: React.FC<{ workouts: Workout[] }> = ({ workouts }) => {
  const dispatch = useDispatch();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [programs, setPrograms] = useState<Program[]>([]);

  const selectWorkoutHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [name, trainingDayName] = e.target.value.split("trainingDayName:");
    const newProgramDay: Program = {
      day: e.target.id,
      name,
      trainingDayName,
    };

    const currentProgramIndex = programs.findIndex(
      (program) => program.day === e.target.id
    );
    const updatedProgramsList = [...programs];

    if (currentProgramIndex > -1) {
      if (newProgramDay.trainingDayName) {
        updatedProgramsList[currentProgramIndex] = newProgramDay;
      } else {
        updatedProgramsList[currentProgramIndex] = { day: e.target.id };
      }
    } else {
      if (newProgramDay.trainingDayName) {
        updatedProgramsList.push(newProgramDay);
      } else {
        updatedProgramsList.push({ day: newProgramDay.day });
      }
    }
    setPrograms(updatedProgramsList);
  };

  const scheduleProgramHandler = async (e: FormEvent) => {
    e.preventDefault();

    const postOne = (
      day: string,
      workoutName?: string,
      trainingDayName?: string
    ) => {
      if (trainingDayName && workoutName) {
        return axiosInstance.post(`/program/${day}`, {
          workoutName,
          trainingDayName,
        });
      }
      return axiosInstance.post(`/program/${day}`);
    };

    let p = Promise.resolve(undefined) as Promise<
      AxiosResponse<any> | undefined
    >;

    for (let program of programs) {
      const { day, trainingDayName, name } = program;

      p = p.then(() => {
        if (trainingDayName && name) {
          return postOne(day, name, trainingDayName);
        }
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
    }).catch((err: any) => {
      dispatch(
        errorsActions.newError({
          errorTitle: "Schedule your program failed",
          errorMessage: err.response.data,
        })
      );
    });
  };

  return (
    <>
      <h3>Make your own schedule:</h3>
      <form onSubmit={scheduleProgramHandler}>
        {days.map((day) => {
          return (
            <div key={day}>
              <label htmlFor={day}>{day}</label>
              <select value="rest" onChange={selectWorkoutHandler} id={day}>
                <option value="rest">rest</option>
                {workouts.map((workout) => (
                  <option
                    key={workout.name + workout.trainingDayName}
                    value={`${workout.name}trainingDayName:${workout.trainingDayName}`}
                  >
                    {workout.name} ({workout.trainingDayName})
                  </option>
                ))}
              </select>
            </div>
          );
        })}
        <button type="submit" disabled={programs.length < 7}>
          Continue
        </button>
      </form>
    </>
  );
};

export default CustomOrder;
