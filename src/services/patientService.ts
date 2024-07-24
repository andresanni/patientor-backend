import { NewPatient, Patient, PatientWithoutSsn, Entry } from "../types";
import { v4 as uuid } from "uuid";
import data from "../../data/patients";
import { toValidEntry } from "../utils/entriesUtils";

const getAll = (): PatientWithoutSsn[] => {
  return data.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient: Patient = {
    ...patient,
    id,
  };

  data.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: unknown): Entry => {
  const patient = getById(patientId);
  const entryWithoutId = toValidEntry(entry);

  if (!patient) {
    throw new Error("Not valid patient id");
  }

  const id = uuid();
  const newEntry = {
    ...entryWithoutId,
    id,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

const getById = (id: string): Patient | undefined => {
  const patient = data.find((patient) => patient.id === id);
  return patient;
};

export default { getAll, addPatient, getById, addEntry };
