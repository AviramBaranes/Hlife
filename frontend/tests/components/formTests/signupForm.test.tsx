import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import store from "../../../redux/store/reduxStore";
import SignupForm from "../../../components/auth/forms/signup-form";
import Router from "next/router";
import axiosInstance from "../../../utils/axios/axiosInstance";

describe("SignupForm Tests", () => {
  let spiedAxios: jest.SpyInstance;
  let spiedRouter: jest.SpyInstance;

  beforeAll(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, "post")
      .mockImplementation(async () => ({ data: "" }));
    spiedRouter = jest.spyOn(Router, "push");
  });

  test("should render the correct dom elements", async () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const nameLabelElement = screen.getByLabelText("Name");
    const emailLabelElement = screen.getByLabelText("Email");
    const passwordLabelElement = screen.getByLabelText("Password");
    const passwordConfirmationLabelElement =
      screen.getByLabelText("Confirm");
    const genderLabelElement = screen.getByLabelText("Gender");
    const dateLabelElement = screen.getByLabelText("Date of birth");
    const formElement = screen.getByRole("form");
    const selectElement = screen.getByRole("listbox");
    const buttonElement = screen.getByRole("button");

    expect(formElement).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(nameLabelElement).toBeInTheDocument();
    expect(emailLabelElement).toBeInTheDocument();
    expect(passwordLabelElement).toBeInTheDocument();
    expect(passwordConfirmationLabelElement).toBeInTheDocument();
    expect(genderLabelElement).toBeInTheDocument();
    expect(dateLabelElement).toBeInTheDocument();
  });

  test("should be invalid (name invalid)", () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    ); 

    const nameLabelElement = screen.getByLabelText("Name");
    const emailLabelElement = screen.getByLabelText("Email");
    const passwordLabelElement = screen.getByLabelText("Password");
    const passwordConfirmationLabelElement =
      screen.getByLabelText("Confirm");
    const dateLabelElement = screen.getByLabelText("Date of birth");
    const btn = screen.getByRole("button");

    expect(nameLabelElement.className).toBe("");
    expect(emailLabelElement.className).toBe("");
    expect(passwordLabelElement.className).toBe("");
    expect(passwordConfirmationLabelElement.className).toBe("");
    expect(dateLabelElement.className).toBe("");

    userEvent.type(nameLabelElement, "av");
    userEvent.type(emailLabelElement, "av");
    userEvent.type(passwordLabelElement, "12");
    userEvent.type(passwordConfirmationLabelElement, "12");
    userEvent.type(dateLabelElement, "1900-01-01");

    expect(nameLabelElement.className).toBe("inValid");
    expect(emailLabelElement.className).toBe("inValid");
    expect(passwordLabelElement.className).toBe("inValid");
    expect(passwordConfirmationLabelElement.className).toBe("inValid");
    expect(dateLabelElement.className).toBe("inValid");
    expect(btn).toBeDisabled();
  });

  test("should be valid (name valid)",async () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );
 
    const nameLabelElement = screen.getByLabelText("Name");
    const emailLabelElement = screen.getByLabelText("Email");
    const passwordLabelElement = screen.getByLabelText("Password");
    const passwordConfirmationLabelElement =
      screen.getByLabelText("Confirm");
    const dateLabelElement = screen.getByLabelText("Date of birth");
    const genderSelect = screen.getByLabelText('Gender')
    const btn = screen.getByRole("button");

    userEvent.type(nameLabelElement, "avi");
    userEvent.type(emailLabelElement, "avi@avi.com");
    userEvent.type(passwordLabelElement, "123123");
    userEvent.type(passwordConfirmationLabelElement, "123123");
    userEvent.type(dateLabelElement, "2001-11-11");
    userEvent.selectOptions(genderSelect, genderSelect.children[1].textContent!);

    expect(nameLabelElement.className).toBe("");
    expect(emailLabelElement.className).toBe("");
    expect(passwordLabelElement.className).toBe("");
    expect(passwordConfirmationLabelElement.className).toBe("");
    expect(dateLabelElement.className).toBe("");
    expect(genderSelect.className).toBe("");
    expect(btn).not.toBeDisabled();
  });

  test('should open error div if button is disabled',()=>{
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");

    userEvent.hover(buttonElement.parentElement as Element)

    expect(buttonElement).toBeDisabled();
    expect(screen.getByText('Some of the fields are invalid')).toBeInTheDocument()
    expect(screen.getByText('Please make sure you follow the following instructions')).toBeInTheDocument()
  })


  test("should display error message if passwords do not match ", async () => {
    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    const nameLabelElement = screen.getByLabelText("Name");
    const emailLabelElement = screen.getByLabelText("Email");
    const passwordLabelElement = screen.getByLabelText("Password");
    const passwordConfirmationLabelElement =
      screen.getByLabelText("Confirm");
    const dateLabelElement = screen.getByLabelText("Date of birth");
    const genderSelect = screen.getByLabelText('Gender')
    const btn = screen.getByRole("button");

    userEvent.type(nameLabelElement, "avi");
    userEvent.type(emailLabelElement, "avi@avi.com");
    userEvent.type(passwordLabelElement, "123123");
    userEvent.type(passwordConfirmationLabelElement, "1231234");
    userEvent.type(dateLabelElement, "2001-11-11");
    userEvent.selectOptions(genderSelect, "male");

    //passwords do not match
    userEvent.click(btn);
    expect(spiedAxios.mock.calls.length).toEqual(0);

    userEvent.clear(passwordConfirmationLabelElement);
    userEvent.type(passwordConfirmationLabelElement, "123123");
    //passwords match
    userEvent.click(btn);

    await waitFor(() => {
      expect(spiedAxios.mock.calls[0][0]).toEqual("/auth/signup");
      expect(spiedAxios.mock.calls[0][1]).toStrictEqual({
        name: "avi",
        email: "avi@avi.com",
        password: "123123",
        passwordConfirmation: "123123",
        dateOfBirth: "2001-11-11",
        gender: "male",
      });
      expect(spiedRouter.mock.calls[0][0]).toEqual(
        "/auth/registration/set-goals"
      );
    });
  });
});
