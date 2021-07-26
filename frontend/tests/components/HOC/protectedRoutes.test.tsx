import "@testing-library/jest-dom/extend-expect";

import { render, waitFor } from "@testing-library/react";

import ProtectedRoute from "../../../components/HOC/protectedRoutes";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

jest.mock("../../../redux/slices/auth");

describe("protected route", () => {
  test("should render the wrappedComponent (isAuthenticated: true)", () => {
    const initialState = {
      usersReducer: { isAuthenticated: true, loading: false },
    };
    const store = mockStore(initialState);
    const dummyComponent = jest.fn((props) => props.props);
    const Component = ProtectedRoute(dummyComponent) as any;
    render(
      <Provider store={store}>
        <Component props={"props"} />
      </Provider>
    );
    expect(dummyComponent.mock.calls.length).toBe(1);
    expect(dummyComponent.mock.calls[0][0].props).toBe("props");
  });
  test("should render the wrappedComponent (isAuthenticated: false)", async () => {
    const initialState = {
      usersReducer: { isAuthenticated: false, loading: false },
    };
    const store = mockStore(initialState);

    const dummyComponent = jest.fn((props) => {
      return props.props;
    });

    const Component = ProtectedRoute(dummyComponent) as any;
    render(
      <Provider store={store}>
        <Component props={"props"} />
      </Provider>
    );
    await waitFor(() => {
      expect(dummyComponent.mock.calls.length).toBe(1);
      expect(dummyComponent.mock.calls[0][0].props).toBe("props");
    });
  });
  test("should redirect the user", (done) => {
    const initialState = {
      usersReducer: { isAuthenticated: false, loading: false },
    };
    const store = mockStore(initialState);

    const dummyComponent = jest.fn();
    const Component = ProtectedRoute(dummyComponent) as any;
    render(
      <Provider store={store}>
        <Component props={"props"} />
      </Provider>
    );
    setTimeout(() => {
      expect((window as any).location.routerReplacedValue).toBe("/auth/login");
      expect(dummyComponent.mock.calls.length).toBe(0);
      done();
    }, 1);
  });
});
