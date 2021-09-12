import "@testing-library/jest-dom/extend-expect";

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import store from "../../../redux/store";
import SignupForm from "../../../components/auth/forms/signup-form";
import ErrorContainer from "../../../components/UI/containers/Errors/ErrorContainer";
import MessageContainer from "../../../components/UI/containers/Messages/MessageContainer";
import Router from "next/router";

jest.mock("../../../redux/slices/auth");
jest.mock("next/router");

describe("SignupForm Dom Renders Tests", () => {
  test("should render the correct dom elements (only labels)", async () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const nameLabelElement = screen.getByLabelText("Name:");
    const usernameLabelElement = screen.getByLabelText("Username:");
    const emailLabelElement = screen.getByLabelText("Email:");
    const passwordLabelElement = screen.getByLabelText("Password:");
    const passwordConfirmationLabelElement = screen.getByLabelText("Confirm:");
    const genderLabelElement = screen.getByLabelText("Gender:");
    const dateLabelElement = screen.getByLabelText("Date Of Birth:");

    expect(nameLabelElement).toBeInTheDocument();
    expect(usernameLabelElement).toBeInTheDocument();
    expect(emailLabelElement).toBeInTheDocument();
    expect(passwordLabelElement).toBeInTheDocument();
    expect(passwordConfirmationLabelElement).toBeInTheDocument();
    expect(genderLabelElement).toBeInTheDocument();
    expect(dateLabelElement).toBeInTheDocument();
  });

  test("should render the correct dom elements (rest of the elements)", async () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const formElement = screen.getByRole("form");
    const selectElement = screen.getByRole("listbox");
    const inputList = screen.getAllByRole("textbox");
    const buttonElement = screen.getByRole("button");

    expect(formElement).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
    expect(inputList.length).toBe(6);
    expect(buttonElement).toBeInTheDocument();
  });
});

describe("SignupForm Validity Handle Test", () => {
  test("should be invalid (name invalid)", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText("name");

    expect(inputElement.classList[1]).toBe(undefined);

    userEvent.type(inputElement, "av");

    expect(inputElement.classList[1]).toBe("InValid");
    expect(buttonElement).toBeDisabled();
  });

  test("should be invalid (username invalid)", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText("username");

    expect(inputElement.classList[1]).toBe(undefined);

    userEvent.type(inputElement, "av");

    expect(inputElement.classList[1]).toBe("InValid");
    expect(buttonElement).toBeDisabled();
  });

  test("should be invalid (email invalid)", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText("email");

    expect(inputElement.classList[1]).toBe(undefined);

    userEvent.type(inputElement, "not an email");

    expect(inputElement.classList[1]).toBe("InValid");
    expect(buttonElement).toBeDisabled();
  });

  test("should be invalid (password 1 invalid)", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText("password");

    expect(inputElement.classList[1]).toBe(undefined);

    userEvent.type(inputElement, "12345");

    expect(inputElement.classList[1]).toBe("InValid");
    expect(buttonElement).toBeDisabled();
  });

  test("should be invalid (password 2 invalid)", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText("password-Confirmation");

    expect(inputElement.classList[1]).toBe(undefined);

    userEvent.type(inputElement, "12345");

    expect(inputElement.classList[1]).toBe("InValid");
    expect(buttonElement).toBeDisabled();
  });

  test("should be valid (name valid)", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText("name");

    userEvent.type(inputElement, "avi");

    expect(inputElement.classList[1]).toBe(undefined);
    expect(buttonElement).toBeDisabled();
  });

  test("should be valid (username valid)", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText("username");

    userEvent.type(inputElement, "avi123");
    expect(inputElement.classList[1]).toBe(undefined);
    expect(buttonElement).toBeDisabled();
  });

  test("should be valid (email valid)", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText("email");

    userEvent.type(inputElement, "email@email.com");

    expect(inputElement.classList[1]).toBe(undefined);
    expect(buttonElement).toBeDisabled();
  });

  test("should be valid (password 1 valid)", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText("password");

    userEvent.type(inputElement, "123456");

    expect(inputElement.classList[1]).toBe(undefined);
    expect(buttonElement).toBeDisabled();
  });

  test("should be valid (password 2 valid)", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByPlaceholderText("password-Confirmation");

    userEvent.type(inputElement, "123456");

    expect(inputElement.classList[1]).toBe(undefined);
    expect(buttonElement).toBeDisabled();
  });

  test("should be valid if all valid", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputs = screen.getAllByRole("textbox");

    userEvent.type(inputs[0], "avi");
    userEvent.type(inputs[1], "avi123");
    userEvent.type(inputs[2], "email@email.com");
    userEvent.type(inputs[3], "123456");
    userEvent.type(inputs[4], "123456");
    userEvent.type(inputs[5], "2004-01-01");

    expect(buttonElement).not.toBeDisabled();
  });
});

describe("SignupForm Submit Handle Test", () => {
  let spiedRouter: jest.SpyInstance<any, any>;

  beforeAll(() => {
    spiedRouter = jest.spyOn(Router, "push");
  });

  test("should display error message if passwords do not match ", async () => {
    render(
      <Provider store={store}>
        <ErrorContainer />
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputs = screen.getAllByRole("textbox");

    userEvent.type(inputs[0], "avi");
    userEvent.type(inputs[1], "avi123");
    userEvent.type(inputs[2], "email@email.com");
    userEvent.type(inputs[3], "theyNot");
    userEvent.type(inputs[4], "aMatch");

    fireEvent.change(inputs[5], { target: { value: "2000-05-24" } });

    userEvent.click(buttonElement);

    const titleElement = await screen.findByText("Sign Up Failed");
    const messageElement = await screen.findByText(
      "Password need to be a match"
    );

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  test("should display error message if form submition failed ", async () => {
    render(
      <Provider store={store}>
        <ErrorContainer />
        <SignupForm />
      </Provider>
    );

    const [errorButton, submitButton] = screen.getAllByRole("button");
    userEvent.click(errorButton);
    const inputs = screen.getAllByRole("textbox");

    userEvent.type(inputs[0], "avi");
    userEvent.type(inputs[1], "avi123");
    userEvent.type(inputs[2], "email@email.com");
    userEvent.type(inputs[3], "theyMatch");
    userEvent.type(inputs[4], "theyMatch");

    fireEvent.change(inputs[5], { target: { value: "2000-05-24" } });

    userEvent.click(submitButton);

    const titleElement = await screen.findByText("Sign Up Failed");
    const messageElement = await screen.findByText("error data");

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  test("should desplay success message if form submition succeed ", async () => {
    render(
      <Provider store={store}>
        <MessageContainer />
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");
    const inputs = screen.getAllByRole("textbox");

    userEvent.type(inputs[0], "avi");
    userEvent.type(inputs[1], "avi123");
    userEvent.type(inputs[2], "email@email.com");
    userEvent.type(inputs[3], "theyMatch");
    userEvent.type(inputs[4], "theyMatch");

    fireEvent.change(inputs[5], { target: { value: "2000-05-24" } });

    userEvent.click(buttonElement);

    const titleElement = await screen.findByText("Signed Up!");
    const messageElement = await screen.findByText("avi signed in");

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(spiedRouter.mock.calls[0][0]).toBe("/");
  });
});
