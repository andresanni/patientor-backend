import { NewPatient } from "../types";
import { parseString, parseDate, parseGender, parseEntries } from "./parsers";

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
      "occupation" in object &&
      "entries" in object
    )
  ) {
    throw new Error("Some fields are missing");
  }

  const patient = {
    name: parseString(object.name,"name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, "occupation"),
    entries: parseEntries(object.entries),
  };

  return patient;
};







