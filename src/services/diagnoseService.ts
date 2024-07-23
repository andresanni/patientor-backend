import { Diagnosis } from "../types";
import data from "../../data/diagnoses";

const getAll = (): Diagnosis[] => {
  return data;
};

const getByCode = (code: string): Diagnosis | undefined => {
  return data.find((diagnosis) => diagnosis.code === code);
};
export default { getAll, getByCode };
