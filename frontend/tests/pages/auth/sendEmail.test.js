import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import SendEmail from "../../../pages/auth/forgotPassword";
import { Provider } from "react-redux";
import store from "../../../Redux/store";

describe("sugnup page tests", () => {
  test("should render the dom correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <SendEmail />
      </Provider>
    );

    const cardIndicator = container.children[0];
    const h2Indicator = screen.getByText("Reset Password");
    const formIndicator = screen.getAllByRole("textbox");
    const pIndicator = screen.getByText(
      "Fill your email, and we will send you a link to reset yout password"
    );

    expect(cardIndicator.className).toBe("Card");
    expect(h2Indicator).toBeInTheDocument();
    expect(pIndicator).toBeInTheDocument();
    expect(formIndicator.length).toBe(1);
  });
});
