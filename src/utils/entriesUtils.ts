import { toValidHealthCheckEntry } from "./healthCheckEntryUtils";
import { toValidHospital } from "./hospitalEntryUtils";
import { toValidOccupationalHealthCare } from "./occupationalHealthcare";
import {  EntryWithoutId } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toValidEntry = (object: unknown): EntryWithoutId => {
  
  if(typeof object != "object" || !object || !("type" in object)){
    throw new Error("No valid Entry type");
  }

  switch(object.type){
    case "HealthCheck": return toValidHealthCheckEntry(object);
    case "OccupationalHealthcare": return toValidOccupationalHealthCare(object);
    case "Hospital": return toValidHospital(object);
    default: assertNever(object as never);
  }

  throw new Error("Unhandled entry type");
};
