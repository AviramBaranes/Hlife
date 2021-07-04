import { render, screen } from "@testing-library/react";
import ForgotPasswordForm from "../../components/auth/forms/forgotPassword-form";

describe("ForgotPasswordForm", () => {
  test("should render a form", () => {
    render(<ForgotPasswordForm />);

    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });
});
