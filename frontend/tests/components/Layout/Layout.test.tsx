import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import Layout from "../../../components/Layout/Layout";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

jest.mock("../../../components/UI/containers/Errors/ErrorContainer", () =>
  jest.fn()
);

describe("Layout component", () => {
  test("should render children", () => {
    const initialState = {
      usersReducer: {
        isAuthenticated:false,
        hasProgram:false
      },
      tokensReducer: {
        error: { message: "" },
      },
      settingsReducer: {
        themeClass: "DarkMode",
      },
    };

    const store = mockStore(initialState);

    const children = [<h1 key={1}>I'm here!</h1>];

    render(
      <Provider store={store}>
        <Layout children={children} />
      </Provider>
    );

    const loadingDiv = screen.queryByText("Loading...");

    const aChildren = screen.getByText("I'm here!");
    const navigationText = screen.getByText("Hlife");

    expect(loadingDiv).not.toBeInTheDocument();
    expect(navigationText).toBeInTheDocument();
    expect(aChildren).toBeInTheDocument();
  });
  test("should dispatch an error", () => {
    const children = [<h1>first child</h1>, <h1>second child</h1>];
    const message = "this is an error";
    const initialState = {
      usersReducer: {
        isAuthenticated:false,
        hasProgram:false
      },
      tokensReducer: {
        error: { message },
      },
      settingsReducer: {
        themeClass: "DarkMode",
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Layout children={children} />
      </Provider>
    );

    const action = store.getActions()[0];

    expect(action.type).toBe("errors/newError");
    expect(action.payload.errorTitle).toBe("Server Error");
    expect(action.payload.errorMessage).toBe(`${message}, try to refresh`);
    expect(screen.queryByText("second child")).not.toBeInTheDocument();
    expect(screen.queryByText("first child")).toBeInTheDocument();
  });
  test("should render error container", () => {
    const initialState = {
      usersReducer: {
        isAuthenticated:false,
        hasProgram:false
      },
      tokensReducer: {
        error: { message: "error message" },
      },
      settingsReducer: {
        themeClass: "DarkMode",
      },
    };

    const store = mockStore(initialState);
    const children = [
      <h1 key={2}>errorContainer</h1>,
      <h1 key={2}>second child</h1>,
    ];
    render(
      <Provider store={store}>
        <Layout children={children} />
      </Provider>
    );
    const errorContainer = screen.getByText("errorContainer");

    const secondChild = screen.queryByText("second child");

    expect(errorContainer).toBeInTheDocument();
    expect(secondChild).not.toBeInTheDocument();
  });
});
