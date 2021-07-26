import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navigation from "../../../components/Layout/Navigation";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

jest.mock("react-dom", () => {
  return {
    ...jest.requireActual("react-dom"),
    createPortal(Modal: any) {
      return Modal;
    },
  };
});

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

describe("Navigation", () => {
  test("should render the dom correctly (test by elements)", () => {
    const initialState = { usersReducer: { isAuthenticated: false } };

    const store = mockStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <Navigation />
      </Provider>
    );

    const navElement = container.children[0].children[0];
    const headerDiv = navElement.children[0];
    const ulElement = navElement.children[1];

    expect(navElement.tagName).toBe("NAV");
    expect(headerDiv.tagName).toBe("DIV");
    expect(ulElement.tagName).toBe("UL");
    expect(ulElement.children.length).toBe(4);
  });

  test("should render the dom correctly (test by text)", () => {
    const initialState = { usersReducer: { isAuthenticated: true } };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Navigation />
      </Provider>
    );

    const elements = [
      screen.getByText("Hlife"),
      screen.getByText("Reach your goals faster and better"),
      screen.getByText("Profile"),
      screen.getByText("Activity"),
      screen.getByText("Calculators"),
      screen.getByText("Settings"),
    ];

    elements.forEach((element) => expect(element).toBeInTheDocument());
  });

  test("should render the 'logout' item", () => {
    const initialState = { usersReducer: { isAuthenticated: true } };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Navigation />
      </Provider>
    );

    const logoutItem = screen.queryByText("Log Out");

    expect(logoutItem).toBeInTheDocument();
  });
  test("should not render the 'logout' item", () => {
    const initialState = { usersReducer: { isAuthenticated: false } };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Navigation />
      </Provider>
    );

    const logoutItem = screen.queryByText("Log Out");

    expect(logoutItem).not.toBeInTheDocument();
  });

  test("should open the modal", () => {
    const initialState = { usersReducer: { isAuthenticated: true } };

    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <Navigation />
      </Provider>
    );

    const logoutItem = getByText("Log Out");

    userEvent.click(logoutItem);

    const modalIndicator = screen.getByText("Are you sure you want to logout?");

    expect(modalIndicator).toBeInTheDocument();
  });
});
