import "@testing-library/jest-dom";

import scheduleProgram, {
  getServerSideProps,
} from "../../../../pages/auth/registration/schedule-program";

describe("schedule program get server side props tests", () => {
  test("should redirect", async () => {});

  test.todo("should request all workouts and return them with redirect true");

  test.todo("should request all workouts and return them with redirect false");
});

describe("schedule program page tests", () => {
  test.todo("should render 'RecommendedOrder' if order is truthy");

  test.todo("'RecommendedOrder' DOM and submission");

  test.todo("'CustomOrder' DOM and submission");
});
