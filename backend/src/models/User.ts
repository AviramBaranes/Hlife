import mongoose, { Document, ObjectId } from 'mongoose';
import { WorkoutType } from './Workout';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true, select: false },

  gender: { type: String, enum: ['male', 'female'] },

  dateOfBirth: {
    type: Date,
    min: '01/01/1920',
    max: '01/01/2005',
    required: true,
  },

  grade: { type: Number, required: true, default: 0 },

  hasProgram: { type: Boolean, default: false },

  hasGoals: { type: Boolean, default: false },

  hasInitialStats: { type: Boolean, default: false },

  hasAllWorkouts: { type: Boolean, default: false },

  workouts: [{ type: mongoose.Types.ObjectId, ref: 'Workout' }],

  resetToken: { type: String },

  tokenExpiration: { type: Date },
});

//TODO add goals

const User = mongoose.model('User', UserSchema);
export default User;

export interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  grade: number;
  hasProgram: boolean;
  hasAllWorkouts: boolean;
  hasGoals: boolean;
  hasInitialStats: boolean;
  workouts: ObjectId[] | WorkoutType[] | undefined;
  resetToken: string | undefined;
  tokenExpiration: Date | undefined;
}
