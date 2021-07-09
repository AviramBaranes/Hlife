import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import Layout from "../../../components/Layout/Layout";
import ErrorContainer from "../../../components/UI/ErrorContainer/ErrorContainer";

import { Provider } from "react-redux";
import store from "../../../Redux/store";

jest.mock("../../../Redux/Slices/tokens");
jest.mock("../../../components/Layout/Navigation");
jest.mock("react-redux", () => {
  const useSelector = jest.fn();

  useSelector
    .mockReturnValueOnce({ error: "Server Error" })
    .mockReturnValueOnce({ loading: false })
    .mockReturnValueOnce({
      newError: true,
      errorTitle: "Server Error",
      errorMessage: "error message",
    })
    .mockReturnValueOnce({ error: null })
    .mockReturnValueOnce({ loading: true });

  return {
    ...jest.requireActual("react-redux"),
    useSelector,
  };
});

describe("Layout component Error", () => {
  test("should render error container", () => {
    const children = [<ErrorContainer />, <h1>second child</h1>];
    render(
      <Provider store={store}>
        <Layout children={children} />
      </Provider>
    );

    const errorTitle = screen.getByText("Server Error");
    const errorMessage = screen.getByText("error message");

    const secodChild = screen.queryByText("second child");

    expect(errorTitle).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(secodChild).not.toBeInTheDocument();
  });
});
