import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import SendEmail from "../../../pages/auth/forgotPassword";
import { Provider } from "react-redux";
import store from "../../../redux/store/reduxStore";

describe("send email page tests", () => {
  test("should render the dom correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <SendEmail />
      </Provider>
    );

    const h1Element = screen.getByText("Reset Password");
    const h5Element = screen.getByText(
      "Fill your email, and we will send you a link to reset your password"
    );
    const formElement = screen.getByRole("form");
    const inputElement = screen.getByRole("textbox");
    const labelElement = screen.getByLabelText("Email:");
    const svgElement = container.children[1].children[1].children[0];

    expect(h1Element.tagName).toBe("H1");
    expect(h5Element).toBeInTheDocument();
    expect(formElement.tagName).toBe("FORM");
    expect(svgElement.tagName).toBe("svg");
    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });
});
