import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(diagnoseService.getAll());
});

router.get("/:code", (req, res) => {
  const code = req.params.code;
  const diagnosis = diagnoseService.getByCode(code);
  if (diagnosis) {
    return res.json(diagnosis);
  } else {
    return res.status(404).json({ error: "no diagnosis found" });
  }
});
export default router;
