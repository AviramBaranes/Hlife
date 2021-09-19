import store from "../../redux/store/reduxStore";

describe("goals slice tests", () => {
  test("should have the correct initialState", () => {
    const expectedInitialState = {
      basicGoal: "",
      desiredWeight: null,
      desiredFatPercentage: null,
      desiredMusclesMass: null,
    };

    const initialState = store.getState().goalsReducer;

    expect(initialState).toStrictEqual(expectedInitialState);
  });
});
