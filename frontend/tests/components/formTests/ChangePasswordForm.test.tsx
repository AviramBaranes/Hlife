import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";

import ChangePassword from "../../../components/auth/forms/changePassword";
import axiosInstance from "../../../utils/axios/axiosInstance";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store/reduxStore";

describe("testing change password via settings", () => {
  let spiedAxios: jest.SpyInstance;

  beforeAll(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, "post")
      .mockImplementation(async () => null);
  });

  test("should handle invalid inputs", () => {
    render(
      <Provider store={store}>
        <ChangePassword />
      </Provider>
    );

    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByText("continue");

    userEvent.type(inputs[0], "newPassword");
    userEvent.type(inputs[1], "newPassword");
    userEvent.type(inputs[2], "newPassword");

    // currentPassword need to be different from newPassword
    expect(button).toBeDisabled();

    userEvent.clear(inputs[1]);
    userEvent.type(inputs[1], "different");

    // newPassword and passwordConfirmation need to be the same
    expect(button).toBeDisabled();

    userEvent.clear(inputs[2]);
    userEvent.type(inputs[2], "different");

    expect(button).not.toBeDisabled();
  });

  test('should open error div if button is disabled',()=>{
    render(
      <Provider store={store}>
        <ChangePassword />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");

    userEvent.hover(buttonElement.parentElement as Element)

    expect(buttonElement).toBeDisabled();
    expect(screen.getByText('Some of the fields you entered are invalid')).toBeInTheDocument()
    expect(screen.getByText('Please make sure you follow the following instructions:')).toBeInTheDocument()
  })


  test("should change the password by connecting to the server", () => {
    render(
      <Provider store={store}>
        <ChangePassword />
      </Provider>
    );

    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByText("continue");

    userEvent.type(inputs[0], "oldPassword");
    userEvent.type(inputs[1], "newPassword");
    userEvent.type(inputs[2], "newPassword");
    userEvent.click(button);

    const expectedRequestBody = {
      currentPassword: "oldPassword",
      newPassword: "newPassword",
      newPasswordConfirmation: "newPassword",
    };

    expect(spiedAxios.mock.calls[0][0]).toBe("/auth/settings/password-reset");
    expect(spiedAxios.mock.calls[0][1]).toStrictEqual(expectedRequestBody);
  });
});
