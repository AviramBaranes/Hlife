import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";

import ErrorContainer from "../../../../components/UI/ErrorContainer/ErrorContainer";

const middleware = getDefaultMiddleware();
const mockStore = configureStore(middleware);

describe("error modal test", () => {
  test("should render the error with fields", () => {
    const initialState = {
      errorsReducer: {
        newError: true,
        errorTitle: "title",
        errorMessage: "message",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ErrorContainer />
      </Provider>
    );

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("message")).toBeInTheDocument();
  });
  test("should not render the error with fields", () => {
    const initialState = {
      errorsReducer: {
        newError: false,
        errorTitle: "title",
        errorMessage: "message",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ErrorContainer />
      </Provider>
    );

    expect(screen.queryByText("title")).not.toBeInTheDocument();
    expect(screen.queryByText("message")).not.toBeInTheDocument();
  });
  test("should stop render the container after clicked", () => {
    const initialState = {
      errorsReducer: {
        newError: true,
        errorTitle: "title",
        errorMessage: "message",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ErrorContainer />
      </Provider>
    );
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("message")).toBeInTheDocument();

    userEvent.click(screen.getByRole("button"));

    const action = store.getActions()[0];

    expect(action.type).toBe("errors/errorConfirmed");
  });
});
