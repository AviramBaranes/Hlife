import router from "next/router";
import React, { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import axiosInstance from "../../../utils/axios/axiosInstance";

interface ChooseWorkoutProps {
  programStyle: string;
  description: string;
  workoutDaysPerWeek: number;
  restDaysPerWeek: number;
  order: string;
  setDisplay: Dispatch<React.SetStateAction<boolean>>;
  multiProgramStyles?: boolean;
}

const ChooseWorkout: React.FC<ChooseWorkoutProps> = ({
  programStyle,
  description,
  workoutDaysPerWeek,
  restDaysPerWeek,
  order,
  setDisplay,
  multiProgramStyles,
}) => {
  const dispatch = useDispatch();

  const ConfirmBtnHandler = async () => {
    try {
      await axiosInstance.get("/chose-workout");

      multiProgramStyles && localStorage.setItem("multiProgramStyles", "true");
      localStorage.setItem("programStyle", programStyle);
      localStorage.setItem("timesPerWeek", workoutDaysPerWeek.toString());
      localStorage.setItem("order", order);

      router.push("/auth/registration/create-workout");
    } catch (err) {
      dispatch(
        errorsActions.newError({
          errorTitle: "Something went wrong",
          errorMessage: "Try to refresh",
        })
      );
    }
  };

  return (
    <div>
      <section>
        <h3>Choose a workout program</h3>
        <p>
          You can follow our recommendations or continue with your own custom
          program.
        </p>
      </section>
      <section>
        <h4>Our Recommendations:</h4>
        <h5>
          <strong>Program Style:</strong>
          {programStyle}
        </h5>
        <h5>
          <strong>Description:</strong>
          {description}
        </h5>
        <h5>
          <strong>Times Per Week:</strong>
          {workoutDaysPerWeek} workout days, and {restDaysPerWeek} rest days.
        </h5>
        <h5>
          <strong>Order:</strong>
          {order}
        </h5>
        <button onClick={ConfirmBtnHandler} disabled={false} type="button">
          Confirm
        </button>
      </section>
      <section>
        <h5>
          <strong>Do you want to make your own custom workout?</strong>
        </h5>
        <button
          disabled={false}
          type="button"
          onClick={() => {
            setDisplay(false);
          }}
        >
          Yes
        </button>
      </section>
    </div>
  );
};

export default ChooseWorkout;
