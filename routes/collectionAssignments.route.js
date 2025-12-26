import express from "express";
import {
  listAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../controllers/collectionAssignments.controller.js";
import { validateAssignment } from "../validators/collectionAssignments.validators.js";

const router = express.Router();

router.get("/", listAssignments);
router.get("/:id", getAssignment);
router.post("/", validateAssignment, createAssignment);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router;
