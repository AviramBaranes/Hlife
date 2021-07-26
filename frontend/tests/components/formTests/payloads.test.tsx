import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import LoginForm from "../../../components/auth/forms/login-form";

import { getDefaultMiddleware } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";
import ForgotPasswordForm from "../../../components/auth/forms/forgotPassword-form";
import SignupForm from "../../../components/auth/forms/signup-form";

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

jest.mock("../../../utils/axios/axiosInstance");

describe("test payload", () => {
  test("should call axios with the right payload (forgot-password) ", async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    );

    const inputElement = screen.getByPlaceholderText("email");
    const buttonElement = screen.getByRole("button");

    userEvent.type(inputElement, "email@email.com");
    userEvent.click(buttonElement);

    const expectedParamsFromAxios = {
      url: "/auth/password/send-token",
      payload: { email: "email@email.com" },
    };

    await waitFor(() => {
      expect(
        (window as any).axiosPayloadTests.sendEmailSubmitPayload
      ).toStrictEqual(expectedParamsFromAxios);
    });
  });
  test("should call axios with the right payload (login) ", async () => {
    const store = mockStore({});
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
    userEvent.click(buttonElement);

    const expectedParamsFromAxios = {
      url: "/auth/login",
      payload: { email: "email@email.com", password: "123456" },
    };

    await waitFor(() => {
      expect(
        (window as any).axiosPayloadTests.loginSubmitPayload
      ).toStrictEqual(expectedParamsFromAxios);
    });
  });
  test("should call axios with the right payload (signup) ", async () => {
    const store = mockStore({});
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
    userEvent.type(inputs[3], "theyMatch");
    userEvent.type(inputs[4], "theyMatch");

    fireEvent.change(inputs[5], { target: { value: "2000-05-24" } });

    userEvent.click(buttonElement);

    const expectedParamsFromAxios = {
      url: "/auth/signup",
      payload: {
        name: "avi",
        username: "avi123",
        email: "email@email.com",
        password: "theyMatch",
        passwordConfirmation: "theyMatch",
        dateOfBirth: "2000-05-24",
        gender: "male",
      },
    };

    await waitFor(() => {
      expect(
        (window as any).axiosPayloadTests.signUpSubmitPayload
      ).toStrictEqual(expectedParamsFromAxios);
    });
  });
});
