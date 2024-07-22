import {
  HealthCheckEntry,
  OccupationalHealthCareEntry,
  Entry,
  HospitalEntry,
} from "../types";
import {
  parseDate,
  parseString,
  parseType,
  parseHealthCheckRating,
} from "./parsers";

export const toValidEntry = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data " + object);
  }

  if (
    !(
      "description" in object &&
      "date" in object &&
      "specialist" in object &&
      "type" in object &&
      "id" in object
    )
  ) {
    throw new Error("Some fields are missing");
  }

  const newEntry = {
    id: parseString(object.id, "id"),
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
    type: parseType(object.type) as
      | "HealthCheck"
      | "OccupationalHealthcare"
      | "Hospital",
  };

  if (newEntry.type === "HealthCheck") {
    if (!("healthCheckRating" in object)) {
      throw new Error("Some fields are missing");
    }
    const newHealthEntry: HealthCheckEntry = {
      ...newEntry,
      type: "HealthCheck",
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
    return newHealthEntry;
  }

  if (newEntry.type === "OccupationalHealthcare") {
    if (!("employerName" in object)) {
      throw new Error("Some fields are missing");
    }

    const newOccupationalEntry: OccupationalHealthCareEntry = {
      ...newEntry,
      type: "OccupationalHealthcare",
      employerName: parseString(object.employerName, "employer name"),
    };
    return newOccupationalEntry;
  }

  if (newEntry.type === "Hospital") {
    if (
      !("discharge" in object) ||
      typeof object.discharge !== "object" ||
      !object.discharge ||
      !("criteria" in object.discharge) ||
      !("date" in object.discharge)
    ) {
      throw new Error("Some fields are missing");
    }

    const newHospitalEntry: HospitalEntry = {
      ...newEntry,
      type: "Hospital",
      discharge: {
        criteria: parseString(object.discharge.criteria, "criteria"),
        date: parseDate(object.discharge.date),
      },
    };
    return newHospitalEntry;
  }

  throw new Error("Invalid Entry " + JSON.stringify(object));
};
