import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import store from "../../../redux/store/reduxStore";
import ForgotPasswordForm from "../../../components/auth/forms/forgotPassword-form";
import ErrorContainer from "../../../components/UI/containers/Errors/ErrorContainer";
import MessageContainer from "../../../components/UI/containers/Messages/MessageContainer";
import Router from "next/router";

jest.mock("../../../redux/slices/auth/authSlice");
jest.mock("next/router");

describe("ForgotPasswordForm", () => {
  let spiedRouter: jest.SpyInstance<Promise<boolean>, any>;

  beforeAll(() => {
    spiedRouter = jest.spyOn(Router, "push");
  });

  test("should render the correct dom elements", () => {
    render(
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    );

    const formElement = screen.getByRole("form");
    const labelElement = screen.getByLabelText("Email:");
    const inputElement = screen.getByPlaceholderText("email");
    const buttonElement = screen.getByRole("button");

    expect(formElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("should add 'invalid' class to input if input is invalid and disable the button", () => {
    render(
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("email");
    const buttonElement = screen.getByRole("button");

    userEvent.type(inputElement, "not an email");

    expect(inputElement.classList[1]).toEqual("InValid");
    expect(buttonElement).toBeDisabled();
  });

  test("should behave appropriately if input is valid", () => {
    render(
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("email");
    const buttonElement = screen.getByRole("button");

    userEvent.type(inputElement, "email@email.com");

    expect(inputElement.classList[1]).toEqual(undefined);
    expect(buttonElement).not.toBeDisabled();
  });

  test("should display error message if form submission failed ", async () => {
    render(
      <Provider store={store}>
        <ErrorContainer />
        <ForgotPasswordForm />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("email");
    const buttonElement = screen.getByRole("button");

    userEvent.type(inputElement, "email@email.com");
    userEvent.click(buttonElement);

    const titleElement = await screen.findByText("Sending email failed");
    const messageElement = await screen.findByText("error data");

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  test("should display success message if form submission succeed ", async () => {
    render(
      <Provider store={store}>
        <MessageContainer />
        <ForgotPasswordForm />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("email");
    const buttonElement = screen.getByRole("button");

    userEvent.type(inputElement, "email@email.com");
    userEvent.click(buttonElement);

    const titleElement = await screen.findByText("Email Sent!");
    const messageElement = await screen.findByText(
      "email sent to email@email.com"
    );

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(spiedRouter.mock.calls[0][0]).toEqual("/auth/login");
  });
});

//5 tests
