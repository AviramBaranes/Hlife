import { createSlice } from "@reduxjs/toolkit";

interface StatsSliceState {
  rank: "Beginner" | "Intermediate" | "Advanced" | "Pro";
  weight: number;
  height: number;
  fatPercentage: number;
  musclesMass: number;
}

const initialState: StatsSliceState = {
  rank: "Beginner",
  weight: 0,
  height: 0,
  fatPercentage: 0,
  musclesMass: 0,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    addRequiredFields(state, { payload }) {
      state.rank = payload.rank;
      state.weight = payload.weight;
      state.height = payload.height;
    },
    addFatPercentageField(state, { payload }) {
      state.fatPercentage = payload.fatPercentage;
    },
    addMusclesMassField(state, { payload }) {
      state.musclesMass = payload.musclesMass;
    },
  },
});

export default statsSlice.reducer;

export const statsActions = statsSlice.actions;
