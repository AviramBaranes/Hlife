import router from "next/router";
import React, { Dispatch } from "react";
import Button from "../../../components/UI/Button/Button";

interface ChooseWorkoutProps {
  programStyle: string;
  description: string;
  workoutDaysPerWeek: number;
  restDaysPerWeek: number;
  order: string;
  setDisplay: Dispatch<React.SetStateAction<boolean>>;
}

const ChooseWorkout: React.FC<ChooseWorkoutProps> = ({
  programStyle,
  description,
  workoutDaysPerWeek,
  restDaysPerWeek,
  order,
  setDisplay,
}) => {
  const ConfirmBtnHandler = () => {
    document.cookie = document.cookie + "choseWorkout=true; ";
    localStorage.setItem("programStyle", programStyle);
    localStorage.setItem("timesPerWeek", workoutDaysPerWeek.toString());

    router.push("/auth/registration/create-workout");
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
        <Button clicked={ConfirmBtnHandler} disabled={false} type="button">
          Confirm
        </Button>
      </section>
      <section>
        <h5>
          <strong>Do you want to make your own custom workout?</strong>
        </h5>
        <Button
          disabled={false}
          type="button"
          clicked={() => {
            setDisplay(false);
          }}
        >
          Yes
        </Button>
      </section>
    </div>
  );
};

export default ChooseWorkout;
