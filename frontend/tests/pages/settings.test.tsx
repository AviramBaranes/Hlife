import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import * as protectedRouteHandler from "../../utils/protectedRoutes/protectedRoutes";
import Layout from "../../components/Layout/Layout";
import { getServerSideProps } from "../../pages/settings";
import Settings from "../../pages/settings";
import store from "../../redux/store/reduxStore";
import { GetServerSidePropsContext } from "next";

describe("get server side props test", () => {
  let spiedProtectedRoute: jest.SpyInstance;

  beforeAll(() => {
    spiedProtectedRoute = jest
      .spyOn(protectedRouteHandler, "default")
      .mockImplementationOnce(async () => "")
      .mockImplementationOnce(async () => "/auth/login");
  });

  test("should return props with isAuthenticated set to true", async () => {
    const { props } = (await getServerSideProps(
      {} as GetServerSidePropsContext
    )) as { props: { isAuthenticated: boolean } };

    expect(spiedProtectedRoute).toBeCalled();
    expect(props.isAuthenticated).toBe(true);
  });
  test("should return props with isAuthenticated set to false", async () => {
    const { props } = (await getServerSideProps(
      {} as GetServerSidePropsContext
    )) as { props: { isAuthenticated: boolean } };

    expect(spiedProtectedRoute).toBeCalled();
    expect(props.isAuthenticated).toBe(false);
  });
});

describe("settings page tests", () => {
  test("should render the dom correctly (authenticated users)", () => {
    render(
      <Provider store={store}>
        <Settings isAuthenticated={true} />
      </Provider>
    );

    const titles = [
      screen.getByText("Settings"),
      screen.getByText("Light Mode"),
      screen.getByText("Reset Password"),
    ];
    const input = screen.getByRole("checkbox");
    const svg = titles[2].nextSibling as Element;

    titles.forEach((title) => expect(title).toBeInTheDocument());
    expect(input).toBeInTheDocument();
    expect(svg).toBeInTheDocument();

    userEvent.click(svg);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBe(3);
  });
  test("should render the dom correctly (not authenticated users)", () => {
    render(
      <Provider store={store}>
        <Settings isAuthenticated={false} />
      </Provider>
    );

    const titles = [
      screen.getByText("Settings"),
      screen.getByText("Light Mode"),
    ];
    const resetPasswordTitle = screen.queryByText("Reset Password");
    const input = screen.getByRole("checkbox");

    titles.forEach((title) => expect(title).toBeInTheDocument());
    expect(input).toBeInTheDocument();
    expect(resetPasswordTitle).not.toBeInTheDocument();
  });

  test("should change display settings when switch clicked", () => {
    render(
      <Provider store={store}>
        <Settings isAuthenticated={false} />
      </Provider>
    );

    expect(store.getState().settingsReducer.themeClass).toBe("DarkMode");

    const input = screen.getByRole("checkbox");

    userEvent.click(input);

    expect(store.getState().settingsReducer.themeClass).toBe("LightMode");
  });
});
