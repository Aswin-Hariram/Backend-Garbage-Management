import express from "express";
import {
  listHomeCollections,
  getHomeCollection,
  createHomeCollection,
  updateHomeCollection,
  deleteHomeCollection,
} from "../controllers/homeCollections.controller.js";
import { validateHomeCollection } from "../validators/homeCollections.validators.js";

const router = express.Router();

router.get("/", listHomeCollections);
router.get("/:id", getHomeCollection);
router.post("/", validateHomeCollection, createHomeCollection);
router.put("/:id", updateHomeCollection);
router.delete("/:id", deleteHomeCollection);

export default router;
