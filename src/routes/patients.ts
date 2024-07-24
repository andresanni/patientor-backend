import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils/patientsUtils";
import { EntryWithoutId } from "../types";
import { toValidEntry } from "../utils/entriesUtils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAll());
});

router.get("/:id", (req, res)=>{
  const id = req.params.id;
  const patient = patientService.getById(id);
  
  if(patient){
    return res.json(patient);
  }
  else{
    return res.status(400).json({error: "No patient with id " + id});
  }

});

router.post("/:id/entries",(req, res)=>{
  
  const patientId = req.params.id;

  const bodyObject = req.body as unknown;
  try{
    const entry : EntryWithoutId = toValidEntry(bodyObject);
    const entries = patientService.addEntry(patientId, entry);
    return res.status(201).json(entries);
  }
  catch(error){
    return res.status(400).json((error as Error).message); 
  }  

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
