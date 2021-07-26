import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";

import { Button, Card, Input } from "./exports/index";

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

describe("Card tests", () => {
  test("should render the card component correctly", () => {
    const { container } = render(
      <Card>
        <h1>title</h1>
        <p>content</p>
      </Card>
    );

    const cardFirstChild = screen.getByText("title");
    const cardSecondChild = screen.getByText("content");

    expect(cardFirstChild).toBeInTheDocument();
    expect(cardSecondChild).toBeInTheDocument();
    expect(container.children[0].className).toBe("Card");
  });
});

describe("Card tests", () => {
  test("should render the Input component as valid (if didn't touched & invalid false)", () => {
    const props = {
      touched: false,
      inValid: false,
      label: "content",
      htmlFor: "fake-htmlFor",
    } as any;
    const { container } = render(<Input {...props} />);

    const inputElement = screen.getByRole("textbox");
    const labelElement = screen.getByLabelText("content");

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(container.children[0].className).toBe("Label");
    expect(container.children[1].className).toBe("Input");
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
    const labelElement = screen.getByLabelText("content");

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(container.children[0].className).toBe("Label");
    expect(container.children[1].className).toBe("Input");
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
    const labelElement = screen.getByLabelText("content");

    expect(inputElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(container.children[0].className).toBe("Label");
    expect(container.children[1].className).toBe("Input InValid");
  });
});
