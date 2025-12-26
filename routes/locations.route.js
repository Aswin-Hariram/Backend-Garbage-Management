import express from "express";
import {
  listLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locations.controller.js";
import { validateCreateLocation, validateUpdateLocation } from "../validators/locations.validators.js";

const router = express.Router();

router.get("/", listLocations);
router.get("/:id", getLocation);
router.post("/", validateCreateLocation, createLocation);
router.put("/:id", validateUpdateLocation, updateLocation);
router.delete("/:id", deleteLocation);

export default router;
