import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils/patientsUtils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAll());
});

router.post("/", (req, res)=>{
  try{
    const patient = toNewPatient(req.body);
    const newPatient = patientService.addPatient(patient);
    res.json(newPatient);
  } 
  catch(error: unknown){
    if(error instanceof Error){
      res.json({error: error.message});
    }
  }
});

export default router;
