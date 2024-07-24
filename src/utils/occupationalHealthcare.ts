import { OccupationalHealthCareEntry } from "../types";
import { parseString, parseDate,parseDiagnosisCodes } from "./parsers";

export const toValidOccupationalHealthCare = (
  object: unknown
): Omit<OccupationalHealthCareEntry, "id"> => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data " + object);
  }

  if (
    !(
      "description" in object &&
      "date" in object &&
      "specialist" in object &&
      "type" in object &&
      "employerName" in object
    )
  ) {
    throw new Error("Some fields are missing");
  }

  const newEntry = {
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
    type: "OccupationalHealthcare" as const,
    employerName: parseString(object.employerName, "employer name"),
  };
  
  if("diagnosisCodes" in object ){
    const newEntryWithDiagnosisCodes = {...newEntry,
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };
    return newEntryWithDiagnosisCodes;
  }

  return newEntry;
};
