import { Gender, NewPatient } from "../types";

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !(
      "name" in object &&
      "dateOfBirth" in object &&
      "ssn" in object &&
      "gender" in object &&
      "occupation" in object
    )
  ) {
    console.log(object);
    throw new Error("Some fields are missing");

  }

  const patient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };

  return patient;
};

//parsers
const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name " + name);
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn " + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation " + occupation);
  }
  return occupation;
};

//predicates
const isString = (argument: unknown): argument is string => {
  return typeof argument === "string" || argument instanceof String;
};

const isDate = (argument: string): boolean => {
  return Boolean(Date.parse(argument));
};

const isGender = (argument: string): argument is Gender => {
  return Object.values(Gender)
    .map((value) => value.toString())
    .includes(argument);
};
