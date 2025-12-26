import express from "express";
import {
  listPublicCollections,
  getPublicCollection,
  createPublicCollection,
  updatePublicCollection,
  deletePublicCollection,
} from "../controllers/publicCollections.controller.js";
import { validatePublicCollection } from "../validators/publicCollections.validators.js";

const router = express.Router();

router.get("/", listPublicCollections);
router.get("/:id", getPublicCollection);
router.post("/", validatePublicCollection, createPublicCollection);
router.put("/:id", updatePublicCollection);
router.delete("/:id", deletePublicCollection);

export default router;
