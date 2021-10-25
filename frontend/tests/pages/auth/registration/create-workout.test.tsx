import "@testing-library/jest-dom";
import {
  render,
  screen,
  Screen,
  queries,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import CreateWorkout, {
  getServerSideProps,
} from "../../../../pages/auth/registration/create-workout";
import store from "../../../../redux/store/reduxStore";
import axiosInstance from "../../../../utils/axios/axiosInstance";
import * as protectedRoute from "../../../../utils/protectedRoutes/protectedRoutes";

jest.mock("react-dom", () => {
  return {
    ...jest.requireActual("react-dom"),
    createPortal(Modal: any) {
      return Modal;
    },
  };
});

describe("get server side props tests", () => {
  beforeAll(() => {
    jest
      .spyOn(protectedRoute, "default")
      .mockImplementationOnce(async () => "wrong path")
      .mockImplementation(async () => "/auth/registration/create-workout");
  });

  test("should handle redirect", async () => {
    const { redirect } = (await getServerSideProps({} as any)) as any;

    expect(redirect.destination).toBe("wrong path");
  });
  test("should return props with redirect set to true", async () => {
    const { props } = (await getServerSideProps({} as any)) as any;

    expect(props).toStrictEqual({});
  });
});

describe("Create workout tests", () => {
  beforeAll(() => {
    jest.spyOn(axiosInstance, "post").mockImplementation(async () => "");
  });

  afterEach(() => localStorage.clear());

  const titlesExistence = (screen: Screen<typeof queries>) => {
    return {
      aerobicTitle: screen.queryByText("Create aerobic workout"),
      fbTitle: screen.queryByText("Create A Full Body Workout"),
      defaultWorkoutTitles: [
        screen.queryByText("Create A-Workout :"),
        screen.queryByText("Create B-Workout :"),
        screen.queryByText("Create C-Workout :"),
      ],
    };
  };

  test("should display only aerobic form", () => {
    localStorage.setItem("programStyle", "aerobic");

    render(
      <Provider store={store}>
        <CreateWorkout />
      </Provider>
    );

    const { defaultWorkoutTitles, fbTitle, aerobicTitle } =
      titlesExistence(screen);

    defaultWorkoutTitles.forEach((title) =>
      expect(title).not.toBeInTheDocument()
    );
    expect(fbTitle).not.toBeInTheDocument();
    expect(aerobicTitle).toBeInTheDocument();
  });

  test("should display aerobic form and FB form", async () => {
    localStorage.setItem("multiProgramStyles", "true");

    render(
      <Provider store={store}>
        <CreateWorkout />
      </Provider>
    );

    const { defaultWorkoutTitles, fbTitle, aerobicTitle } =
      titlesExistence(screen);

    defaultWorkoutTitles.forEach((title) =>
      expect(title).not.toBeInTheDocument()
    );
    expect(fbTitle).not.toBeInTheDocument();
    expect(aerobicTitle).toBeInTheDocument();

    userEvent.type(screen.getByLabelText("Workout name"), "boxing");
    userEvent.type(screen.getByLabelText("Total time"), "01:30");
    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(
        screen.queryByText("Create aerobic workout")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Create A Full Body Workout")
      ).toBeInTheDocument();
      expect(screen.queryByText("Create ABC Workout")).not.toBeInTheDocument();
    });
  });

  test("should display only FB form", () => {
    localStorage.setItem("programStyle", "FB");

    render(
      <Provider store={store}>
        <CreateWorkout />
      </Provider>
    );

    const { defaultWorkoutTitles, fbTitle, aerobicTitle } =
      titlesExistence(screen);

    defaultWorkoutTitles.forEach((title) =>
      expect(title).not.toBeInTheDocument()
    );
    expect(fbTitle).toBeInTheDocument();
    expect(aerobicTitle).not.toBeInTheDocument();
  });

  test("should display multiple default forms according to programStyle", () => {
    localStorage.setItem("programStyle", "ABC");

    render(
      <Provider store={store}>
        <CreateWorkout />
      </Provider>
    );

    const { defaultWorkoutTitles, fbTitle, aerobicTitle } =
      titlesExistence(screen);

    expect(defaultWorkoutTitles[0]).toBeInTheDocument()
    expect(defaultWorkoutTitles[1]).not.toBeInTheDocument()
    expect(defaultWorkoutTitles[2]).not.toBeInTheDocument()
    expect(fbTitle).not.toBeInTheDocument();
    expect(aerobicTitle).not.toBeInTheDocument();
  });
});
