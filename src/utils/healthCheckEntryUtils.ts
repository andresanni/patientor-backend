import { HealthCheckEntry } from "../types";
import { parseString, parseDate, parseHealthCheckRating, parseDiagnosisCodes} from "./parsers";

export const toValidHealthCheckEntry = (object: unknown): Omit<HealthCheckEntry,"id"> => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data " + object);
  }

  if (
    !(
      "description" in object &&
      "date" in object &&
      "specialist" in object &&
      "type" in object &&
      "healthCheckRating" in object
    )
  ) {
    throw new Error("Some fields are missing");
  }

  const newEntry = {
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
    type: "HealthCheck" as const,
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),    
  };

  if("diagnosisCodes" in object ){
    const newEntryWithDiagnosisCodes = {...newEntry,
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };
    return newEntryWithDiagnosisCodes;
  }

  return newEntry;
};
