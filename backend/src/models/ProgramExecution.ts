import mongoose, { Document, ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const ProgramExecutionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  executions: [
    {
      programId: {
        type: Schema.Types.ObjectId,
        ref: 'Program.program',
        required: true,
      },

      date: { type: Date, required: true },

      executionRate: { type: Number, required: true, min: 0, max: 100 },

      grade: { type: Number, required: true, default: 0, min: 0, max: 10 },
    },
  ],
});

const ProgramExecution = mongoose.model(
  'ProgramExecution',
  ProgramExecutionSchema
);
export default ProgramExecution;

interface Execution {
  programId: ObjectId;
  date: Date;
  executionRate: number;
  grade: number;
}

export interface ProgramExecType extends Document {
  user: ObjectId;
  executions: Execution[];
}
