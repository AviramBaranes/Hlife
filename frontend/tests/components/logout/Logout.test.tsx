import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import store from "../../../redux/store";
import Logout from "../../../components/auth/logout/Logout";
import ErrorContainer from "../../../components/UI/containers/Errors/ErrorContainer";

jest.mock("../../../redux/slices/auth");
jest.unmock("react-redux");

describe("Logout", () => {
  test("should render the dom correctly (tags roles)", () => {
    const { container } = render(
      <Provider store={store}>
        <Logout setShowModal={() => {}} />
      </Provider>
    );

    const parentDiv = container.children[0];

    const h1TagElement = parentDiv.children[0];
    const pTagElement = parentDiv.children[1];
    const buttonsContainer = parentDiv.children[2];
    const logoutButton = buttonsContainer.children[0];
    const cancelButton = buttonsContainer.children[1];

    expect(h1TagElement.tagName).toBe("H1");
    expect(pTagElement.tagName).toBe("P");
    expect(buttonsContainer.tagName).toBe("DIV");
    expect(logoutButton.tagName).toBe("BUTTON");
    expect(cancelButton.tagName).toBe("BUTTON");
  });

  test("should render the dom correctly (inner text)", () => {
    const { container } = render(
      <Provider store={store}>
        <Logout setShowModal={() => {}} />
      </Provider>
    );

    const parentDiv = container.children[0];

    const h1TagElement = parentDiv.children[0];
    const pTagElement = parentDiv.children[1];
    const buttonsContainer = parentDiv.children[2];
    const logoutButton = buttonsContainer.children[0];
    const cancelButton = buttonsContainer.children[1];

    expect(h1TagElement.textContent).toBe("Log Out");
    expect(pTagElement.textContent).toBe("Are you sure you want to logout?");
    expect(buttonsContainer.children.length).toBe(2);
    expect(logoutButton.textContent).toBe("Logout");
    expect(cancelButton.textContent).toBe("Cancel");
  });

  test("should handle correctly the cancel button", () => {
    const mockedSetShowModal = jest.fn(() => {});

    render(
      <Provider store={store}>
        <Logout setShowModal={mockedSetShowModal} />
      </Provider>
    );

    const CancelButton = screen.getAllByRole("button")[1];

    userEvent.click(CancelButton);

    expect(mockedSetShowModal.mock.calls.length).toBe(1);
    expect((mockedSetShowModal.mock.calls[0] as any)[0]).toBe(false);
  });

  test("should handle correctly the logout button (logout failed)", async () => {
    render(
      <Provider store={store}>
        <ErrorContainer />
        <Logout setShowModal={() => {}} />
      </Provider>
    );

    const logoutButton = screen.getAllByRole("button")[0];

    userEvent.click(logoutButton);

    const titleElement = await screen.findByText("Logout failed");
    const messageElement = await screen.findByText("error data");

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  test("should handle correctly the logout button (logout success)", async () => {
    const cb = (bool: boolean) => {
      expect(mockedSetShowModal.mock.calls.length).toBe(1);
      expect(mockedSetShowModal.mock.calls[0][0]).toBe(false);
      expect(bool).toBe(false);
    };

    const mockedSetShowModal = jest.fn((bool) => {
      cb(bool);
    });

    mockedSetShowModal(false);

    render(
      <Provider store={store}>
        <Logout setShowModal={mockedSetShowModal} />
      </Provider>
    );

    const LogoutButton = screen.getAllByRole("button")[0];

    userEvent.click(LogoutButton);
  });
});
