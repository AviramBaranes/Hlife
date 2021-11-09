import mongoose, { Document, ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

const GoalsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  basicGoal: {
    type: String,
    enum: ['lose fat', 'increase muscles mass'],
    required: true,
  },

  detailGoals: {
    weight: { type: Number, required: true },

    fatPercentage: { type: Number },

    musclesMass: { type: Number },
  },
});

const Goals = mongoose.model('Goals', GoalsSchema);
export default Goals;

export interface DetailGoalType {
  weight: number;
  fatPercentage: number | undefined;
  musclesMass: number | undefined;
}

export interface GoalsType extends Document {
  user: ObjectId;
  basicGoal: 'lose fat' | 'increase muscles mass';
  detailGoals: DetailGoalType;
}
