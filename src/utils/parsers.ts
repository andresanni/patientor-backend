import { isString, isDate, isGender, isHealthCheckRating } from "./validators";
import { Gender, Entry, HealthCheckRating } from "../types";
import { toValidEntry } from "./entriesUtils";

export const parseString = (arg: unknown, fieldname: string): string => {
  if (!isString(arg)) {
    throw new Error("Incorrect or missing name " + fieldname);
  }
  return arg;
};

export const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date " + date);
  }
  return date;
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender " + gender);
  }
  return gender;
};

export const parseEntries = (entries: unknown): Array<Entry> => {
  if (!Array.isArray(entries)) {
    throw new Error("Incorrect or missing entries " + entries);
  }
  return entries.map((entry) => toValidEntry(entry));
};

export const parseType = (arg: unknown): string => {
    if (
      !isString(arg) ||
      !["HealthCheck", "OccupationalHealthcare", "Hospital"].includes(arg)
    ) {
      throw new Error("Incorrect or missing entry type" + arg);
    }
    return arg;
  };
  
export  const parseHealthCheckRating = (arg: unknown): HealthCheckRating => {
    if (typeof arg !== "number" || !isHealthCheckRating(arg)) {
      throw new Error("Incorrect or missing Health Check Rating" + arg);
    }
    return arg;
  };
  