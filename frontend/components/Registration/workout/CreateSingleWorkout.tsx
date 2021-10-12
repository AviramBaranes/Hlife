import router from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import axiosInstance from "../../../utils/axios/axiosInstance";
import { Exercise } from "./Forms/Exercise";
import WorkoutExerciseForm from "./Forms/WorkoutExerciseForm";
import WorkoutGeneralInfoForm from "./Forms/WorkoutGeneralInfoForm";

const CreateSingleWorkout: React.FC = () => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [workoutName, setWorkoutName] = useState("");

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [numberOfFields, setNumberOfFields] = useState([1, 2, 3]);

  async function submitWorkoutHandler(e: React.FormEvent) {
    e.preventDefault();

    const [hours, minutes] = totalTime.split(":");
    const time = +hours * 60 + +minutes;

    try {
      const bodyRequest = {
        trainingDayName: "FB",
        name: workoutName,
        time,
        description,
        exercises,
      };

      await axiosInstance.post("/workout", bodyRequest);
      const { data } = await axiosInstance.post("/workout/hasAllWorkout");

      dispatch(
        messagesActions.newMessage({
          messageTitle: "Created workout successfully",
          message: data,
        })
      );

      router.push("/auth/registration/schedule-program");
    } catch (err: any) {
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
