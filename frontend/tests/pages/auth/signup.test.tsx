import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import Signup from "../../../pages/auth/signup";
import { Provider } from "react-redux";
import store from "../../../redux/store";

describe("signup page tests", () => {
  test("should render the dom correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );

    const cardIndicator = container.children[0];
    const h2Indicator = screen.getByText("Sign Up");
    const formIndicator = screen.getAllByRole("textbox");
    const pIndicator = screen.getByText("Already have an account?", {
      exact: false,
    });

    expect(cardIndicator.className).toBe("Card");
    expect(h2Indicator).toBeInTheDocument();
    expect(pIndicator).toBeInTheDocument();
    expect(formIndicator.length).toBe(6);
    expect(document.querySelector("a")!.getAttribute("href")).toBe(
      "/auth/login"
    );
  });
});
