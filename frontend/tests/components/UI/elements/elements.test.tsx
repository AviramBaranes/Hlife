import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";

import { Button, Input, RangeInput } from "./exports/index";

describe("Button tests", () => {
  test("should render the custom button correctly", () => {
    const props = {
      disabled: true,
    } as any;

    render(<Button {...props}>click me</Button>);

    const button = screen.getByText("click me");

    expect(button.className).toBe("Button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});

describe("Normal Input tests", () => {
  test("should render the Input component as valid (if didn't touched & invalid false)", () => {
    const props = {
      touched: false,
      inValid: false,
      label: "content",
      htmlFor: "fake-htmlFor",
    } as any;
    const { container } = render(<Input {...props} />);

    const inputElement = screen.getByRole("textbox");
    const labelElement = screen.getByLabelText("content:");

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(container.children[0].children[0].className).toBe("Label");
    expect(container.children[0].children[1].className).toBe("Input");
  });

  test("should render the Input component as valid (if touched & invalid is false)", () => {
    const props = {
      touched: true,
      inValid: false,
      label: "content",
      htmlFor: "fake-htmlFor",
    } as any;
    const { container } = render(<Input {...props} />);

    const inputElement = screen.getByRole("textbox");
    const labelElement = screen.getByLabelText("content:");

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(container.children[0].children[0].className).toBe("Label");
    expect(container.children[0].children[1].className).toBe("Input");
  });
  test("should render the Input component as in-valid", () => {
    const props = {
      touched: true,
      inValid: true,
      label: "content",
      htmlFor: "fake-htmlFor",
    } as any;
    const { container } = render(<Input {...props} />);

    const inputElement = screen.getByRole("textbox");
    const labelElement = screen.getByLabelText("content:");

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(container.children[0].children[0].className).toBe("Label");
    expect(container.children[0].children[1].className).toBe("Input InValid");
  });
});

describe("Range Input tests", () => {
  test("should render the Input component as valid (if didn't touched & invalid false)", () => {
    const props = {
      min: "10",
      max: "100",
      step: "20",
      value: "50",
      testId: "12345",
      onChange: () => {},
    } as any;

    render(<RangeInput {...props} />);

    const inputElement = screen.getByTestId("12345");
    const minText = screen.getByText("10");
    const maxText = screen.getByText("100");

    expect(inputElement).toBeInTheDocument();
    expect(minText).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });
});
