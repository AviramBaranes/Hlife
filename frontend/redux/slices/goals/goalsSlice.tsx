import { createSlice } from "@reduxjs/toolkit";

export interface GoalsStateSlice {
  basicGoal: string;
  desiredWeight: null | number;
  desiredFatPercentage: null | number;
  desiredMusclesMass: null | number;
}

const initialState: GoalsStateSlice = {
  basicGoal: "",
  desiredWeight: null,
  desiredFatPercentage: null,
  desiredMusclesMass: null,
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addRequiredFields(state, { payload }) {
      state.basicGoal = payload.basicGoal;
      state.desiredWeight = payload.desiredWeight;
    },
    addFatPercentageField(state, { payload }) {
      state.desiredFatPercentage = payload.desiredFatPercentage;
    },
    addMusclesMassField(state, { payload }) {
      state.desiredMusclesMass = payload.desiredMusclesMass;
    },
  },
});

export default goalsSlice.reducer;

export const goalsActions = goalsSlice.actions;
