import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import * as protectedRouteHandler from "../../../utils/protectedRoutes/protectedRoutes";
import Signup, {
  getServerSideProps,
} from "../../../pages/auth/registration/signup";
import { Provider } from "react-redux";
import store from "../../../redux/store/reduxStore";

describe("signup get server side props test", () => {
  beforeAll(() => {
    jest
      .spyOn(protectedRouteHandler, "default")
      .mockImplementationOnce(async () => "wrong destination")
      .mockImplementation(async () => "/auth/login");
  });

  test("should handle redirect", async () => {
    const { redirect } = (await getServerSideProps({} as any)) as any;

    expect(redirect.destination).toBe("wrong destination");
  });

  test("should return recommendation in props", async () => {
    const result = (await getServerSideProps({} as any)) as any;

    expect(result.props).toStrictEqual({});
  });
});

describe("signup page tests", () => {
  test("should render the dom correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );

    const inputs = screen.getAllByRole("textbox");
    const h1Title = screen.getByText("Welcome");
    const h5Title = screen.getByText("Start changing your life today!");
    const h2Title = screen.getByText("Create User");
    const formElement = container.children[1].children[0].children[1];
    const svgElement =
      container.children[1].children[0].children[0].children[1];
    const pElement = screen.getByText("Already have an account?", {
      exact: false,
    });

    expect(inputs.length).toEqual(5);
    expect(h1Title.tagName).toEqual("H1");
    expect(h5Title.tagName).toEqual("H5");
    expect(h2Title.tagName).toEqual("H2");
    expect(formElement.tagName).toEqual("FORM");
    expect(svgElement.tagName).toEqual("svg");
    expect(pElement.tagName).toEqual("P");
  });
});
