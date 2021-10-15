import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import router from "next/router";
import { Provider } from "react-redux";

import CreateAerobicWorkout from "../../../components/Registration/workout/CreateAerobicWorkout";
import store from "../../../redux/store/reduxStore";
import axiosInstance from "../../../utils/axios/axiosInstance";

jest.mock("react-dom", () => {
  return {
    ...jest.requireActual("react-dom"),
    createPortal(Modal: any) {
      return Modal;
    },
  };
});

describe("create aerobic workout test", () => {
  let spiedAxios: jest.SpyInstance;
  let spiedRouter: jest.SpyInstance;

  beforeEach(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, "post")
      .mockImplementation(async () => "");
    spiedRouter = jest.spyOn(router, "push");
  });

  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  test("should handle validity correctly", () => {
    localStorage.setItem("timesPerWeek", "2");

    render(
      <Provider store={store}>
        <CreateAerobicWorkout />
      </Provider>
    );

    const addBtn = screen.getByText("Add another");
    const submitBtn = screen.getByText("Submit");

    //input are empty
    expect(addBtn).toBeDisabled();
    expect(submitBtn).toBeDisabled();

    const nameInput = screen.getByLabelText("Workout Name:");
    const timeInput = screen.getByLabelText("Total Time:");
    userEvent.type(timeInput, "01:30");

    //name input is empty
    expect(timeInput.className).toBe("Input");
    expect(nameInput.className).toBe("Input");
    expect(addBtn).toBeDisabled();
    expect(submitBtn).toBeDisabled();

    userEvent.type(nameInput, "---");

    //name input is too short
    expect(timeInput.className).toBe("Input");
    expect(nameInput.className).toBe("Input InValid");
    expect(addBtn).toBeDisabled();
    expect(submitBtn).toBeDisabled();

    userEvent.type(nameInput, "-");

    //input are valid
    expect(timeInput.className).toBe("Input");
    expect(nameInput.className).toBe("Input");
    expect(addBtn).not.toBeDisabled();
    expect(submitBtn).not.toBeDisabled();

    //too many workout
    userEvent.click(addBtn);
    userEvent.type(nameInput, "name");
    userEvent.type(timeInput, "01:30");
    expect(addBtn).toBeDisabled();
  });

  test("should handle form submission of one workout", async () => {
    render(
      <Provider store={store}>
        <CreateAerobicWorkout />
      </Provider>
    );

    const submitBtn = screen.getByText("Submit");
    const nameInput = screen.getByLabelText("Workout Name:");
    const timeInput = screen.getByLabelText("Total Time:");
    userEvent.type(timeInput, "01:30");
    userEvent.type(nameInput, "boxing");
    userEvent.click(submitBtn);

    const expectedRequestBody = {
      trainingDayName: "aerobic",
      name: "boxing",
      time: 90,
      exercises: [],
    };
    expect(spiedAxios.mock.calls[0][0]).toBe("/workout/");
    await waitFor(() => {
      expect(spiedAxios.mock.calls[0][1]).toStrictEqual(expectedRequestBody);
      expect(spiedAxios.mock.calls[1][0]).toBe("/workout/hasAllWorkout");
      expect(spiedRouter.mock.calls[0][0]).toBe(
        "/auth/registration/schedule-program"
      );
    });
  });

  test("should handle form submission of multiple workouts", async () => {
    localStorage.setItem("timesPerWeek", "3");
    render(
      <Provider store={store}>
        <CreateAerobicWorkout />
      </Provider>
    );

    const addBtn = screen.getByText("Add another");
    const submitBtn = screen.getByText("Submit");
    const nameInput = screen.getByLabelText("Workout Name:");
    const timeInput = screen.getByLabelText("Total Time:");
    const descInput = screen.getByLabelText("Description:");
    userEvent.type(timeInput, "01:30");
    userEvent.type(nameInput, "boxing");
    userEvent.click(addBtn);
    userEvent.type(timeInput, "00:50");
    userEvent.type(nameInput, "walking");
    userEvent.type(descInput, "description");
    userEvent.click(addBtn);
    userEvent.type(timeInput, "02:30");
    userEvent.type(nameInput, "running");
    userEvent.click(submitBtn);

    const expectedRequestBody1 = {
      trainingDayName: "aerobic",
      name: "boxing",
      time: 90,
      exercises: [],
    };
    const expectedRequestBody2 = {
      trainingDayName: "aerobic",
      name: "walking",
      description: "description",
      time: 50,
      exercises: [],
    };
    const expectedRequestBody3 = {
      trainingDayName: "aerobic",
      name: "running",
      time: 150,
      exercises: [],
    };
    await waitFor(() => {
      expect(spiedAxios.mock.calls[0][0]).toBe("/workout/");
      expect(spiedAxios.mock.calls[0][1]).toStrictEqual(expectedRequestBody1);
      expect(spiedAxios.mock.calls[1][0]).toBe("/workout/");
      expect(spiedAxios.mock.calls[1][1]).toStrictEqual(expectedRequestBody2);
      expect(spiedAxios.mock.calls[2][0]).toBe("/workout/");
      expect(spiedAxios.mock.calls[2][1]).toStrictEqual(expectedRequestBody3);
      expect(spiedAxios.mock.calls[3][0]).toBe("/workout/hasAllWorkout");
      expect(spiedRouter.mock.calls[0][0]).toBe(
        "/auth/registration/schedule-program"
      );
    });
  });
});
