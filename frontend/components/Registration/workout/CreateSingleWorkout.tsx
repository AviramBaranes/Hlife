import router from "next/router";
import React, { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import axiosInstance from "../../../utils/axios/axiosInstance";
import { Exercise } from "./Forms/Exercise";
import WorkoutExerciseForm from "./Forms/WorkoutExerciseForm";
import WorkoutGeneralInfoForm from "./Forms/WorkoutGeneralInfoForm";

const CreateSingleWorkout: React.FC<{
  trainingDayName: string;
  setSubmitCount?: React.Dispatch<SetStateAction<number>>;
  last?: boolean;
}> = ({ trainingDayName, setSubmitCount, last }) => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [workoutName, setWorkoutName] = useState("");

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [numberOfFields, setNumberOfFields] = useState([1, 2, 3]);

  async function submitWorkoutHandler(e: React.FormEvent) {
    e.preventDefault();
    // console.log(exercises.length, totalTime, workoutName);

    const [hours, minutes] = totalTime.split(":");
    const time = +hours * 60 + +minutes;

    try {
      const bodyRequest: {
        trainingDayName: string;
        name: string;
        time: number;
        exercises: Exercise[];
        description?: string;
      } = {
        trainingDayName,
        name: workoutName,
        time,
        exercises,
      };

      if (description) bodyRequest.description = description;

      await axiosInstance.post("/workout", bodyRequest);

      if (setSubmitCount) {
        setSubmitCount((prevState) => ++prevState);
      }

      if (trainingDayName === "FB" || last) {
        const { data } = await axiosInstance.post("/workout/hasAllWorkout");
        dispatch(
          messagesActions.newMessage({
            messageTitle: "Created workout successfully",
            message: data,
          })
        );
        router.push("/auth/registration/schedule-program");
      }
    } catch (err: any) {
      console.log(err);
      dispatch(
        errorsActions.newError({
          errorTitle: "Failed to create workout",
          errorMessage: err.response.data,
        })
      );
    }
  }

  return (
    <div>
      <form onSubmit={submitWorkoutHandler}>
        <WorkoutGeneralInfoForm
          description={description}
          setDescription={setDescription}
          totalTime={totalTime}
          setTotalTime={setTotalTime}
          workoutName={workoutName}
          setWorkoutName={setWorkoutName}
        />

        {numberOfFields.map((field, i) => {
          return (
            <div key={field * i}>
              <h4>{field}</h4>
              <WorkoutExerciseForm setExercises={setExercises} />
            </div>
          );
        })}

        <div>
          <button
            type="button"
            onClick={() =>
              setNumberOfFields((prevState) => [
                ...prevState,
                prevState[prevState.length - 1] + 1,
              ])
            }
          >
            More
          </button>
        </div>
        <div></div>
        <button
          type="submit"
          disabled={!exercises.length || !totalTime || !workoutName}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateSingleWorkout;
