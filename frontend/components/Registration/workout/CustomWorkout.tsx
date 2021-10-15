import router from "next/router";
import React, { SetStateAction, useReducer } from "react";
import { useDispatch } from "react-redux";

import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import axiosInstance from "../../../utils/axios/axiosInstance";
import Button from "../../UI/Button/Button";

interface FormState {
  programStyle: string;
  timesPerWeek: number;
  isFormValid: boolean;
}

type FormAction =
  | { type: "PROGRAM_SELECT"; programStyle: string }
  | { type: "TIMES_PER_WEEK"; timesPerWeek: number }
  | { type: "FORM_VALIDITY" };

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "PROGRAM_SELECT":
      return { ...state, programStyle: action.programStyle };
    case "TIMES_PER_WEEK":
      return { ...state, timesPerWeek: action.timesPerWeek };
    case "FORM_VALIDITY":
      if (state.programStyle && state.timesPerWeek) {
        return { ...state, isFormValid: true };
      }
      return { ...state };
    default:
      return { ...state };
  }
};

const formInitialState: FormState = {
  programStyle: "",
  timesPerWeek: 0,
  isFormValid: false,
};

const CustomWorkout: React.FC<{
  setDisplay: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setDisplay }) => {
  //
  const dispatch = useDispatch();
  const [formState, dispatchFormAction] = useReducer(
    formReducer,
    formInitialState
  );

  const programStyleSelectHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatchFormAction({
      type: "PROGRAM_SELECT",
      programStyle: e.target.value,
    });
    dispatchFormAction({ type: "FORM_VALIDITY" });
  };

  const timesPerWeekChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatchFormAction({
      type: "TIMES_PER_WEEK",
      timesPerWeek: +e.target.value,
    });
    dispatchFormAction({ type: "FORM_VALIDITY" });
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchFormAction({ type: "FORM_VALIDITY" });

    if (!formState.isFormValid) return;
    try {
      await axiosInstance.get("/chose-workout");

      localStorage.setItem("programStyle", formState.programStyle);
      localStorage.setItem("timesPerWeek", formState.timesPerWeek.toString());

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
        <h3>Create a workout program</h3>
        <p>create your own custom workout program</p>
      </section>
      <form onSubmit={formSubmitHandler}>
        <select
          role="listbox"
          value="FB"
          onChange={programStyleSelectHandler}
          name="program-style"
        >
          <option value="FB">FB</option>
          <option value="aerobic">aerobic</option>
          <option value="AB">AB</option>
          <option value="ABC">ABC</option>
          <option value="ABCD">ABCD</option>
        </select>
        <label htmlFor="times-per-week">
          Times Per Week: <span>*</span>
        </label>
        <input
          onChange={timesPerWeekChangeHandler}
          type="number"
          id="times-per-week"
          min={1}
          max={7}
          step={1}
        />
        <Button type="submit" disabled={!formState.isFormValid}>
          Continue
        </Button>
      </form>
      <Button disabled={false} type="button" clicked={() => setDisplay(true)}>
        Back
      </Button>
    </div>
  );
};

export default CustomWorkout;
