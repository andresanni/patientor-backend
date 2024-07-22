import {
  HealthCheckEntry,
  OccupationalHealthCareEntry,
  Entry,
  HealthCheckRating,
  HospitalEntry,
} from "../types";

import { parseDate } from "./patientsUtils";

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
    id: parseId(object.id),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
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
      employerName: parseEmployerName(object.employerName),
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
        criteria: parseCriteria(object.discharge.criteria),
        date: parseDate(object.discharge.date),
      },
    };
    return newHospitalEntry;
  }

  throw new Error("Invalid Entry " + JSON.stringify(object));
};

//parsers
const parseId = (id: unknown): string => {
  if (!isString(id)) {
    throw new Error("Incorrect or missing id " + id);
  }
  return id;
};

const parseDescription = (arg: unknown): string => {
  if (!isString(arg)) {
    throw new Error("Incorrect or missing entry description" + arg);
  }
  return arg;
};

const parseSpecialist = (arg: unknown): string => {
  if (!isString(arg)) {
    throw new Error("Incorrect or missing entry specialist" + arg);
  }
  return arg;
};

const parseType = (arg: unknown): string => {
  if (
    !isString(arg) ||
    !["HealthCheck", "OccupationalHealthcare", "Hospital"].includes(arg)
  ) {
    throw new Error("Incorrect or missing entry type" + arg);
  }
  return arg;
};

const parseHealthCheckRating = (arg: unknown): HealthCheckRating => {
  if (typeof arg !== "number" || !isHealthCheckRating(arg)) {
    throw new Error("Incorrect or missing Health Check Rating" + arg);
  }
  return arg;
};

const parseEmployerName = (arg: unknown): string => {
  if (!isString(arg)) {
    throw new Error("Incorrect or missing Employer name" + arg);
  }
  return arg;
};

const parseCriteria = (arg: unknown): string => {
  if (!isString(arg)) {
    throw new Error("Incorrect or missing Criteria" + arg);
  }
  return arg;
};

//type guards
const isString = (arg: unknown): arg is string => {
  return typeof arg === "string" || arg instanceof String;
};

const isHealthCheckRating = (arg: number): arg is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(arg);
};
