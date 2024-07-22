import express from "express";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils/patientsUtils";

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
