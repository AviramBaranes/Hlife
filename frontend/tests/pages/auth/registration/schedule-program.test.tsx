import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import ScheduleProgram, {
  getServerSideProps,
} from "../../../../pages/auth/registration/schedule-program";
import store from "../../../../redux/store/reduxStore";
import axiosInstance from "../../../../utils/axios/axiosInstance";
import * as protectedRoute from "../../../../utils/protectedRoutes/protectedRoutes";

jest.mock("nookies", () => ({
  parseCookies: jest
    .fn()
    .mockImplementationOnce(() => ({
      _csrf: "_csrf",
      jon: "jon",
      XSRF_TOKEN: "token",
    }))
    .mockImplementationOnce(() => ({
      _csrf: "_csrf",
      jon: "jon",
      XSRF_TOKEN: "token",
    })),
}));

const dummyWorkouts = [
  { name: "chest", trainingDayName: "A" },
  { name: "back", trainingDayName: "B" },
];

describe("schedule program get server side props tests", () => {
  let spiedAxios: jest.SpyInstance;
  beforeAll(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, "get")
      .mockImplementation(async () => ({
        data: [
          { name: "chest", trainingDayName: "A", moreData: 1111 },
          { name: "back", trainingDayName: "B" },
        ],
      }));
    jest
      .spyOn(protectedRoute, "default")
      .mockImplementationOnce(async () => "wrong path")
      .mockImplementation(async () => "/auth/registration/schedule-program");
  });

  test("should redirect", async () => {
    const { redirect } = (await getServerSideProps({} as any)) as any;

    expect(redirect.destination).toBe("wrong path");
  });

  test("should request all workouts and return them in props", async () => {
    const { props } = (await getServerSideProps({} as any)) as any;

    expect(props.workouts).toStrictEqual(dummyWorkouts);
    expect(spiedAxios.mock.calls[0][0]).toBe("/workout/all");
    expect(spiedAxios.mock.calls[0][1]).toStrictEqual({
      headers: {
        Cookie: `_csrf=_csrf; jon=jon; XSRF-TOKEN=token;`,
      },
    });
  });
});

describe("schedule program page tests", () => {
  let spiedAxios: jest.SpyInstance;

  beforeEach(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, "post")
      .mockImplementation(async () => {});
  });

  afterEach(() => jest.resetAllMocks());

  test("should render 'RecommendedOrder' if order is truthy", () => {
    localStorage.setItem("order", "A,B,X,A,B,X,A");

    render(
      <Provider store={store}>
        <ScheduleProgram workouts={dummyWorkouts} />
      </Provider>
    );

    expect(screen.getByTestId("recommended-order")).toBeInTheDocument();
  });

  test("should not render 'RecommendedOrder' if order is falsy", () => {
    localStorage.clear();

    render(
      <Provider store={store}>
        <ScheduleProgram workouts={dummyWorkouts} />
      </Provider>
    );

    expect(screen.queryByTestId("recommended-order")).not.toBeInTheDocument();
  });

  test("'RecommendedOrder' DOM and submission", async () => {
    localStorage.setItem("order", "A,B,X,A,B,X,X");
    render(
      <Provider store={store}>
        <ScheduleProgram workouts={dummyWorkouts} />
      </Provider>
    );
    //DOM
    expect(
      screen.getByTestId("recommended-order").children[0].textContent
    ).toBe(
      "Recommendation: Sun: chest (A)Mon: back (B)Tue: rest (X)Wed: chest (A)Thu: back (B)Fri: rest (X)Sat: rest (X)"
    );
 
    //Submission
    userEvent.click(screen.getAllByText("Continue")[0]);

    await waitFor(() => {
      const axiosCalls = spiedAxios.mock.calls;
      expect(axiosCalls[0][0]).toBe("/program/Sunday");
      expect(axiosCalls[1][0]).toBe("/program/Monday");
      expect(axiosCalls[2][0]).toBe("/program/Tuesday");
      expect(axiosCalls[3][0]).toBe("/program/Wednesday");
      expect(axiosCalls[4][0]).toBe("/program/Thursday");
      expect(axiosCalls[5][0]).toBe("/program/Friday");
      expect(axiosCalls[6][0]).toBe("/program/Saturday");
      expect(axiosCalls[0][1]).toStrictEqual({
        workoutName: "chest",
        trainingDayName: "A",
      });
      expect(axiosCalls[1][1]).toStrictEqual({
        workoutName: "back",
        trainingDayName: "B",
      });
      expect(axiosCalls[2][1]).toStrictEqual({});
      expect(axiosCalls[3][1]).toStrictEqual({
        workoutName: "chest",
        trainingDayName: "A",
      });
      expect(axiosCalls[4][1]).toStrictEqual({
        workoutName: "back",
        trainingDayName: "B",
      });
      expect(axiosCalls[5][1]).toStrictEqual({});
      expect(axiosCalls[6][1]).toStrictEqual({});
    });
  });

  test("'RecommendedOrder' DOM and submission (aerobic)", async () => {
    localStorage.setItem("order", "aerobic,X,aerobic,X,aerobic,aerobic,X");
    const aerobicWorkout = [
      { name: "boxing", trainingDayName: "aerobic" },
      { name: "running", trainingDayName: "aerobic" },
    ];

    render(
      <Provider store={store}>
        <ScheduleProgram workouts={aerobicWorkout} />
      </Provider>
    );

    //DOM
    expect(
      screen.getByTestId("recommended-order").children[0].textContent
    ).toBe(
      "Recommendation: Sun: boxing (aerobic)Mon: rest (X)Tue: running (aerobic)Wed: rest (X)Thu: boxing (aerobic)Fri: running (aerobic)Sat: rest (X)"
    );

    //Submission
    userEvent.click(screen.getAllByText("Continue")[0]);

    await waitFor(() => {
      const axiosCalls = spiedAxios.mock.calls;
      expect(axiosCalls[0][0]).toBe("/program/Sunday");
      expect(axiosCalls[1][0]).toBe("/program/Monday");
      expect(axiosCalls[2][0]).toBe("/program/Tuesday");
      expect(axiosCalls[3][0]).toBe("/program/Wednesday");
      expect(axiosCalls[4][0]).toBe("/program/Thursday");
      expect(axiosCalls[5][0]).toBe("/program/Friday");
      expect(axiosCalls[6][0]).toBe("/program/Saturday");
      expect(axiosCalls[0][1]).toStrictEqual({
        workoutName: "boxing",
        trainingDayName: "aerobic",
      });
      expect(axiosCalls[1][1]).toStrictEqual({});
      expect(axiosCalls[2][1]).toStrictEqual({
        workoutName: "running",
        trainingDayName: "aerobic",
      });
      expect(axiosCalls[3][1]).toStrictEqual({});
      expect(axiosCalls[4][1]).toStrictEqual({
        workoutName: "boxing",
        trainingDayName: "aerobic",
      });
      expect(axiosCalls[5][1]).toStrictEqual({
        workoutName: "running",
        trainingDayName: "aerobic",
      });
      expect(axiosCalls[6][1]).toStrictEqual({});
    });
  });

  test("'CustomOrder' DOM and submission", async () => {
    localStorage.clear();
    render(
      <Provider store={store}>
        <ScheduleProgram workouts={dummyWorkouts} />
      </Provider>
    );

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const workouts = ["rest", "chest (A)", "back (B)"];
    days.forEach((day, i) => {
      const selectEl = screen.getByLabelText(day);
      expect(selectEl.children[1].textContent).toBe(workouts[0]);
      expect(selectEl.children[2].textContent).toBe(workouts[1]);
      expect(selectEl.children[3].textContent).toBe(workouts[2]);
      userEvent.selectOptions(
        selectEl,
        workouts[i] || workouts[i - 3] || workouts[i - 6]
      );

      const btn = screen.getByText("Continue");
      i < 6 ? expect(btn).toBeDisabled() : expect(btn).not.toBeDisabled();
    });

    //handle change in the middle of the list:
    userEvent.selectOptions(screen.getByLabelText("Wednesday"), workouts[2]);
    userEvent.click(screen.getByText("Continue"));

    await waitFor(() => {
      const axiosCalls = spiedAxios.mock.calls;
      expect(axiosCalls[0][0]).toBe("/program/Sunday");
      expect(axiosCalls[1][0]).toBe("/program/Monday");
      expect(axiosCalls[2][0]).toBe("/program/Tuesday");
      expect(axiosCalls[3][0]).toBe("/program/Wednesday");
      expect(axiosCalls[4][0]).toBe("/program/Thursday");
      expect(axiosCalls[5][0]).toBe("/program/Friday");
      expect(axiosCalls[6][0]).toBe("/program/Saturday");
      expect(axiosCalls[0][1]).toBe(undefined);
      expect(axiosCalls[1][1]).toStrictEqual({
        workoutName: "chest",
        trainingDayName: "A",
      });
      expect(axiosCalls[2][1]).toStrictEqual({
        workoutName: "back",
        trainingDayName: "B",
      });
      expect(axiosCalls[3][1]).toStrictEqual({
        workoutName: "back",
        trainingDayName: "B",
      });
      expect(axiosCalls[4][1]).toStrictEqual({
        workoutName: "chest",
        trainingDayName: "A",
      });
      expect(axiosCalls[5][1]).toStrictEqual({
        workoutName: "back",
        trainingDayName: "B",
      });
      expect(axiosCalls[6][1]).toBe(undefined);
    });
  });
});
