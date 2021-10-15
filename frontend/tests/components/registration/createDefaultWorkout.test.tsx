import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import store from "../../../redux/store/reduxStore";
import userEvent from "@testing-library/user-event";
import CreateDefaultWorkout from "../../../components/Registration/workout/CreateDefaultWorkout";
import axiosInstance from "../../../utils/axios/axiosInstance";
import router from "next/router";
import { act } from "react-dom/test-utils";

describe("Create default workout tests", () => {
  let spiedAxios: jest.SpyInstance;
  let spiedRouter: jest.SpyInstance;

  beforeAll(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, "post")
      .mockImplementation(async () => "");
    spiedRouter = jest.spyOn(router, "push");
  });

  test("should handle submission", async () => {
    const { container } = render(
      <Provider store={store}>
        <CreateDefaultWorkout programStyle="AB" />
      </Provider>
    );

    expect(container.children[0].getAttribute("style")).toBe("display: block;");
    expect(container.children[1].getAttribute("style")).toBe("display: none;");

    const generalForm = screen.getAllByTestId("GeneralForm");

    const workoutNameInput_A = generalForm[0].children[0].children[1];
    const timeInput_A = generalForm[0].children[1].children[1];

    userEvent.type(workoutNameInput_A, "Legs");
    userEvent.type(timeInput_A, "01:30");

    const submitBtn = screen.getAllByText("Submit");
    const exerciseNameInput = screen.getAllByPlaceholderText("exercise");
    const repsInput = screen.getAllByPlaceholderText("reps");
    const setsInput = screen.getAllByPlaceholderText("sets");
    const exerciseSelect = screen.getAllByTestId("exerciseSelect");
    const addBtn = screen.getAllByText("Add");

    for (let i = 0; i <= 2; i++) {
      userEvent.type(exerciseNameInput[i], "data" + i);
      userEvent.type(repsInput[i], (1 + i).toString());
      userEvent.type(setsInput[i], (1 + i).toString());
      userEvent.click(addBtn[i]);
    }
    const domElements_A = [
      screen.getByText("Exercise: data0"),
      screen.getByText("Exercise: data1"),
      screen.getByText("Exercise: data2"),
      screen.getByText("Reps: 1"),
      screen.getByText("Reps: 2"),
      screen.getByText("Reps: 3"),
      screen.getByText("Sets: 1"),
      screen.getByText("Sets: 2"),
      screen.getByText("Sets: 3"),
    ];

    domElements_A.forEach((el) => expect(el).toBeInTheDocument());

    act(() => {
      userEvent.click(submitBtn[0]);
    });

    const expectedBodyRequest_A = {
      trainingDayName: "A",
      name: "Legs",
      time: 90,
      exercises: [
        {
          name: "data0",
          sets: 1,
          reps: 1,
        },
        {
          name: "data1",
          sets: 2,
          reps: 2,
        },
        {
          name: "data2",
          sets: 3,
          reps: 3,
        },
      ],
    };
    await waitFor(() => {
      expect(container.children[0].getAttribute("style")).toBe(
        "display: none;"
      );
      expect(container.children[1].getAttribute("style")).toBe(
        "display: block;"
      );
      expect(spiedAxios.mock.calls[0][0]).toBe("/workout");
      expect(spiedAxios.mock.calls[0][1]).toStrictEqual(expectedBodyRequest_A);
    });

    const workoutNameInput_B = generalForm[1].children[0].children[1];
    const timeInput_B = generalForm[1].children[1].children[1];

    // console.log(workoutNameInput_B);

    userEvent.type(workoutNameInput_B, "Chest");
    userEvent.type(timeInput_B, "03:00");

    const selectOptions = ["deadlift", "bench press", "biceps curl"];
    for (let i = 3; i <= 5; i++) {
      userEvent.selectOptions(exerciseSelect[i], selectOptions[i - 3]);
      userEvent.type(repsInput[i], (1 + i).toString());
      userEvent.type(setsInput[i], (1 + i).toString());
      userEvent.click(addBtn[i]);
    }
    const domElements_B = [
      screen.getByText("Exercise: deadlift"),
      screen.getByText("Exercise: bench press"),
      screen.getByText("Exercise: biceps curl"),
      screen.getByText("Reps: 4"),
      screen.getByText("Reps: 5"),
      screen.getByText("Reps: 6"),
      screen.getByText("Sets: 4"),
      screen.getByText("Sets: 5"),
      screen.getByText("Sets: 6"),
      screen.getByText("Muscles: Gluteus, Quads, Hamstrings, Claves"),
      screen.getByText("Muscles: Chest, Triceps"),
      screen.getByText("Muscles: biceps curl"),
    ];

    domElements_B.forEach((el) => expect(el).toBeInTheDocument());
    userEvent.click(submitBtn[1]);

    const expectedBodyRequest_B = {
      trainingDayName: "B",
      name: "Chest",
      time: 180,
      exercises: [
        {
          name: "deadlift",
          sets: 4,
          reps: 4,
          muscles: ["Gluteus", "Quads", "Hamstrings", "Claves"],
        },
        {
          name: "bench press",
          sets: 5,
          reps: 5,
          muscles: ["Chest", "Triceps"],
        },
        {
          name: "biceps curl",
          sets: 6,
          reps: 6,
          muscles: ["biceps curl"],
        },
      ],
    };

    await waitFor(() => {
      expect(spiedAxios.mock.calls[1][0]).toBe("/workout");
      expect(spiedAxios.mock.calls[1][1]).toStrictEqual(expectedBodyRequest_B);
      expect(spiedAxios.mock.calls[2][0]).toBe("/workout/hasAllWorkout");
      expect(spiedRouter.mock.calls[0][0]).toBe(
        "/auth/registration/schedule-program"
      );
    });
  });
});
