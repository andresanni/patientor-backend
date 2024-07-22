import { NewPatient, Patient, PatientWithoutSsn } from "../types";
import {v4 as uuid} from 'uuid';
import data from "../../data/patients";

const getAll = (): PatientWithoutSsn[] => {
  return data.map(({ ssn: _ssn, ...rest } )=>  rest );
};

const addPatient = (patient : NewPatient) : Patient => {
       
    const id = uuid();    
    const newPatient: Patient = {
      ...patient,
      id
    };

    data.push(newPatient);
  return newPatient;
};

const getById = (id:string) : Patient | undefined => {
  const patient = data.find(patient=> patient.id===id);
  return patient;
};

export default { getAll , addPatient, getById};
