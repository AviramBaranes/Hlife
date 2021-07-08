import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import ProtectedRoute from "../../../components/HOC/protectedRoutes";
import { Provider } from "react-redux";
import store from "../../../Redux/store";

jest.mock("../../../Redux/Slices/auth");
jest.mock("react-redux", () => {
  const useSelector = jest.fn();

  useSelector
    // .mockReturnValueOnce({ isAuthenticated: true, loading: false })
    .mockReturnValueOnce({ isAuthenticated: true, loading: false })
    .mockReturnValueOnce({ isAuthenticated: false, loading: false })
    .mockReturnValueOnce({ isAuthenticated: true, loading: false })
    .mockReturnValueOnce({ isAuthenticated: false, loading: false })
    .mockReturnValueOnce({ isAuthenticated: true, loading: false });

  return {
    ...jest.requireActual("react-redux"),
    useSelector,
  };
});

describe("protected route", () => {
  test("should render the wrappedComponent (isAuthenticated: true)", () => {
    const dummyComponent = jest.fn((props) => props.props);

    const Component = ProtectedRoute(dummyComponent);

    render(
      <Provider store={store}>
        <Component props={"props"} />
      </Provider>
    );

    expect(dummyComponent.mock.calls.length).toBe(1);
    expect(dummyComponent.mock.calls[0][0].props).toBe("props");
  });

  test("should render the wrappedComponent (isAuthenticated: false)", async () => {
    const cb = () => {
      expect(dummyComponent.mock.calls.length).toBe(1);
      expect(dummyComponent.mock.calls[0][0].props).toBe("props");
    };

    const dummyComponent = jest.fn((props) => {
      cb();
      return props.props;
    });

    const Component = ProtectedRoute(dummyComponent);

    render(
      <Provider store={store}>
        <Component props={"props"} />
      </Provider>
    );
  });

  test("should redirect the user", (done) => {
    const dummyComponent = jest.fn();

    const Component = ProtectedRoute(dummyComponent);

    render(
      <Provider store={store}>
        <Component props={"props"} />
      </Provider>
    );

    setTimeout(() => {
      expect(window.location.routerReplacedValue).toBe("/auth/login");
      done();
    }, 1);
  });
});
