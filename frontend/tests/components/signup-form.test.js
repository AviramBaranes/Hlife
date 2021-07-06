import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import store from "../../Redux/store";
import SignupForm from "../../components/auth/forms/signup-form";
import ErrorContainer from "../../components/UI/ErrorContainer/ErrorContainer";
import MessageContainer from "../../components/UI/MessageContainer/MessageContainer";

jest.mock("../../Redux/Slices/auth");
jest.mock("next/router");

describe("SignupForm", () => {
  test("should render the correct dom elements", async () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const formElement = screen.getByRole("form");
    const nameLabelElement = screen.getByLabelText("Name");
    const usernameLabelElement = screen.getByLabelText("Username");
    const emailLabelElement = screen.getByLabelText("Email");
    const passwordLabelElement = screen.getByLabelText("Password");
    const passwordConfirmationLabelElement = screen.getByLabelText(
      "Password Confirmation"
    );
    const genderLabelElement = screen.getByLabelText("Gender");
    const dateLabelElement = screen.getByLabelText("Date Of Birth");
    const inputList = screen.getAllByRole("textbox");
    // const nameInputElement = screen.getByPlaceholderText("name");
    // const usernameInputElement = screen.getByPlaceholderText("username");
    // const emailInputElement = screen.getByPlaceholderText("email");
    // const passwordInputElement = screen.getByPlaceholderText("password");
    // const passwordConfirmationInputElement = screen.getByPlaceholderText(
    //   "passwordConfirmation"
    // );
    // const dateInputElement = screen.getByPlaceholderText("dateOfBirth");
    const buttonElement = screen.getByRole("button");

    expect(formElement).toBeInTheDocument();
    expect(nameLabelElement).toBeInTheDocument();
    expect(usernameLabelElement).toBeInTheDocument();
    expect(emailLabelElement).toBeInTheDocument();
    expect(passwordLabelElement).toBeInTheDocument();
    expect(passwordConfirmationLabelElement).toBeInTheDocument();
    expect(genderLabelElement).toBeInTheDocument();
    expect(dateLabelElement).toBeInTheDocument();
    expect(inputList.length).toBe(6);
    expect(buttonElement).toBeInTheDocument();
  });

  //   test("should add 'invalid' class to input if inputs are invalid and disable the button", () => {
  //     render(
  //       <Provider store={store}>
  //         <SignupForm />
  //       </Provider>
  //     );

  //     const emailInputElement = screen.getByPlaceholderText("email");
  //     const passwordInputElement = screen.getByPlaceholderText("password");
  //     const buttonElement = screen.getByRole("button");

  //     userEvent.type(emailInputElement, "not an email");
  //     userEvent.type(passwordInputElement, "123");

  //     expect(emailInputElement.classList[1]).toEqual("InValid");
  //     expect(passwordInputElement.classList[1]).toEqual("InValid");
  //     expect(buttonElement).toBeDisabled();
  //   });

  //   test("should add 'invalid' class if email is not an email", () => {
  //     render(
  //       <Provider store={store}>
  //         <SignupForm />
  //       </Provider>
  //     );

  //     const emailInputElement = screen.getByPlaceholderText("email");
  //     const passwordInputElement = screen.getByPlaceholderText("password");
  //     const buttonElement = screen.getByRole("button");

  //     userEvent.type(emailInputElement, "not an email");
  //     userEvent.type(passwordInputElement, "123456");

  //     expect(emailInputElement.classList[1]).toEqual("InValid");
  //     expect(passwordInputElement.classList[1]).toEqual(undefined);
  //     expect(buttonElement).toBeDisabled();
  //   });

  //   test("should add 'invalid' class to input if password to short", () => {
  //     render(
  //       <Provider store={store}>
  //         <SignupForm />
  //       </Provider>
  //     );

  //     const emailInputElement = screen.getByPlaceholderText("email");
  //     const passwordInputElement = screen.getByPlaceholderText("password");
  //     const buttonElement = screen.getByRole("button");

  //     userEvent.type(emailInputElement, "email@email.com");
  //     userEvent.type(passwordInputElement, "123");

  //     expect(emailInputElement.classList[1]).toEqual(undefined);
  //     expect(passwordInputElement.classList[1]).toEqual("InValid");
  //     expect(buttonElement).toBeDisabled();
  //   });

  //   test("should behave approprialy if inputs are valid", () => {
  //     render(
  //       <Provider store={store}>
  //         <SignupForm />
  //       </Provider>
  //     );

  //     const emailInputElement = screen.getByPlaceholderText("email");
  //     const passwordInputElement = screen.getByPlaceholderText("password");
  //     const buttonElement = screen.getByRole("button");

  //     userEvent.type(emailInputElement, "email@email.com");
  //     userEvent.type(passwordInputElement, "123456");

  //     expect(emailInputElement.classList[1]).toEqual(undefined);
  //     expect(passwordInputElement.classList[1]).toEqual(undefined);
  //     expect(buttonElement).not.toBeDisabled();
  //   });

  //   test("should desplay error message if form submition failed ", async () => {
  //     render(
  //       <Provider store={store}>
  //         <ErrorContainer />
  //         <SignupForm />
  //       </Provider>
  //     );

  //     const emailInputElement = screen.getByPlaceholderText("email");
  //     const passwordInputElement = screen.getByPlaceholderText("password");
  //     const buttonElement = screen.getByRole("button");

  //     userEvent.type(emailInputElement, "email@email.com");
  //     userEvent.type(passwordInputElement, "123456");
  //     userEvent.click(buttonElement);

  //     const titleElement = await screen.findByText("Login Failed");
  //     const messageElement = await screen.findByText("error data");

  //     expect(titleElement).toBeInTheDocument();
  //     expect(messageElement).toBeInTheDocument();
  //   });

  //   test("should desplay success message if form submition failed ", async () => {
  //     render(
  //       <Provider store={store}>
  //         <MessageContainer />
  //         <SignupForm />
  //       </Provider>
  //     );

  //     const emailInputElement = screen.getByPlaceholderText("email");
  //     const passwordInputElement = screen.getByPlaceholderText("password");
  //     const buttonElement = screen.getByRole("button");

  //     userEvent.type(emailInputElement, "email@email.com");
  //     userEvent.type(passwordInputElement, "123456");
  //     userEvent.click(buttonElement);

  //     const titleElement = await screen.findByText("Logged In!");
  //     const messageElement = await screen.findByText("success message");

  //     expect(titleElement).toBeInTheDocument();
  //     expect(messageElement).toBeInTheDocument();
  //     expect(window.location.routerPushedValue).toBe("/");
  //   });
});
