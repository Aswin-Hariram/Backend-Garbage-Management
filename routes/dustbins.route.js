import express from "express";
import {
  listDustbins,
  getDustbin,
  createDustbin,
  updateDustbin,
  deleteDustbin,
} from "../controllers/dustbins.controller.js";
import { validateDustbin } from "../validators/dustbins.validators.js";

const router = express.Router();

router.get("/", listDustbins);
router.get("/:id", getDustbin);
router.post("/", validateDustbin, createDustbin);
router.put("/:id", updateDustbin);
router.delete("/:id", deleteDustbin);

export default router;
