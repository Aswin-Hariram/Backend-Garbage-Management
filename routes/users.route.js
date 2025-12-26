import express from "express";
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";
import { validateCreateUser } from "../validators/users.validators.js";

const router = express.Router();

router.get("/", listUsers);
router.get("/:id", getUser);
router.post("/", validateCreateUser, createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
