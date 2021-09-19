import store from "../../redux/store/reduxStore";

describe("stats slice tests", () => {
  test("should have the correct initialState", () => {
    const expectedInitialState = {
      rank: "Beginner",
      weight: 0,
      height: 0,
      fatPercentage: 0,
      musclesMass: 0,
      photo: null,
    };

    const initialState = store.getState().statsReducer;

    expect(initialState).toStrictEqual(expectedInitialState);
  });
});
