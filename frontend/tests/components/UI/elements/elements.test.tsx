import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";

import RangeInput from "../../../../components/UI/RangeInput/RangeInput";

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
