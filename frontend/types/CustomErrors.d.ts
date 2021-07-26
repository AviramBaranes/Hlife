export interface CustomError extends Error {
  data: string;
  status: number;
}
