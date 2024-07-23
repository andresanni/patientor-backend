import { OccupationalHealthCareEntry } from "../types";
import { parseString, parseDate } from "./parsers";

export const toValidOccupationalHealthCare = (object:unknown): OccupationalHealthCareEntry => {
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
          "employerName" in object
        )
      ) {
        throw new Error("Some fields are missing");
      }

      const newEntry = {
        id: parseString(object.id, "id"),
        description: parseString(object.description, "description"),
        date: parseDate(object.date),
        specialist: parseString(object.specialist, "specialist"),
        type: "OccupationalHealthcare" as const,
        employerName: parseString(object.employerName, "employer name")
      };

      return newEntry;
};