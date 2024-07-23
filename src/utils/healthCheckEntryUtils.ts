import { HealthCheckEntry } from "../types";
import { parseString, parseDate, parseHealthCheckRating } from "./parsers";

export const toValidHealthCheckEntry = (object: unknown): HealthCheckEntry => {
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
      "healthCheckRating" in object
    )
  ) {
    throw new Error("Some fields are missing");
  }

  const newEntry = {
    id: parseString(object.id, "id"),
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
    type: "HealthCheck" as const,
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
  };

  return newEntry;
};
