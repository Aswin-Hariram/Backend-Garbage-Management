import { body, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import { UserRole } from "../constant.js";

const resultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ApiError(400, "Validation failed", errors.array()));
  }
  next();
};

export const validateCreateUser = [
  body("username").notEmpty().withMessage("username is required"),
  body("email").isEmail().withMessage("valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
  body("role").optional().isIn(UserRole).withMessage("invalid role"),
  resultHandler,
];

export const validateUpdateUser = [
  body("email").optional().isEmail().withMessage("valid email is required"),
  body("password").optional().isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
  body("role").optional().isIn(UserRole).withMessage("invalid role"),
  resultHandler,
];
