import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProgramExecutionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },

  executions: [
    {
      program: { type: Schema.Types.ObjectId, ref: "Program.program" },

      date: { type: Date, required: true },

      executionRate: { type: Number, required: true, min: 0, max: 100 },

      grade: { type: Number, required: true, default: 0, min: 0, max: 10 },
    },
  ],
});

const ProgramExecution = mongoose.model(
  "ProgramExecution",
  ProgramExecutionSchema
);
export default ProgramExecution;
