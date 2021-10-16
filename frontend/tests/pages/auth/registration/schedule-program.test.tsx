import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import ScheduleProgram, {
  getServerSideProps,
} from "../../../../pages/auth/registration/schedule-program";
import store from "../../../../redux/store/reduxStore";
import axiosInstance from "../../../../utils/axios/axiosInstance";
import * as protectedRoute from "../../../../utils/protectedRoutes/protectedRoutes";

jest.mock("nookies");

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

  test("should request all workouts and return them with redirect true", async () => {
    const { props } = (await getServerSideProps({
      req: { url: "not the current path" },
    } as any)) as any;

    expect(props.workouts).toStrictEqual(dummyWorkouts);
    expect(props.redirected).toBe(true);
    expect(spiedAxios.mock.calls[0][0]).toBe("/workout/all");
    expect(spiedAxios.mock.calls[0][1]).toStrictEqual({
      headers: {
        Cookie: `_csrf=_csrf; jon=jon; XSRF-TOKEN=token;`,
      },
    });
  });

  test("should request all workouts and return them with redirect false", async () => {
    const { props } = (await getServerSideProps({
      req: { url: "/auth/registration/schedule-program" },
    } as any)) as any;

    expect(props.workouts).toStrictEqual(dummyWorkouts);
    expect(props.redirected).toBe(false);
  });
});

describe("schedule program page tests", () => {
  let spiedAxios: jest.SpyInstance;
  let spiedCalls: any[] = [];

  beforeEach(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, "post")
      .mockImplementation(async (url, data) => {
        spiedCalls.push({ url, data });
      });
  });

  test("should render 'RecommendedOrder' if order is truthy", () => {
    localStorage.setItem("order", "A,B,X,A,B,X,A");

    render(
      <Provider store={store}>
        <ScheduleProgram redirected={false} workouts={dummyWorkouts} />
      </Provider>
    );

    expect(screen.getByTestId("recommended-order")).toBeInTheDocument();
  });

  test("should not render 'RecommendedOrder' if order is falsy", () => {
    localStorage.clear();

    render(
      <Provider store={store}>
        <ScheduleProgram redirected={false} workouts={dummyWorkouts} />
      </Provider>
    );

    expect(screen.queryByTestId("recommended-order")).not.toBeInTheDocument();
  });

  test("'RecommendedOrder' DOM and submission", async () => {
    localStorage.setItem("order", "A,B,X,A,B,X,X");
    render(
      <Provider store={store}>
        <ScheduleProgram workouts={dummyWorkouts} redirected={false} />
      </Provider>
    );
    //DOM
    expect(
      screen.getByTestId("recommended-order").children[0].textContent
    ).toBe(
      "Recommended: \nSun: chest (A)\nMon: back (B)\nTue: rest (X)\nWed: chest (A)\nThu: back (B)\nFri: rest (X)\nSat: rest (X)\n"
    );

    //Submission
    userEvent.click(screen.getAllByText("Continue")[0]);

    console.log(spiedCalls);
  });

  test.todo("'RecommendedOrder' DOM and submission (aerobic)");

  test.todo("'CustomOrder' DOM and submission");
});
