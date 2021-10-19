import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import CreateSingleWorkout from "../../../components/Registration/workout/CreateSingleWorkout";
import store from "../../../redux/store/reduxStore";
import userEvent from "@testing-library/user-event";

describe("Create single workout tests", () => {
  test("should render general form once and 3 exercise form ", () => {
    render(
      <Provider store={store}>
        <CreateSingleWorkout trainingDayName="FB" />
      </Provider>
    );

    const exercisesTitles = [
      screen.getByText("1"),
      screen.getByText("2"),
      screen.getByText("3"),
    ];

    expect(screen.getAllByTestId("GeneralForm").length).toBe(1);
    expect(screen.getAllByTestId("ExerciseForm").length).toBe(3);
    exercisesTitles.forEach((title) => expect(title).toBeInTheDocument());
  });

  test("should add another 2 'WorkoutExerciseForm' to the dom ", () => {
    render(
      <Provider store={store}>
        <CreateSingleWorkout trainingDayName="FB" />
      </Provider>
    );

    userEvent.click(screen.getByText("More"));
    userEvent.click(screen.getByText("More"));

    const exercisesTitles = [
      screen.getByText("1"),
      screen.getByText("2"),
      screen.getByText("3"),
      screen.getByText("4"),
      screen.getByText("5"),
    ];

    expect(screen.getAllByTestId("GeneralForm").length).toBe(1);
    expect(screen.getAllByTestId("ExerciseForm").length).toBe(5);
    exercisesTitles.forEach((title) => expect(title).toBeInTheDocument());
  });

  test("should handle validity", () => {
    //already tested WorkoutGeneralInfoForm validity handling in aerobicWorkout tests
    render(
      <Provider store={store}>
        <CreateSingleWorkout trainingDayName="FB" />
      </Provider>
    );
    userEvent.type(screen.getByLabelText("Workout name"), "Back");
    userEvent.type(screen.getByLabelText("Total time"), "01:30");

    const submitBtn = screen.getByText("Submit");
    const addBtn = screen.getAllByText("Add");
    const nameInput = screen.getAllByLabelText("Custom Exercise:");
    const repsInput = screen.getAllByLabelText("Reps:");
    const setsInput = screen.getAllByLabelText("Sets:");

    expect(submitBtn).toBeDisabled();
    addBtn.forEach((btn) => expect(btn).toBeDisabled());

    userEvent.type(nameInput[0], "pull ups");
    userEvent.type(repsInput[0], "12");
    userEvent.type(setsInput[0], "3");

    expect(submitBtn).toBeDisabled();
    expect(addBtn[0]).not.toBeDisabled();
    expect(addBtn[1]).toBeDisabled();
    expect(addBtn[2]).toBeDisabled();

    userEvent.click(addBtn[0]);

    expect(submitBtn).not.toBeDisabled();
  });

  // submission is test in 'CreateDefaultWorkout.test.tsx'
});
