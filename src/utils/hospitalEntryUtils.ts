import { HospitalEntry } from "../types";
import { parseString, parseDate } from "./parsers";

export const toValidHospital = (object: unknown): HospitalEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data " + object);
  }

  if (
    !(
      "description" in object &&
      "date" in object &&
      "specialist" in object &&
      "type" in object &&
      "id" in object &&
      "discharge" in object &&
      typeof object.discharge === "object" &&
      object.discharge &&
      "criteria" in object.discharge &&
      "date" in object.discharge
    )
  ) {
    throw new Error("Some fields are missing");
  }

  const newEntry = {
    id: parseString(object.id, "id"),
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
    type: "Hospital" as const,
    discharge: {
      criteria: parseString(object.discharge.criteria, "criteria"),
      date: parseDate(object.discharge.date),
    },
  };

  return newEntry;
};
