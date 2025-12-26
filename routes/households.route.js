import express from "express";
import {
  listHouseholds,
  getHousehold,
  createHousehold,
  updateHousehold,
  deleteHousehold,
} from "../controllers/households.controller.js";
import { validateHousehold } from "../validators/households.validators.js";

const router = express.Router();

router.get("/", listHouseholds);
router.get("/:id", getHousehold);
router.post("/", validateHousehold, createHousehold);
router.put("/:id", updateHousehold);
router.delete("/:id", deleteHousehold);

export default router;
