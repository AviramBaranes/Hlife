import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import Layout from "../../../components/Layout/Layout";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

jest.mock("../../../Redux/Slices/tokens");

describe("Layout component", () => {
  test("should render loading spinner", () => {
    const initialState = {
      usersReducer: {
        loading: true,
      },
      tokensReducer: {
        error: null,
      },
    };

    const store = mockStore(initialState);

    const children = [<h1>not here</h1>];

    render(
      <Provider store={store}>
        <Layout children={children} />
      </Provider>
    );

    const loadingDiv = screen.getByText("Loading...");

    const aChildren = screen.queryByText("not here");
    const navigationText = screen.queryByText("Hlife");

    expect(loadingDiv).toBeInTheDocument();
    expect(navigationText).toBeInTheDocument();
    expect(aChildren).not.toBeInTheDocument();
  });

  test("should render loading spinner", () => {
    const initialState = {
      usersReducer: {
        loading: false,
      },
      tokensReducer: {
        error: null,
      },
    };

    const store = mockStore(initialState);

    const children = <h1>I'm here!</h1>;

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
});
