import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Navigation from "../../../components/Layout/MainNav/Navigation";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

describe("Navigation", () => {
  test("should render the dom correctly (registration nav)", () => {
    const initialState = {
      usersReducer: { isAuthenticated: true, hasProgram: false },
    };

    const store = mockStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <Navigation setDisplaySideNav={() => {}} />
      </Provider>
    );

    const navElement = container.children[0];
    const logoElement = navElement.children[0];
    const ulElement = navElement.children[1];
    const barsIconElement = navElement.children[2];

    expect(navElement.tagName).toBe("NAV");
    expect(logoElement.tagName).toBe("H1");
    expect(logoElement.children[0].tagName).toBe("A");
    expect(barsIconElement.tagName).toBe("DIV");
    expect(barsIconElement.children[0].tagName).toBe("svg");
    expect(ulElement.tagName).toBe("UL");
    expect(ulElement.children.length).toBe(2);
    expect(ulElement.children[0].tagName).toBe("LI");
    expect(ulElement.children[0].children[0].tagName).toBe("H2");
    expect(ulElement.children[1].tagName).toBe("LI");
    expect(ulElement.children[1].children[0].tagName).toBe("H2");
  });

  test("should render the dom correctly (test by text) (registration nav)", () => {
    const initialState = {
      usersReducer: { isAuthenticated: false, hasProgram: true },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Navigation setDisplaySideNav={() => {}} />
      </Provider>
    );

    const elements = [
      screen.getByText("Hlife"),
      screen.getByText("Log-In"),
      screen.getByText("Sign-Up"),
    ];

    elements.forEach((element) => expect(element).toBeInTheDocument());
  });

  test("should render the dom correctly (normal nav)", () => {
    const initialState = {
      usersReducer: { isAuthenticated: true, hasProgram: true },
    };

    const store = mockStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <Navigation setDisplaySideNav={() => {}} />
      </Provider>
    );

    const navElement = container.children[0];
    const logoElement = navElement.children[0];
    const ulElement = navElement.children[1];
    const barsIconElement = navElement.children[2];

    expect(navElement.tagName).toBe("NAV");
    expect(logoElement.tagName).toBe("H1");
    expect(logoElement.children[0].tagName).toBe("A");
    expect(barsIconElement.tagName).toBe("DIV");
    expect(barsIconElement.children[0].tagName).toBe("svg");
    expect(ulElement.tagName).toBe("UL");
    expect(ulElement.children.length).toBe(3);
    expect(ulElement.children[0].tagName).toBe("LI");
    expect(ulElement.children[0].children[0].tagName).toBe("H2");
    expect(ulElement.children[1].tagName).toBe("LI");
    expect(ulElement.children[1].children[0].tagName).toBe("H2");
    expect(ulElement.children[2].tagName).toBe("LI");
    expect(ulElement.children[2].children[0].tagName).toBe("H2");
  });

  test("should render the dom correctly (test by text) (normal nav)", () => {
    const initialState = {
      usersReducer: { isAuthenticated: true, hasProgram: true },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Navigation setDisplaySideNav={() => {}} />
      </Provider>
    );

    const elements = [
      screen.getByText("Hlife"),
      screen.getByText("Home"),
      screen.getByText("Stats"),
      screen.getByText("Program"),
    ];

    elements.forEach((element) => expect(element).toBeInTheDocument());
  });
});
