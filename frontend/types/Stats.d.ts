interface DetailGoalType {
  weight: number;
  fatPercentage: number | undefined;
  musclesMass: number | undefined;
}

export interface GoalsType {
  basicGoal: 'lose fat' | 'increase muscles mass';
  detailGoals: DetailGoalType;
}

interface StatsObjType {
  date: Date;
  weight: number;
  deservedGrade: number;
  height: number | undefined;
  fatPercentage: number | undefined;
  musclesMass: number | undefined;
  bodyImageUrl: string | undefined;
}

export interface PhysicalStatsType {
  name: string;
  age: number;
  rank: 'string';
  stats: StatsObjType[];
}
