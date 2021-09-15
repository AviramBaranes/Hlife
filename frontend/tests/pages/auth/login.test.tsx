import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Login from "../../../pages/auth/login";
import { Provider } from "react-redux";
import store from "../../../redux/store/reduxStore";

describe("login page tests", () => {
  test("should render the dom correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const links = screen.getAllByRole("link");
    const h1Title = screen.getByText("Welcome Back!");
    const h2Title = screen.getByText("Log In");
    const formElement = container.children[1].children[0].children[2];
    const inputs = screen.getAllByRole("textbox");
    const svgElement = container.children[1].children[0].children[1];
    const p1Element = container.children[2].children[0].children[0];
    const p2Element = container.children[2].children[0].children[1];

    expect(h1Title.tagName).toEqual("H1");
    expect(h2Title.tagName).toEqual("H2");
    expect(formElement.tagName).toEqual("FORM");
    expect(svgElement.tagName).toEqual("svg");
    expect(p1Element.textContent).toEqual("Don't have an account? signup");
    expect(p2Element.textContent).toEqual("Forgot your password? go here");
    expect(links[0]).toHaveAttribute("href", "/auth/signup");
    expect(links[1]).toHaveAttribute("href", "/auth/forgotPassword");
    expect(inputs.length).toEqual(2);
  });
});
