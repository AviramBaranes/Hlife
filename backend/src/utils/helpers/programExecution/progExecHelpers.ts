import ProgramExecution from "../../../models/ProgramExecution";

export const getExecutionsOfWeek = async (
  date: Date,
  userId: string
): Promise<any[]> => {
  let executionsOfWeek = <any>[];
  const dates = getWeekDates(date);

  const programExecutions = await ProgramExecution.findOne({ user: userId });
  const noExecutions = programExecutions.executions.length === 0;

  if (noExecutions) return [];

  programExecutions.executions.forEach((execution: { date: Date }) => {
    if (dates.includes(execution.date.toISOString())) {
      executionsOfWeek.push(execution);
    }
  });

  return executionsOfWeek;
};

export const getExecutionsOfMonth = async (
  date: Date,
  userId: string
): Promise<any[]> => {
  let executionsOfMonth = <any>[];
  const dates = getMonthDates(date);

  const programExecutions = await ProgramExecution.findOne({ user: userId });
  const noExecutions = programExecutions.executions.length === 0;

  if (noExecutions) return [];

  programExecutions.executions.forEach((execution: { date: Date }) => {
    if (dates.includes(execution.date.toISOString())) {
      executionsOfMonth.push(execution);
    }
  });

  return executionsOfMonth;
};

export const getExecutionsOfYear = async (
  date: Date,
  userId: string
): Promise<any[]> => {
  let executionsOfYear = <any>[];
  const dates = getYearDates(date);

  const programExecutions = await ProgramExecution.findOne({ user: userId });
  const noExecutions = programExecutions.executions.length === 0;

  if (noExecutions) return [];

  programExecutions.executions.forEach((execution: { date: Date }) => {
    if (dates.includes(execution.date.toISOString())) {
      executionsOfYear.push(execution);
    }
  });

  return executionsOfYear;
};

export const getAllExecutions = async (userId: string): Promise<any[]> => {
  const programExecutions = await ProgramExecution.findOne({ user: userId });
  const noExecutions = programExecutions.executions.length === 0;

  if (noExecutions) return [];

  return programExecutions.executions;
};

function getWeekDates(date: Date) {
  const sunday = new Date(date.setDate(date.getDate() - date.getDay()));
  const result = [new Date(sunday).toISOString()];

  while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
    result.push(new Date(sunday).toISOString());
  }
  return result;
}

function getMonthDates(date: Date) {
  date.setDate(1);
  const currentMonth = date.getMonth();
  const result = [date.toISOString()];

  while (
    date.setDate(date.getDate() + 1) &&
    new Date(date).getMonth() === currentMonth
  ) {
    result.push(date.toISOString());
  }
  return result;
}

function getYearDates(date: Date) {
  const year = date.getFullYear();
  date.setMonth(0);
  date.setDate(1);

  const result = [date.toISOString()];

  while (date.setDate(date.getDate() + 1) && date.getFullYear() === year) {
    result.push(date.toISOString());
  }
  return result;
}
