interface Exercises {
  muscles: string[] | undefined;
  name: string;
  description: string | undefined;
  sets: number;
  reps: number;
}

export interface WorkoutType {
  user: string;
  trainingDayName: 'A' | 'B' | 'C' | 'D' | 'FB' | 'aerobic';
  name: string;
  description: string | undefined;
  exercises: Exercises[];
  time: number;
}

export interface ProgramObj {
  _id: string;
  day:
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';
  restDay: boolean | undefined;
  workout: WorkoutType | undefined;
}
