import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
  console.log("pinged here");
  res.json("pong");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING AT PORT ${PORT}`);
});
