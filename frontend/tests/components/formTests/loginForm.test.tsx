import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import store from "../../../redux/store";
import LoginForm from "../../../components/auth/forms/login-form";
import ErrorContainer from "../../../components/UI/containers/Errors/ErrorContainer";
import MessageContainer from "../../../components/UI/containers/Messages/MessageContainer";

jest.mock("next/router");
jest.unmock("react-redux");
jest.mock("../../../redux/slices/auth");
describe("LoginForm", () => {
  test("should render the correct dom elements", async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const formElement = screen.getByRole("form");
    const emailLabelElement = screen.getByLabelText("Email:");
    const passwordLabelElement = screen.getByLabelText("Password:");
    const emailInputElement = screen.getByPlaceholderText("email");
    const passwordInputElement = screen.getByPlaceholderText("password");
    const buttonElement = screen.getByRole("button");

    expect(formElement).toBeInTheDocument();
    expect(emailLabelElement).toBeInTheDocument();
    expect(passwordLabelElement).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("should add 'invalid' class to input if inputs are invalid and disable the button", () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const emailInputElement = screen.getByPlaceholderText("email");
    const passwordInputElement = screen.getByPlaceholderText("password");
    const buttonElement = screen.getByRole("button");

    userEvent.type(emailInputElement, "not an email");
    userEvent.type(passwordInputElement, "123");

    expect(emailInputElement.classList[1]).toEqual("InValid");
    expect(passwordInputElement.classList[1]).toEqual("InValid");
    expect(buttonElement).toBeDisabled();
  });

  test("should add 'invalid' class if email is not an email", () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const emailInputElement = screen.getByPlaceholderText("email");
    const passwordInputElement = screen.getByPlaceholderText("password");
    const buttonElement = screen.getByRole("button");

    userEvent.type(emailInputElement, "not an email");
    userEvent.type(passwordInputElement, "123456");

    expect(emailInputElement.classList[1]).toEqual("InValid");
    expect(passwordInputElement.classList[1]).toEqual(undefined);
    expect(buttonElement).toBeDisabled();
  });

  test("should add 'invalid' class to input if password to short", () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const emailInputElement = screen.getByPlaceholderText("email");
    const passwordInputElement = screen.getByPlaceholderText("password");
    const buttonElement = screen.getByRole("button");

    userEvent.type(emailInputElement, "email@email.com");
    userEvent.type(passwordInputElement, "123");

    expect(emailInputElement.classList[1]).toEqual(undefined);
    expect(passwordInputElement.classList[1]).toEqual("InValid");
    expect(buttonElement).toBeDisabled();
  });

  test("should behave approprialy if inputs are valid", () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const emailInputElement = screen.getByPlaceholderText("email");
    const passwordInputElement = screen.getByPlaceholderText("password");
    const buttonElement = screen.getByRole("button");

    userEvent.type(emailInputElement, "email@email.com");
    userEvent.type(passwordInputElement, "123456");

    expect(emailInputElement.classList[1]).toEqual(undefined);
    expect(passwordInputElement.classList[1]).toEqual(undefined);
    expect(buttonElement).not.toBeDisabled();
  });

  test("should display error message if form submition failed ", async () => {
    render(
      <Provider store={store}>
        <ErrorContainer />
        <LoginForm />
      </Provider>
    );

    const emailInputElement = screen.getByPlaceholderText("email");
    const passwordInputElement = screen.getByPlaceholderText("password");
    const buttonElement = screen.getByRole("button");

    userEvent.type(emailInputElement, "email@email.com");
    userEvent.type(passwordInputElement, "123456");
    userEvent.click(buttonElement);

    const titleElement = await screen.findByText("Login Failed");
    const messageElement = await screen.findByText("error data");

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  test("should desplay success message if form submition succeed ", async () => {
    render(
      <Provider store={store}>
        <MessageContainer />
        <LoginForm />
      </Provider>
    );

    const emailInputElement = screen.getByPlaceholderText("email");
    const passwordInputElement = screen.getByPlaceholderText("password");
    const buttonElement = screen.getByRole("button");

    userEvent.type(emailInputElement, "email@email.com");
    userEvent.type(passwordInputElement, "123456");
    userEvent.click(buttonElement);

    const titleElement = await screen.findByText("Logged In!");
    const messageElement = await screen.findByText(
      "your email is email@email.com"
    );

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect((window as any).location.routerPushedValue).toBe("/");
  });
});

//7 tests
