import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Login from "../../../pages/auth/login";
import { Provider } from "react-redux";
import store from "../../../redux/store";

describe("login page tests", () => {
  test("should render the dom correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const cardIndicator = container.children[0];
    const h2Indicator = screen.getByText("Log In");
    const formIndicator = screen.getAllByRole("textbox");
    const pIndicator = screen.getByText("Don't have an account?", {
      exact: false,
    });
    const pIndicator2 = screen.getByText("Forgot your password ?", {
      exact: false,
    });

    expect(cardIndicator.className).toBe("Card");
    expect(h2Indicator).toBeInTheDocument();
    expect(pIndicator).toBeInTheDocument();
    expect(pIndicator2).toBeInTheDocument();
    expect(formIndicator.length).toBe(2);
    expect(document.querySelectorAll("a")[0].getAttribute("href")).toBe(
      "/auth/signup"
    );
    expect(document.querySelectorAll("a")[1].getAttribute("href")).toBe(
      "/auth/forgotPassword"
    );
  });
});
