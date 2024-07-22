import { Gender, HealthCheckRating } from "../types";

export const isString = (argument: unknown): argument is string => {
  return typeof argument === "string" || argument instanceof String;
};

export const isDate = (argument: string): boolean => {
  return Boolean(Date.parse(argument));
};

export const isGender = (argument: string): argument is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(argument);
};

export const isHealthCheckRating = (arg: number): arg is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(arg);
  };